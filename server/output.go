package main

import (
	"fmt"

	"github.com/ElvisChiang/crawler/goldprice"
)

func outputYearJSON() {
	dateArray, yearPrice := goldprice.GetYearFromTaiwanBank()

	outString := fmt.Sprintf("  \"total\": %d,\n  \"price\": [\n", len(dateArray))
	for _, date := range dateArray {
		price := yearPrice[date]

		json := fmt.Sprintf(`{"date":%d%02d%02d, "buy":%d, "sell":%d}`,
			date.Year, date.Month, date.Day,
			price.Buy, price.Sell)
		outString += "    " + json + ",\n"
	}
	outString += "  ],"
	fmt.Println(outString)
}

func outputDateJSON() {
	today := goldprice.Date{Year: 2016, Month: 4, Day: 18}
	timeArray, dayPrice := goldprice.GetDayFromTaiwanBank(today)

	outString := fmt.Sprintf("  \"total\": %d,\n  \"price\": [\n", len(timeArray))
	for _, time := range timeArray {
		price := dayPrice[time]

		json := fmt.Sprintf(`{"date":%d%02d%02d, "hour":%d, "minute":%d, "buy":%d, "sell":%d}`,
			today.Year, today.Month, today.Day,
			time.Hour, time.Minute, price.Buy, price.Sell)
		outString += "    " + json + ",\n"
	}
	outString += "  ]"
	fmt.Println(outString)
}
