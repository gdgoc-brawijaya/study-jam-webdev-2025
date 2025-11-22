# 🌐 Study Jam Web Development - GDGoC UB
Centralized Web Development Study Jam resources

## 🔥 Preparation
Jangan lupa siapkan hal-hal ini terlebih dahulu sebelum kalian mulai
- Install [VSCode](https://code.visualstudio.com/download)
- Install Live Server (VSCode extension)
- Siapkan folder kosong untuk project hands-on


## 💪 1. Hands-on
### 1.1 Buka VS Code kalian
Setelah menginstall VS Code, buka aplikasinya lalu pilih Open Folder untuk memulai project baru.
<img width="1158" height="674" alt="Open Folder" src="https://github.com/user-attachments/assets/47e29da5-e42c-4745-9adb-f50333123019" />

### 1.2 Buat Folder Project
Buat folder baru bernama `studyjam-web` atau nama apa pun yang kalian suka.
Setelah itu, buka folder tersebut di VS Code.

### 1.3 Buat File HTML Pertama (index.html)
Di dalam folder tersebut, buat file baru bernama index.html. File ini akan menjadi halaman utama website kalian.
<img width="589" height="233" alt="index.html" src="https://github.com/user-attachments/assets/a88da3aa-37e9-4df1-b0a7-e093276d2a84" />

Buat beberapa file lagi dengan struktur berikut:
```
studyjam-web/
│ index.html
│ about.html
│ form.html
│ style.css
│ script.js

```
### 1.4 Tambahkan Struktur HTML Dasar
Masukkan struktur HTML minimal agar browser bisa membaca halaman kalian. Isi file tersebut dengan kode ini
```html
<!DOCTYPE html>
<html>
<head>
    <title>Study Jam Web</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>

```

### 1.5 Jalankan Website Menggunakan Live Server
Klik kanan pada index.html → Open with Live Server untuk melihat hasilnya di browser.

<img width="837" height="336" alt="Screenshot 2025-11-22 150219" src="https://github.com/user-attachments/assets/2d6bcfb5-e3df-40b4-b63f-dc4a0cd8d3f7" />

Browser akan menampilkan tulisan “Hello World!”

<img width="645" height="206" alt="image" src="https://github.com/user-attachments/assets/ce7f7530-7a1b-43d2-bc72-62bb3c24d184" />

Setelah kalian berhasil sampai tahap preview dengan **Live Preview**, kita bisa lanjut ke membuat HTML yang lengkap


## 🧩 Step 2 — Membuat Struktur Halaman (HTML + Navbar)
Sekarang kita tambahkan beberapa elemen dasar agar halaman punya konten:

#### 📌 File yang akan dibuat:
- `index.html`
- `about.html`
- `form.html`

Semua **punya `<head>` sama**, **judul sama**, dan **navbar yang sama**.

---

### ⭐ 2.1 Buat Navbar + Struktur HTML (Copy ke semua file)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Jam Web GDGoC</title>
</head>
<body>

    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="form.html">Form</a>
    </nav>

    <!-- CONTENT DI BAWAH INI BERBEDA TIAP HALAMAN -->
```

Tambahkan penutup akhir untuk semua file:

```html
</body>
</html>
```

---

### 🏠 2.2 `index.html` (Home Page)
Ganti isi index.html yang kita coba di awal tadi menjadi seperti ini

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Jam Web GDGoC</title>
</head>
<body>

    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="form.html">Form</a>
    </nav>

    <h1>Welcome to Study Jam Web!</h1>
    <p>Ini halaman utama dari mini-website kalian.</p>

</body>
</html>
```

---

### 🧑‍💻 2.3 `about.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Jam Web GDGoC</title>
</head>
<body>

    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="form.html">Form</a>
    </nav>

    <h1>About Us</h1>
    <p>Website ini dibuat untuk belajar dasar web development.</p>

</body>
</html>
```

---

### 📝 2.4 `form.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Jam Web GDGoC</title>
</head>
<body>

    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="form.html">Form</a>
    </nav>

    <h1>Contact Form</h1>
    <p>Silakan isi form di bawah:</p>

    <form>
        <label>Nama:</label>
        <input type="text" />
        <br /><br />

        <label>Email:</label>
        <input type="email" />
        <br /><br />

        <button type="submit">Kirim</button>
    </form>

</body>
</html>
```

---

## 🎨 3. Styling Website (CSS)
### 3.1 Buat file baru `style.css`
Masukkan di folder yang sama.

### 3.2 Hubungkan CSS ke HTML
Tambahkan ini di `<head>` pada `index.html`, `about.html`, dan `form.html`:
```html
<link rel="stylesheet" href="style.css">
```


### 3.3 Tambahkan style dasar
Isi `style.css` dengan kode berikut:
```css
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f5f5f5;
}

button {
    padding: 8px 14px;
    margin-top: 10px;
    cursor: pointer;
}

```


## ⚡ 4. Menambahkan Interaksi (JavaScript)
