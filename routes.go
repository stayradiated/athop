package main

import "net/http"

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func GetRoutes(h *Handlers) Routes {
	return Routes{
		Route{
			"ReadStop",
			"GET", "/stop/{id:[0-9]+}", h.ReadStop,
		},
	}
}
