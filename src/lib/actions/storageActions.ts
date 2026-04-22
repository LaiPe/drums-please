'use server'

import { createClient } from '@supabase/supabase-js'
import { SupabaseStorageProvider } from '../data/storage'

type MediaType = 'image' | 'video'

const BUCKETS: Record<MediaType, string> = {
  image: 'images',
  video: 'videos',
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const adminClient = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)

function getAdminProvider(mediaType: MediaType): SupabaseStorageProvider {
  return new SupabaseStorageProvider(anonClient, BUCKETS[mediaType], adminClient)
}

export async function listMediaFiles(mediaType: MediaType, folder?: string): Promise<string[]> {
  return getAdminProvider(mediaType).list(folder)
}

export type UploadResult = { path: string; error?: never } | { path?: never; error: string }

export async function uploadMediaFile(
  mediaType: MediaType,
  folder: string | undefined,
  formData: FormData,
): Promise<UploadResult> {
  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { error: 'Aucun fichier sélectionné.' }

  const ext = file.name.split('.').pop()
  const uuid = crypto.randomUUID()
  // Path: <folder>/<uuid>.<ext> — decoupled from any mutable resource attribute (slug, name…)
  const storagePath = folder ? `${folder}/${uuid}.${ext}` : `${uuid}.${ext}`

  try {
    const path = await getAdminProvider(mediaType).upload(file, storagePath)
    return { path }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erreur lors de l\'upload.' }
  }
}
