package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	router := NewRouter(&Handlers{})
	port := ":" + os.Getenv("PORT")

	fmt.Printf("Starting server on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}
