import 'dotenv/config'
import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { SupabaseStorageProvider } from '../storage'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!url || !anonKey || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const adminClient = createClient(url, serviceRoleKey)
const provider = new SupabaseStorageProvider(adminClient, 'images', adminClient)

async function main() {
  const buffer = readFileSync('public/img/fond-presentation.png')
  const file = new File([buffer], 'fond-presentation.png', { type: 'image/png' })

  console.log('Uploading fond-presentation.png...')
  const path = await provider.upload(file, 'test/fond-presentation.png')
  console.log('Uploaded to path:', path)

  const publicUrl = provider.getUrl(path)
  console.log('Public URL:', publicUrl)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
