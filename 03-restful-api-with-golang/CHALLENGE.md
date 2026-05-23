# Challenge Workshop — Game Leaderboard API

Pada challenge ini, kalian diminta untuk membuat sebuah **REST API sederhana untuk Game Leaderboard**.

Leaderboard digunakan untuk menyimpan data pemain dan skor mereka, serta menampilkan pemain dengan skor tertinggi.

Tujuan dari challenge ini adalah untuk melatih pemahaman tentang:

- REST API
- HTTP method
- JSON request & response
- pengolahan data sederhana di backend

---

# Ketentuan

- Challenge dapat dikerjakan **secara individu atau kelompok**.
- Hasil pekerjaan dapat dikumpulkan dalam bentuk:
  - **file .zip**, atau
  - **repository GitHub**
- Framework yang digunakan **bebas**, misalnya:
  - Echo
  - Fiber
  - Gin
  - atau **pure `net/http`**
- **Tidak perlu di-hosting**. API cukup berjalan secara lokal.
- Sertakan **laporan singkat di dalam `README.md`** yang menjelaskan:
  - tujuan program
  - struktur project
  - endpoint yang dibuat
  - cara menjalankan API

---

# Data Model

Setiap pemain memiliki struktur data sebagai berikut:

```json
{
  "id": 1,
  "username": "alex",
  "score": 1200
}
```

Contoh struct di Go:

```go
type Player struct {
    ID       int    `json:"id"`
    Username string `json:"username"`
    Score    int    `json:"score"`
}
```

---

# Challenge 1 - Menambahkan Player

Buat endpoint untuk menambahkan pemain baru.

Endpoint:

```
POST /players
```

Contoh request:

```json
{
  "username": "alex",
  "score": 1200
}
```

Contoh response:

```json
{
  "id": 1,
  "username": "alex",
  "score": 1200
}
```

### Ketentuan

- `username` **tidak boleh kosong**
- `score` **tidak boleh negatif**
- `id` **dibuat otomatis oleh server**

---

# Challenge 2 - Mendapatkan Semua Player

Buat endpoint untuk menampilkan seluruh pemain.

Endpoint:

```
GET /players
```

Contoh response:

```json
[
  {
    "id": 1,
    "username": "alex",
    "score": 1200
  },
  {
    "id": 2,
    "username": "sam",
    "score": 900
  }
]
```

---

# Challenge 3 - Leaderboard (Urutkan Skor)

Buat endpoint yang menampilkan pemain berdasarkan **skor tertinggi**.

Endpoint:

```
GET /leaderboard
```

Contoh response:

```json
[
  {
    "username": "alex",
    "score": 1200
  },
  {
    "username": "sam",
    "score": 900
  },
  {
    "username": "lisa",
    "score": 750
  }
]
```

### Hint

Kalian perlu **mengurutkan data berdasarkan skor dari terbesar ke terkecil**.

---

# Challenge 4 - Update Skor Player

Buat endpoint untuk memperbarui skor pemain.

Endpoint:

```
PUT /players/{id}
```

Contoh request:

```json
{
  "score": 1500
}
```

Contoh response:

```json
{
  "id": 1,
  "username": "alex",
  "score": 1500
}
```

### Ketentuan

- Jika player tidak ditemukan, tampilkan pesan error
- `score` tidak boleh bernilai negatif

---

# Bonus Challenge - Top N Players

Tambahkan fitur untuk menampilkan **Top N players** menggunakan query parameter.

Contoh request:

```
GET /leaderboard?limit=3
```

Contoh response:

```json
[
  { "username": "alex", "score": 1200 },
  { "username": "sam", "score": 900 },
  { "username": "lisa", "score": 750 }
]
```

### Hint

Query parameter bisa dibaca di Go menggunakan:

```go
r.URL.Query().Get("limit")
```

---

# Endpoint yang Diharapkan

Minimal API kalian memiliki endpoint berikut:

```
POST   /players
GET    /players
PUT    /players/{id}
GET    /leaderboard
GET    /leaderboard?limit=3
```

---

# Tips Pengujian

API dapat diuji menggunakan:

- Postman
- curl
- browser (untuk endpoint GET)

Contoh:

```
GET http://localhost:8080/leaderboard
```

---

Semangat 