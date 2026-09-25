# 👑 Denok Kenang Letter – SMKN 9 Semarang

Website pengumuman resmi penerimaan anggota organisasi **Denok Kenang** SMK Negeri 9 Semarang.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

---

## ⚙️ Setup Lokal

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd denok-kenang-letter
npm install
```

### 2. Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com) → **New Project**
2. Buka **SQL Editor** → paste isi file `supabase/schema.sql` → **Run**
3. Edit data peserta di tabel `peserta` (via Dashboard > Table Editor)
4. Ambil API keys di **Project Settings → API**

### 3. Isi Environment Variables

Salin `.env.example` → `.env.local`, lalu isi dengan credentials Supabase:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

> ⚠️ **PENTING**: `SUPABASE_SERVICE_ROLE_KEY` adalah secret key. Jangan pernah di-commit ke GitHub!

### 4. Jalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Mengelola Data Peserta

Buka **Supabase Dashboard → Table Editor → tabel `peserta`**:

| Kolom      | Keterangan                                      |
|------------|-------------------------------------------------|
| `nama`     | Nama lengkap peserta (**huruf kecil semua**)    |
| `nis`      | Nomor Induk Siswa                               |
| `posisi`   | Misal: `Denok SMKN 9 Semarang 2024`            |
| `diterima` | `true` = diterima, `false` = tidak diterima     |

---

## 🌐 Deploy ke Vercel

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repo
3. Tambahkan **Environment Variables** (sama seperti `.env.local`) di Vercel dashboard
4. Deploy!

---

## 🔒 Keamanan

- Pengecekan nama/NIS dilakukan **server-side** via API route, bukan di browser
- Row Level Security (RLS) aktif → data tidak bisa diakses langsung via Supabase public key
- `.env.local` tidak pernah masuk ke Git (sudah di-exclude di `.gitignore`)
