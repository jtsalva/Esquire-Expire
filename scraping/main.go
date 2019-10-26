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

const baseUrl = "http://www.eatbydate.com/"

var (
	lookingFor = ""
	foundItem = false
	opened = false
	moveOnToNextData = false
	items = make([]Item, 0)
)

func main() {
	fmt.Println("Starting...")

	categoryUrls := make([]string, 0)
	collector := colly.NewCollector()

	collector.OnHTML("div.col-cody-12", func(e *colly.HTMLElement) {
		e.ForEach(".heading-link", func(i int, e *colly.HTMLElement) {
			categoryUrls = append(categoryUrls, e.Attr("href"))
		})
	})

	err := collector.Visit(baseUrl)
	if err != nil {
		panic(err)
	}

	getCategories(categoryUrls)
}

func getCategories(categoryUrls []string) {
	numberOfCategories := len(categoryUrls)
	itemUrls := make([]string, 0)
	collector := colly.NewCollector()

	collector.OnHTML("div.fusion-content-boxes", func(e *colly.HTMLElement) {
		e.ForEach(".heading-link", func(i int, e *colly.HTMLElement) {
			itemUrls = append(itemUrls, e.Attr("href"))
		})
	})

	var err error
	for i, categoryUrl := range categoryUrls {
		fmt.Printf("Fetching Category #%d out of %d\n", i + 1, numberOfCategories)

		err = collector.Visit(categoryUrl)
		if err != nil {
			panic(err)
		}
	}

	getItems(itemUrls)
}

func getItems(itemUrls []string) {
	numberOfItems := len(itemUrls)
	collector := colly.NewCollector()

	collector.OnHTML("div.cody-green-table h2.title.cntrtxt strong", func(e *colly.HTMLElement) {
		lookingFor = e.Text[:len(e.Text) - 16]
	})
	collector.OnHTML("div.fusion-column", handleMainDataTable)

	var err error
	for i, itemUrl := range itemUrls {
		fmt.Printf("Fetching Item #%d out of %d\n", i + 1, numberOfItems)

		err = collector.Visit(itemUrl)
		if err != nil {
			fmt.Println(err.Error())
		}
	}
}

func handleMainDataTable(e *colly.HTMLElement) {
	moveOnToNextData = false
	go e.ForEach("tr", handleRow)
}

func handleRow(rowNum int, e *colly.HTMLElement) {
	text := e.Text

	if !opened && strings.Contains(text, "(Opened)") {
		opened = true
	}

	if !moveOnToNextData {
		e.ForEach("td", handleData)
	}
}

func handleData(dataNum int, e *colly.HTMLElement) {
	switch dataNum {
	case 0:
		foundItem = strings.Contains(e.Text, lookingFor)
	case 1:
		if foundItem {
			fmt.Printf("\t%s: %s\n", lookingFor, e.Text)
			items = append(items, Item{
				Name:      lookingFor,
				ExpiresIn: e.Text,
			})

			moveOnToNextData = true
		}
	}
}