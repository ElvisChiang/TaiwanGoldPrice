package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/ElvisChiang/crawler/goldprice"
)

func outputYearJSON(w http.ResponseWriter) {
	dateArray, yearPrice := goldprice.GetYearFromTaiwanBank()

	fmt.Fprintf(w, "{\n")
	outString := fmt.Sprintf("  \"total\": %d,\n  \"price\": [\n", len(dateArray))
	for index, date := range dateArray {
		price := yearPrice[date]

		json := fmt.Sprintf(`{"date":%d%02d%02d, "buy":%d, "sell":%d}`,
			date.Year, date.Month, date.Day,
			price.Buy, price.Sell)
		outString += "    " + json
		if index == len(dateArray)-1 {
			outString += "\n"
		} else {
			outString += ",\n"
		}
	}

	outString += "  ]"
	fmt.Fprintln(w, outString)
	fmt.Fprintf(w, "}\n")
}

func outputTodayJSON(w http.ResponseWriter) {
	t := time.Now()
	today := goldprice.Date{Year: t.Year(), Month: int(t.Month()), Day: t.Day()}
	timeArray, dayPrice := goldprice.GetDayFromTaiwanBank(today)

	fmt.Fprintf(w, "{\n")
	outString := fmt.Sprintf("  \"total\": %d,\n  \"date\": \"%d%02d%02d\",\n  \"price\": [\n",
		len(timeArray),
		today.Year, today.Month, today.Day)
	for index, time := range timeArray {
		price := dayPrice[time]

		json := fmt.Sprintf(`{"hour":%d, "minute":%d, "buy":%d, "sell":%d}`,
			time.Hour, time.Minute, price.Buy, price.Sell)
		outString += "    " + json
		if index == len(timeArray)-1 {
			outString += "\n"
		} else {
			outString += ",\n"
		}
	}

	outString += "  ]"
	fmt.Fprintln(w, outString)
	fmt.Fprintf(w, "}\n")
}
