# 🏆 Mini Challenge – Simple Blog App (Next.js & TypeScript)

Halo semuanya!  
Level up! 🚀 Setelah memahami dasar web, sekarang saatnya kita masuk ke modern web development. Challenge kali ini akan menantang kalian untuk membangun **Simple Blog App** menggunakan **Next.js** dan **TypeScript**.

Di sini kita akan belajar konsep _dynamic routing_, _state management sederhana_, dan _browser storage_.

## 🎯 Tujuan Challenge

Membuat aplikasi blog sederhana yang bisa menampilkan daftar artikel, detail artikel, dan menyimpan artikel favorit (bookmark) menggunakan **Next.js** dan **TypeScript**. Fokus utamanya adalah pemahaman **Routing**, **Type Safety**, dan manipulasi **LocalStorage**.

## 📝 Ketentuan Project

### 1. Data & Type Definition

Kalian wajib membuat tipe data (interface/type) dan dummy data.

- Buatlah **interface/type** untuk Blog dengan properti: `id`, `title`, `author`, `content`, `created_at`.
- Generate **20 data dummy** (fake data) dalam bentuk Array of Objects.

### 2. Struktur Halaman

Aplikasi minimal harus memiliki halaman-halaman berikut:

**A. Halaman Utama (All Blogs)**

- Menampilkan list dari ke-20 blog dummy.
- Informasi yang ditampilkan di kartu/list hanya:
  - Title
  - Author
  - Created At
  - Status Bookmark (ikon atau teks yang menandakan apakah artikel ini sudah dibookmark atau belum).

**B. Halaman Detail Blog (Dynamic Route)**

- Ketika item di halaman utama diklik, user diarahkan ke halaman detail (misal: `/blog/[id]`).
- Menampilkan **SELURUH** data blog (`title`, `author`, `created_at`, dan `content`).
- Ada tombol untuk _Add to Bookmark_ atau _Remove from Bookmark_.

**C. Halaman Bookmarks**

- Halaman khusus untuk melihat daftar blog yang sudah disimpan.
- Hanya menampilkan blog yang ID-nya tersimpan di LocalStorage.

### 3. Fitur Teknis (Wajib)

- **State & LocalStorage:** Gunakan `localStorage` browser untuk menyimpan `id` dari blog yang di-bookmark. Data bookmark harus tetap ada meskipun halaman di-refresh.
- **TypeScript:** Kode harus _strictly typed_. Hindari penggunaan `any` sebisa mungkin.

## 🛠️ Tech Stack & Styling

### Wajib

✅ **Next.js** (App Router).  
✅ **TypeScript** (Wajib mendefinisikan types/interfaces).

### Styling

🎨 Bebas! Kalian boleh menggunakan:

- CSS Modules
- Global CSS
- **Tailwind CSS** (Sangat direkomendasikan dan menjadi **Nilai Plus ➕**)

## 📦 Cara Pengumpulan

Kalian dapat memilih salah satu:

- **Link repository GitHub** (public),
- **Zip file project** (jangan lupa hapus folder `node_modules` dan `.next` sebelum di-zip agar tidak berat), atau
- **Link deployment** (opsional). Deployment gratis bisa menggunakan Vercel atau Netlify.

## 🗂️ Isi Project Minimal

- Struktur folder Next.js yang rapi.
- File `types.ts` atau sejenisnya untuk definisi Interface.
- Komponen dipecah dengan baik (misal: `BlogCard`, `Navbar`, dll).

## ⭐ Penilaian Berdasarkan

- **Fungsionalitas:** Fitur bookmark berjalan lancar (simpan/hapus) dan persisten (tanpa refresh).
- **TypeScript Implementation:** Ketepatan penggunaan tipe data.
- **Kerapihan Kode:** Struktur component dan readability code.
- **Styling:** Tampilan visual (Jika memakai Tailwind CSS akan dapat poin tambahan).
- **UX:** Kemudahan navigasi antar halaman (Home <-> Detail <-> Bookmarks).

## ⏰ Deadline

**Kamis, 12 Februari 2026 – 23:59 WIB**

Good luck & happy coding! 🔥
