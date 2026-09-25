-- =============================================
-- SCHEMA SUPABASE - Denok Kenang SMKN 9 Semarang
-- DATA RESMI PESERTA 2024
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query
-- =============================================

-- Hapus tabel lama jika ada (fresh start)
DROP TABLE IF EXISTS peserta;

-- Buat tabel peserta
CREATE TABLE peserta (
  id         BIGSERIAL PRIMARY KEY,
  nama       TEXT NOT NULL,
  nis        TEXT NOT NULL UNIQUE,
  kelas      TEXT,
  posisi     TEXT,          -- 'Denok' / 'Kenang' / NULL jika tidak diterima
  diterima   BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat pencarian
CREATE INDEX idx_peserta_nis        ON peserta (nis);
CREATE INDEX idx_peserta_nama_lower ON peserta (LOWER(nama));

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Data tidak bisa diakses langsung dari browser
-- =============================================
ALTER TABLE peserta ENABLE ROW LEVEL SECURITY;

-- Blokir semua akses via anon/public key
CREATE POLICY "block_public_access"
  ON peserta FOR ALL TO anon USING (false);

-- Hanya service_role (server-side) yang boleh membaca
CREATE POLICY "allow_service_role_read"
  ON peserta FOR SELECT TO service_role USING (true);

-- =============================================
-- DATA PESERTA RESMI
-- ✅ = diterima (10 anak) | ❌ = tidak diterima (5 anak)
-- =============================================
INSERT INTO peserta (nama, nis, kelas, posisi, diterima) VALUES

  -- ✅ DITERIMA
  ('Florentina Jocelyn Juan',                  '11901', 'X MPLB 1', 'Denok SMKN 9 Semarang 2024',  true),
  ('Safia Nur Eka Putri',                      '11916', 'X MPLB 1', 'Denok SMKN 9 Semarang 2024',  true),
  ('Nadya Nur Sahda Ramadhani',                '11911', 'X MPLB 1', 'Denok SMKN 9 Semarang 2024',  true),
  ('Dzaky Luqman Abdur Rasyid',                '11935', 'X MPLB 2', 'Kenang SMKN 9 Semarang 2024', true),
  ('Aqil Nugraha',                             '12004', 'X AKL 1',  'Kenang SMKN 9 Semarang 2024', true),
  ('Naomy Dee Jacqueline Seth',                '12096', 'X AKL 3',  'Denok SMKN 9 Semarang 2024',  true),
  ('Navara Putra Mandala Rhezya Pashatama',    '11845', 'X PM 2',   'Kenang SMKN 9 Semarang 2024', true),
  ('Kasyful Khofa Auliya',                     '11839', 'X PM 2',   'Denok SMKN 9 Semarang 2024',  true),
  ('Rizky Ilham Mochlana',                     '11780', 'X PPLG',   'Kenang SMKN 9 Semarang 2024', true),
  ('Muhammad Satria Wardana Altamis',          '11770', 'X PPLG',   'Kenang SMKN 9 Semarang 2024', true),

  -- ❌ TIDAK DITERIMA
  ('Theresa Tir''zha Nugroho',                 '11922', 'X MPLB 1', NULL, false),
  ('Nabila Putri Keysha',                      '11945', 'X MPLB 2', NULL, false),
  ('Saffana Nur Wizzahrani',                   '12031', 'X AKL 1',  NULL, false),
  ('Eky Julya Zahra',                          '12045', 'X AKL 2',  NULL, false),
  ('Atiqoh Qudsiyah',                          '11860', 'X PM 3',   NULL, false);

-- =============================================
-- VERIFIKASI DATA
-- =============================================
SELECT
  id,
  nama,
  nis,
  kelas,
  posisi,
  diterima,
  CASE WHEN diterima THEN '✅ Diterima' ELSE '❌ Tidak Diterima' END AS status
FROM peserta
ORDER BY diterima DESC, id ASC;
