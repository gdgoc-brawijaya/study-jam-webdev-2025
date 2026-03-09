package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Hello World!",
	}

	json.NewEncoder(w).Encode(response)
}

func main() {

	http.HandleFunc("/", helloHandler)

	fmt.Println("Server running on http://localhost:8080")

	http.ListenAndServe(":8080", nil)
}
