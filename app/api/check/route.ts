import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[check] ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json(
      { error: 'Konfigurasi server belum lengkap. Hubungi administrator.' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { nama, nis } = body

    if (!nama || !nis) {
      return NextResponse.json(
        { error: 'Nama dan NIS wajib diisi' },
        { status: 400 }
      )
    }

    const namaTrimmed = nama.trim().toLowerCase()
    const nisTrimmed = nis.trim()

    console.log(`[check] Mencari: nama="${namaTrimmed}", nis="${nisTrimmed}"`)

    const supabaseAdmin = getSupabaseAdmin()

    const { data, error } = await supabaseAdmin
      .from('peserta')
      .select('nama, nis, posisi, diterima')
      .ilike('nama', namaTrimmed)
      .eq('nis', nisTrimmed)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('[check] Supabase error:', JSON.stringify(error))
      return NextResponse.json(
        { error: `Terjadi kesalahan server: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data) {
      console.log('[check] Tidak ditemukan')
      return NextResponse.json({ found: false, diterima: false })
    }

    console.log(`[check] Ditemukan: ${data.nama}, diterima=${data.diterima}`)
    return NextResponse.json({
      found: true,
      diterima: data.diterima,
      nama: data.nama,
      posisi: data.posisi ?? null,
    })
  } catch (err) {
    console.error('[check] Unexpected error:', err)
    return NextResponse.json({ error: 'Request tidak valid' }, { status: 400 })
  }
}
