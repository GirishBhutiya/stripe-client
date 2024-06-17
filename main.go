package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fs := http.FileServer(http.Dir("css"))
	r.Handle("/css/*", http.StripPrefix("/css/", fs))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})
	r.Get("/complete.html", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "complete.html")
	})
	http.ListenAndServe(":3000", r)
}
