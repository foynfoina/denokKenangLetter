import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pengumuman Penerimaan – Denok Kenang SMKN 9 Semarang',
  description:
    'Halaman pengumuman resmi penerimaan anggota organisasi Denok Kenang SMK Negeri 9 Semarang.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
