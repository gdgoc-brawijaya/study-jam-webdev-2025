# PokeExplorer 🧭 - Belajar Next.js 14 App Router

Selamat datang di **PokeExplorer**! Proyek ini adalah demo interaktif yang disiapkan secara spesifik untuk presentasi tentang konsep dasar Next.js 14 (App Router).

Aplikasi ini menargetkan Pokedex sederhana yang memanfaatkan public API, di-render dengan efisien, dan memiliki user interface yang *clean* dan modern.

---

## 🚀 Cara Menjalankan Project (Local Development)

Pastikan kamu sudah berada di dalam folder project ini.

1. Install semua dependencies:
   ```bash
   cd 05-fullstack-deployment-101/app-2
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser dan arahkan ke [http://localhost:3000](http://localhost:3000)

---

## 🧠 Konsep Utama yang Didemonstrasikan

- **Server Components (Default):** File seperti `app/page.tsx` dan `app/pokemon/[name]/page.tsx` berjalan murni di server. Ini mempercepat load pertama dan mengurangi jumlah JavaScript yang harus diunduh oleh browser.
- **Client Components (`"use client"`):** Komponen `PokemonClientList.tsx` mengatur search real-time dan pagination. Komponen ini dirancang interaktif sehingga wajib dijadikan Client Component.
- **Dynamic Routing:** Struktur folder `app/pokemon/[name]/page.tsx` akan secara otomatis membuat routing dinamis. URL seperti `/pokemon/pikachu` akan ditangkap parameter `[name]`-nya secara otomatis oleh Next.js.
- **Image Optimization:** Komponen `<Image />` bawaan Next.js (`next/image`) yang mempercepat pemuatan *official-artwork* dari domain external (di-whitelist melalui `next.config.mjs`).

---

## 🛠️ Ide Iterasi AI (Prompting dengan Gemini)

Aplikasi ini sengaja dibuat dengan ruang untuk bereksperimen. Gunakan AI favoritmu (atau Gemini) untuk memodifikasi kode dengan mencoba prompt-prompt ini di terminal/chat:

1. **Mempercantik Transisi Halaman (Loading State):**
   > *"Tolong buatkan file `loading.tsx` standar Next.js dengan animasi skeleton shimmer menggunakan Tailwind. Letakkan agar me-replace UI ketika data Pokedex list di `app/page.tsx` sedang dimuat."*

2. **Menambahkan Error Boundaries:**
   > *"Buatkan file `error.tsx` untuk menangkap jika Fetch API di `getPokemonDetail` gagal (misalnya saat internet mati). Tambahkan tombol 'Coba Lagi' di UI error tersebut."*

3. **Client-side Filtering Lanjutan:**
   > *"Di dalam `PokemonClientList.tsx`, tolong tambahkan tombol 'Urutkan A-Z' dan 'Urutkan Z-A' di sebelah input pencarian yang akan mengurutkan state array `filtered` secara alfabetis."*

Selamat belajar dan berpresentasi! 🚀
