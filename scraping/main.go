package main

import (
	"fmt"
	"github.com/gocolly/colly"
	"strings"
)

type Item struct {
	Name string `json:"name"`
	ExpiresIn string `json:"expiresIn"`
}

const URL = "http://www.eatbydate.com/dairy/milk/soy-rice-almond-milk-substitutes-shelf-life-expiration-date//"

var (
	foundItem = ""
	opened = false
	items = make([]Item, 0)
)

func main() {
	fmt.Println("Starting...")

	collector := colly.NewCollector()

	collector.OnHTML("table#unopened", handleMainDataTable)

	err := collector.Visit(URL)
	if err != nil {
		panic(err)
	}

	for _, item := range items {
		fmt.Printf("%s: %s\n", item.Name, item.ExpiresIn)
	}
}

func handleMainDataTable(e *colly.HTMLElement) {
	e.ForEach("tr", handleRow)
}

func handleRow(rowNum int, e *colly.HTMLElement) {
	text := e.Text

	if !opened && strings.Contains(text, "(Opened)") {
		opened = true
	}

	e.ForEach("td", handleData)
}

func handleData(dataNum int, e *colly.HTMLElement) {
	switch dataNum {
	case 0:
		if strings.Contains(e.Text, " lasts for") {
			foundItem = e.Text[:len(e.Text) - 11]
		}
	case 1:
		if foundItem != "" {
			items = append(items, Item{
				Name:      foundItem,
				ExpiresIn: e.Text,
			})
		}

		foundItem = ""
	}
}