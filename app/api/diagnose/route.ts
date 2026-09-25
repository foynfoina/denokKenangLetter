import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const results: Record<string, unknown> = {}

  // 1. Cek env vars
  results.env = {
    SUPABASE_URL: process.env.SUPABASE_URL
      ? `✅ Ada (${process.env.SUPABASE_URL.slice(0, 30)}...)`
      : '❌ KOSONG',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? `✅ Ada (${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 20)}...)`
      : '❌ KOSONG',
  }

  // 2. Cek koneksi Supabase
  try {
    const sb = getSupabaseAdmin()

    // Cek apakah tabel peserta ada
    const { data, error } = await sb
      .from('peserta')
      .select('count')
      .limit(1)

    if (error) {
      results.table = `❌ Error: ${error.message} (code: ${error.code})`
    } else {
      results.table = `✅ Tabel peserta ditemukan`
      results.data = data
    }

    // Cek total rows
    const { count, error: countError } = await sb
      .from('peserta')
      .select('*', { count: 'exact', head: true })

    if (!countError) {
      results.totalRows = `✅ ${count} baris data ditemukan`
    }

  } catch (err: unknown) {
    results.connection = `❌ Gagal konek: ${err instanceof Error ? err.message : String(err)}`
  }

  return NextResponse.json(results, { status: 200 })
}
