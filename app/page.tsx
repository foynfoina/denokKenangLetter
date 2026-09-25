'use client'

import { useState } from 'react'
import { CheckResult } from '@/types'

export default function HomePage() {
  const [nama, setNama] = useState('')
  const [nis, setNis] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!nama.trim() || !nis.trim()) {
      setError('Harap isi nama lengkap dan NIS Anda.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: nama.trim(), nis: nis.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan. Coba lagi.')
        return
      }

      setResult(data)
    } catch {
      setError('Gagal terhubung ke server. Periksa koneksi internet Anda.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setNama('')
    setNis('')
    setError('')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #4a0810 0%, #7b0d1e 40%, #9b1a2e 70%, #4a0810 100%)' }}>

      {/* Background ornamen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #b8860b, transparent)' }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #b8860b, transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          {/* Logo / Emblem placeholder */}
          <div className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: '#b8860b', background: 'rgba(184,134,11,0.15)' }}>
            <span className="text-3xl">👑</span>
          </div>
          <h1 className="text-shimmer text-3xl font-bold tracking-wide mb-1">
            DENOK KENANG
          </h1>
          <p className="text-yellow-200 text-sm font-medium uppercase tracking-widest">
            SMK Negeri 9 Semarang
          </p>
          <div className="mt-3 h-px w-32 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #b8860b, transparent)' }} />
          <p className="mt-3 text-white/80 text-sm">
            Pengumuman Resmi Penerimaan Anggota
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: '0.2s', background: 'rgba(253,248,240,0.97)' }}>

          {!result ? (
            <div className="p-8">
              <h2 className="text-center font-semibold mb-6" style={{ color: '#7b0d1e' }}>
                Masukkan Data Anda
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input Nama */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a0810' }}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap sesuai pendaftaran"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: '#d4a843',
                      background: '#fff',
                      color: '#1a0a00',
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(184,134,11,0.25)')}
                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                    disabled={loading}
                    autoComplete="off"
                  />
                </div>

                {/* Input NIS */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a0810' }}>
                    NIS (Nomor Induk Siswa)
                  </label>
                  <input
                    type="text"
                    value={nis}
                    onChange={(e) => setNis(e.target.value)}
                    placeholder="Contoh: 1234567"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: '#d4a843',
                      background: '#fff',
                      color: '#1a0a00',
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(184,134,11,0.25)')}
                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                    disabled={loading}
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: loading ? '#9b1a2e' : 'linear-gradient(135deg, #7b0d1e, #b8860b)' }}
                  onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.opacity = '0.9' }}
                  onMouseLeave={(e) => { if (!loading) (e.target as HTMLButtonElement).style.opacity = '1' }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Memeriksa...
                    </span>
                  ) : 'Cek Status Penerimaan'}
                </button>
              </form>

              <p className="text-center text-xs mt-6" style={{ color: '#9b7653' }}>
                Pastikan nama dan NIS sesuai dengan data pendaftaran.
              </p>
            </div>

          ) : (
            /* Result Panel */
            <ResultPanel result={result} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-xs mt-8">
          © 2024 Organisasi Denok Kenang · SMKN 9 Semarang
        </p>
      </div>
    </main>
  )
}

/* ─── Komponen Hasil ─── */
function ResultPanel({ result, onReset }: { result: CheckResult; onReset: () => void }) {
  if (!result.found) {
    return (
      <div className="p-8 text-center animate-fade-in-up">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#7b0d1e' }}>
          Data Tidak Ditemukan
        </h2>
        <p className="text-sm mb-6" style={{ color: '#6b5c4c' }}>
          Nama dan NIS yang Anda masukkan tidak terdaftar dalam sistem. Pastikan penulisan sesuai dengan formulir pendaftaran.
        </p>
        <button onClick={onReset} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: '#7b0d1e' }}>
          ← Coba Lagi
        </button>
      </div>
    )
  }

  if (!result.diterima) {
    return (
      <div className="p-8 text-center animate-fade-in-up">
        <div className="text-5xl mb-4">💪</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#7b0d1e' }}>
          Halo, {result.nama}!
        </h2>
        <div className="p-4 rounded-xl mb-6" style={{ background: '#fff3f3', border: '1px solid #f5c6c6' }}>
          <p className="text-sm font-medium" style={{ color: '#c0392b' }}>
            Mohon maaf, kamu belum berhasil diterima dalam seleksi Denok Kenang SMKN 9 Semarang tahun ini.
          </p>
        </div>
        <p className="text-sm mb-6" style={{ color: '#6b5c4c' }}>
          Terima kasih telah berpartisipasi. Semangat terus dan jangan menyerah — kesempatan berikutnya selalu ada! 🌟
        </p>
        <button onClick={onReset} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: '#7b0d1e' }}>
          ← Kembali
        </button>
      </div>
    )
  }

  // DITERIMA 🎉
  return (
    <div className="animate-fade-in-up">
      {/* Banner emas */}
      <div className="py-6 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #7b0d1e, #9b1a2e)' }}>
        <div className="text-4xl mb-2">🎉</div>
        <p className="text-yellow-300 text-xs uppercase tracking-widest font-semibold mb-1">
          Selamat!
        </p>
        <h2 className="text-white text-xl font-bold">
          {result.nama}
        </h2>
      </div>

      <div className="p-8 text-center">
        <div className="p-5 rounded-2xl mb-6" style={{ background: '#fffbeb', border: '2px solid #b8860b' }}>
          <p className="text-sm mb-3" style={{ color: '#5c4a00' }}>
            Dengan bangga kami menyatakan bahwa Anda telah resmi diterima sebagai:
          </p>
          <p className="text-2xl font-bold text-shimmer mb-1">
            {result.posisi || 'Anggota Denok Kenang'}
          </p>
          <p className="text-sm font-medium" style={{ color: '#7b0d1e' }}>
            Organisasi Denok Kenang · SMKN 9 Semarang
          </p>
        </div>

        <p className="text-sm mb-6" style={{ color: '#6b5c4c' }}>
          Informasi lebih lanjut mengenai orientasi dan kegiatan akan disampaikan melalui koordinator.
          Selamat bergabung dan jadilah kebanggaan sekolah! 🌹
        </p>

        <button onClick={onReset} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #7b0d1e, #b8860b)' }}>
          ← Cek Data Lain
        </button>
      </div>
    </div>
  )
}
