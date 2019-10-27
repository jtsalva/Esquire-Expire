var food = []

const mongoose = require('mongoose')
const FoodConnection = require('../models/foodConnection')
const Foods = require('../models/food')

function addFoodForUser(food_id, user_id, callback) {
    let connectJson = {
        user_id: user_id,
        food_id: food_id,
    }

    let connection = new FoodConnection(connectJson)
    connection.save()
    .then(() => {
        callback(true)
    })
    .catch(() => {
        callback(false)
    })
}

function seeFoodForUser(user_id, callback) {
    FoodConnection.find({user_id: user_id})
    .then(result => {
        callback(result)
    })
    .catch(error => {
        console.log(error);
        callback()
    })
}

function remove(name, callback) {
    let id = food.find(element => {return element.name == name})._id
    FoodConnection.deleteOne({food_id: id})
    .then(() => {
        callback(true)
    })
    .catch(() => {
        callback(false)
    })
}


function useBy(start, duration) {
    if (duration.includes('mins')) {
        start.setMinutes(start.getMinutes() + parseInt(duration.charAt(0)))
    } else if (duration.includes('days')) {
        start.setDate(start.getDate() + parseInt(duration.charAt(0)))
    } else if (duration.includes('months')) {
        start.setDate(start.getDate() + (parseInt(duration.charAt(0)) * 28))
    } else if (duration.includes('indefinitely')) {
        return "indefinite"
    }

    return start
}

function loadFood() {
    return new Promise((resolve, reject) => {
        Foods.find({})
        .then(result => {
            food = result
            resolve()
        })
        .catch((error) => {
            console.log(error);
            reject()
        })
    })
}

function getFood() {
    return food
}


module.exports = {getFood, addFoodForUser, seeFoodForUser, useBy, remove, loadFood}
