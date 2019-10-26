package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

const (
	testDatabase    = "test"
	foodsCollection = "foods"
)

func insert(items []Item) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	client, err := mongo.Connect(ctx, options.Client().
		ApplyURI("mongodb+srv://scraper:securepassword@cluster0-yvue0.gcp.mongodb.net"))
	if err != nil {
		panic(err)
	}

	collection := client.Database(testDatabase).Collection(foodsCollection)

	ctx, _ = context.WithTimeout(context.Background(), 8 * time.Second)

	for i, item := range items {
		fmt.Printf("Inserting %d\n", i + 1)
		_, err = collection.InsertOne(ctx, item)
		if err != nil {
			fmt.Println(err.Error())
		}
	}
}