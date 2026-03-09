package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"restful-api/models"
	"restful-api/storage"
)

func HelloHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Hello World!",
	})
}

func GetBooks(c echo.Context) error {
	return c.JSON(http.StatusOK, storage.GetAllBooks())
}

func GetBook(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return writeError(c, "Invalid ID", http.StatusBadRequest)
	}

	book, found := storage.GetBookByID(id)
	if !found {
		return writeError(c, "Book not found", http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, book)
}

func CreateBook(c echo.Context) error {
	var book models.Book
	if err := c.Bind(&book); err != nil {
		return writeError(c, "Invalid request body", http.StatusBadRequest)
	}

	created := storage.CreateBook(book)
	return c.JSON(http.StatusCreated, created)
}

func UpdateBook(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return writeError(c, "Invalid ID", http.StatusBadRequest)
	}

	var updated models.Book
	if err := c.Bind(&updated); err != nil {
		return writeError(c, "Invalid request body", http.StatusBadRequest)
	}

	book, found := storage.UpdateBook(id, updated)
	if !found {
		return writeError(c, "Book not found", http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, book)
}

func DeleteBook(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return writeError(c, "Invalid ID", http.StatusBadRequest)
	}

	book, found := storage.DeleteBook(id)
	if !found {
		return writeError(c, "Book not found", http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, book)
}

func writeError(c echo.Context, message string, status int) error {
	return c.JSON(status, map[string]string{
		"error": message,
	})
}
