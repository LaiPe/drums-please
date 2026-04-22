import { createClient, SupabaseClient } from "@supabase/supabase-js"

export interface StorageProvider {
  upload(file: File, path: string): Promise<string>
  getUrl(path: string, options?: ImageOptions): string
  delete(path: string): Promise<void>
  list(folder?: string): Promise<string[]>
}

export type ImageOptions = {
  width?: number
  height?: number
  format?: 'webp' | 'jpeg' | 'png'
}

export class SupabaseStorageProvider implements StorageProvider {
  private bucketReady = false

  // adminClient must use the service_role key — never expose it in NEXT_PUBLIC_ env vars
  constructor(
    private readonly client: SupabaseClient,
    private readonly bucket: string,
    private readonly adminClient?: SupabaseClient,
  ) {}

  private async ensureBucket(): Promise<void> {
    if (this.bucketReady) return

    const admin = this.adminClient ?? this.client
    const { data: buckets } = await admin.storage.listBuckets()
    const exists = buckets?.some(b => b.name === this.bucket)

    if (!exists) {
      const { error } = await admin.storage.createBucket(this.bucket, { public: true })
      if (error) throw new Error(`Failed to create bucket: ${error.message}`)
    }

    this.bucketReady = true
  }

  async upload(file: File, path: string): Promise<string> {
    await this.ensureBucket()

    // Upload uses the service role client: writes are always server-side (Server Actions),
    // so RLS policies on storage.objects would only duplicate auth logic already enforced in Next.js.
    const { error } = await (this.adminClient ?? this.client).storage
      .from(this.bucket)
      .upload(path, file, { upsert: true, contentType: file.type })

    if (error) throw new Error(`Storage upload failed: ${error.message}`)

    return path
  }

  getUrl(path: string, options?: ImageOptions): string {
    const transform = options
      ? {
          width: options.width,
          height: options.height,
          format: options.format === 'webp' ? undefined : 'origin' as const,
        }
      : undefined

    const { data } = this.client.storage
      .from(this.bucket)
      .getPublicUrl(path, transform ? { transform } : undefined)

    return data.publicUrl
  }

  async delete(path: string): Promise<void> {
    // Same rationale as upload: delete is always server-side, service role is intentional.
    const { error } = await (this.adminClient ?? this.client).storage
      .from(this.bucket)
      .remove([path])

    if (error) throw new Error(`Storage delete failed: ${error.message}`)
  }

  async list(folder?: string): Promise<string[]> {
    const admin = this.adminClient ?? this.client
    const { data, error } = await admin.storage.from(this.bucket).list(folder ?? '')
    if (error) throw new Error(`Storage list failed: ${error.message}`)
    return (data ?? [])
      .filter(f => f.id) // exclude empty folder placeholders
      .map(f => folder ? `${folder}/${f.name}` : f.name)
  }
}

const providerCache = new Map<string, StorageProvider>()

export function createStorageProvider(bucket: string): StorageProvider {
  if (providerCache.has(bucket)) return providerCache.get(bucket)!

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")

  const provider = new SupabaseStorageProvider(createClient(url, key), bucket)
  providerCache.set(bucket, provider)
  return provider
}