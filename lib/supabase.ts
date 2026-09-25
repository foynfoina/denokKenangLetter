import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — hanya dibuat saat pertama kali dipanggil (runtime, bukan build time)
let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  _supabaseAdmin = createClient(url, key, {
    auth: { persistSession: false },
  })

  return _supabaseAdmin
}
