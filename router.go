package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewRouter(handlers *Handlers) *mux.Router {
	router := mux.NewRouter()

	for _, route := range GetRoutes(handlers) {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).Path(route.Pattern).
			Name(route.Name).Handler(handler)
	}

	client := http.FileServer(http.Dir("./client/dist"))
	router.PathPrefix("/").Handler(client)

	return router
}
