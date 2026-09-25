import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, nis } = body

    // Validasi input
    if (!nama || !nis) {
      return NextResponse.json(
        { error: 'Nama dan NIS wajib diisi' },
        { status: 400 }
      )
    }

    const namaTrimmed = nama.trim().toLowerCase()
    const nisTrimmed = nis.trim()

    // Cek ke database Supabase (hanya dijalankan saat runtime)
    const supabaseAdmin = getSupabaseAdmin()

    const { data, error } = await supabaseAdmin
      .from('peserta')
      .select('nama, nis, posisi, diterima')
      .ilike('nama', namaTrimmed) // case-insensitive match
      .eq('nis', nisTrimmed)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = row not found, bukan error sebenarnya
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Terjadi kesalahan server' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json({ found: false, diterima: false })
    }

    return NextResponse.json({
      found: true,
      diterima: data.diterima,
      nama: data.nama,
      posisi: data.posisi ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Request tidak valid' }, { status: 400 })
  }
}
