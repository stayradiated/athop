package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	router := NewRouter(&Handlers{})
	port := ":7000"

	fmt.Printf("Starting server on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}
