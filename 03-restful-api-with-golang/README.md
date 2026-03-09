# Belajar RESTful API dengan Golang

## Gambaran Workshop

Di workshop ini, peserta akan membuat **Book CRUD API** dengan dua fase:

1. Fase dasar: single file menggunakan `net/http` (biar paham fondasi).
2. Fase refactor: pisah ke beberapa folder dan pindah ke **Echo** (biar lebih rapi dan cepat dikembangkan).

**Durasi:** ~1.5 jam  
**Level:** Beginner

---

## Prasyarat

Pastikan tools berikut sudah ter-install:

| Tool | Link |
| --- | --- |
| **Go** (v1.22+) | [Download](https://go.dev/dl) |
| **Code Editor** (disarankan VS Code) | [Download](https://code.visualstudio.com/) |
| **Postman** | [Download](https://www.postman.com/downloads/) |
| **Git** | [Download](https://git-scm.com/downloads/) |

Cek instalasi Go:

```bash
go version
```

---

## Konsep Singkat REST API

REST API menggunakan HTTP method untuk operasi resource:

| Method | Aksi | Contoh |
| --- | --- | --- |
| `GET` | Ambil data | Ambil semua buku |
| `POST` | Tambah data | Tambah buku baru |
| `PUT` | Ubah data | Ubah buku |
| `DELETE` | Hapus data | Hapus buku |

---

## Setup Project

**Opsi A - Clone repository:**

```bash
git clone <repository-url>
cd 03-restful-api-with-golang/restful-api
```

**Opsi B - Buat dari nol:**

```bash
mkdir restful-api && cd restful-api
go mod init restful-api
```

---

## Fase 1: Single File (net/http)

Tujuan fase ini: peserta paham alur request -> handler -> response tanpa distraksi struktur folder.

### Langkah 1: Hello World

Buat `main.go`:

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{"message": "Hello World!"}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("GET /", helloHandler)

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
```

Jalankan:

```bash
go run main.go
```

Output endpoint `/`:

```json
{"message":"Hello World!"}
```

### Langkah 2: Tambah model + CRUD (masih di `main.go`)

Lanjutkan materi CRUD sampai endpoint berikut jadi:

- `GET /books`
- `GET /books/{id}`
- `POST /books`
- `PUT /books/{id}`
- `DELETE /books/{id}`

### Kode Lengkap Single File (`main.go`)

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Book struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

var (
	books  []Book
	nextID = 1
)

func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	for _, book := range books {
		if book.ID == id {
			json.NewEncoder(w).Encode(book)
			return
		}
	}

	http.Error(w, "Book not found", http.StatusNotFound)
}

func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var book Book
	if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	book.ID = nextID
	nextID++
	books = append(books, book)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	var updated Book
	if err := json.NewDecoder(r.Body).Decode(&updated); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	for i, book := range books {
		if book.ID == id {
			updated.ID = id
			books[i] = updated
			json.NewEncoder(w).Encode(updated)
			return
		}
	}

	http.Error(w, "Book not found", http.StatusNotFound)
}

func deleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	for i, book := range books {
		if book.ID == id {
			books = append(books[:i], books[i+1:]...)
			json.NewEncoder(w).Encode(book)
			return
		}
	}

	http.Error(w, "Book not found", http.StatusNotFound)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{"message": "Hello World!"}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("GET /", helloHandler)
	http.HandleFunc("GET /books", getBooks)
	http.HandleFunc("GET /books/{id}", getBook)
	http.HandleFunc("POST /books", createBook)
	http.HandleFunc("PUT /books/{id}", updateBook)
	http.HandleFunc("DELETE /books/{id}", deleteBook)

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
```

---

## Fase 2: Refactor Folder + Echo

Setelah peserta paham fondasi, refactor ke struktur berikut:

```txt
restful-api/
├── main.go
├── handlers/
│   ├── book_handler.go
│   └── router.go
├── models/
│   └── book.go
└── storage/
    └── book_store.go
```

Pembagian tanggung jawab:

- `main.go`: inisialisasi server Echo + start server.
- `handlers/router.go`: daftar semua route.
- `handlers/book_handler.go`: logic request/response HTTP.
- `models/book.go`: struktur data `Book`.
- `storage/book_store.go`: in-memory storage dan operasi CRUD.

### Install Echo

```bash
cd restful-api
go get github.com/labstack/echo/v4@latest
```

### Bentuk `main.go` setelah refactor

```go
package main

import (
	"restful-api/handlers"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	handlers.RegisterRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
```

### Bentuk `handlers/router.go`

```go
package handlers

import "github.com/labstack/echo/v4"

func RegisterRoutes(e *echo.Echo) {
	e.GET("/", HelloHandler)
	e.GET("/books", GetBooks)
	e.GET("/books/:id", GetBook)
	e.POST("/books", CreateBook)
	e.PUT("/books/:id", UpdateBook)
	e.DELETE("/books/:id", DeleteBook)
}
```

Jalankan aplikasi refactor:

```bash
go run .
```

---

## Testing dengan Postman

Uji endpoint berikut:

| Method | URL | Body (JSON) | Keterangan |
| --- | --- | --- | --- |
| `POST` | `http://localhost:8080/books` | `{"title":"The Go Programming Language","author":"Alan Donovan"}` | Tambah buku |
| `GET` | `http://localhost:8080/books` | - | Ambil semua buku |
| `GET` | `http://localhost:8080/books/1` | - | Ambil buku by ID |
| `PUT` | `http://localhost:8080/books/1` | `{"title":"Learning Go","author":"Jon Bodner"}` | Ubah buku |
| `DELETE` | `http://localhost:8080/books/1` | - | Hapus buku |

---

## Testing Cepat dengan curl

Jika server sudah jalan di `http://localhost:8080`, endpoint dapat diuji dengan urutan berikut.

Untuk PowerShell, gunakan `curl.exe`:

```bash
# 0) Hello endpoint
curl.exe -X GET http://localhost:8080/

# 1) Create book #1
curl.exe -X POST http://localhost:8080/books ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"The Go Programming Language\",\"author\":\"Alan Donovan\"}"

# 2) Create book #2
curl.exe -X POST http://localhost:8080/books ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Learning Go\",\"author\":\"Jon Bodner\"}"

# 3) Get all books
curl.exe -X GET http://localhost:8080/books

# 4) Get book by ID
curl.exe -X GET http://localhost:8080/books/1

# 5) Update book by ID
curl.exe -X PUT http://localhost:8080/books/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Go in Action\",\"author\":\"William Kennedy\"}"

# 6) Delete book by ID
curl.exe -X DELETE http://localhost:8080/books/2

# 7) Cek hasil akhir
curl.exe -X GET http://localhost:8080/books
```

---

## Next Step

Lanjut ke [CHALLENGE.md](./CHALLENGE.md) untuk latihan tambahan.
