export interface Peserta {
  id: number
  nama: string
  nis: string
  posisi: string | null
  diterima: boolean
  created_at: string
}

export interface CheckResult {
  found: boolean
  diterima: boolean
  nama?: string
  posisi?: string
}
