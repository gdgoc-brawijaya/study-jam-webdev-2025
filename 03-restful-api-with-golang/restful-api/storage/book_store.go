package storage

import (
	"sync"

	"restful-api/models"
)

var (
	mu     sync.Mutex
	books  []models.Book
	nextID = 1
)

func GetAllBooks() []models.Book {
	mu.Lock()
	defer mu.Unlock()

	copied := make([]models.Book, len(books))
	copy(copied, books)
	return copied
}

func GetBookByID(id int) (models.Book, bool) {
	mu.Lock()
	defer mu.Unlock()

	for _, book := range books {
		if book.ID == id {
			return book, true
		}
	}

	return models.Book{}, false
}

func CreateBook(book models.Book) models.Book {
	mu.Lock()
	defer mu.Unlock()

	book.ID = nextID
	nextID++
	books = append(books, book)
	return book
}

func UpdateBook(id int, updated models.Book) (models.Book, bool) {
	mu.Lock()
	defer mu.Unlock()

	for i, book := range books {
		if book.ID == id {
			updated.ID = id
			books[i] = updated
			return updated, true
		}
	}

	return models.Book{}, false
}

func DeleteBook(id int) (models.Book, bool) {
	mu.Lock()
	defer mu.Unlock()

	for i, book := range books {
		if book.ID == id {
			books = append(books[:i], books[i+1:]...)
			return book, true
		}
	}

	return models.Book{}, false
}
