const food = [
    {
        id: 1,
        name: 'orange',
        duration: '5 mins'
    },
    {
        id: 2,
        name: 'apple',
        duration: '2 mins'
    },
    {
        id: 3,
        name: 'fish',
        duration: '5 mins'
    }
]

const mongoose = require('mongoose')
const FoodConnection = require('../models/foodConnection')

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
    let id = food.find(element => {return element.name == name}).id
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


module.exports = {food, addFoodForUser, seeFoodForUser, useBy, remove}
