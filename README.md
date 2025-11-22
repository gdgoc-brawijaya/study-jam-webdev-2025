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

## 🧱 2. Menambah Struktur Website (HTML)
Sekarang kita tambahkan beberapa elemen dasar agar halaman punya konten:

### 2.1 Tambahkan teks & tombol
Masukkan ke dalam `<body>`:
```html
<h2>Welcome to Study Jam!</h2>

<p>Ini adalah website pertama kalian 😎</p>

<input type="text" id="nameInput" placeholder="Tulis nama kamu..." />

<button id="helloBtn">Say Hello</button>

<p id="output"></p>

```

## 🎨 3. Styling Website (CSS)
### 3.1 Buat file baru `style.css`
Masukkan di folder yang sama.

### 3.2 Hubungkan CSS ke HTML
Tambahkan ini di `<head>` pada `index.html`:
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
