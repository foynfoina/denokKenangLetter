import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing env vars: SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus diset di Vercel'
    )
  }

  _supabaseAdmin = createClient(url, key, {
    auth: { persistSession: false },
  })

  return _supabaseAdmin
}
