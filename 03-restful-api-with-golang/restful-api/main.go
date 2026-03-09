package main

import (
	"github.com/labstack/echo/v4"
	"restful-api/handlers"
)

func main() {
	e := echo.New()
	handlers.RegisterRoutes(e)

	e.Logger.Fatal(e.Start(":8080"))
}
