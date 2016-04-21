package main

import "net/http"

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	request := r.URL.Path[1:]
	if request == "today" {
		outputTodayJSON(w)
	} else if request == "year" {
		outputYearJSON(w)
	} else {
		http.NotFound(w, r)
	}
}
