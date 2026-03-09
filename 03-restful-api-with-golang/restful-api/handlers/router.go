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
