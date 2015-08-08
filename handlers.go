package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Handlers struct {
}

func (h Handlers) ReadStop(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	movements, err := requestStopInfo(id)
	if err != nil {
		fmt.Fprintln(w, err)
		return
	}

	w.Header().Set("content-type", "application/json")

	// TODO: remove
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(movements)
}
