const superagent = require('superagent')
const config = require('../../config.js')
const food = require('./food')

const user_id = 1

function message(req, res) {
    res.status(200)
    res.set('Content-Type', "text/xml")
    if (food.getFood().length == 0) {
        food.loadFood()
        .then(() => {
            theRestOfTheMessage(req, res)
        })
        .catch(() => {
            res.send(createMessage("error"))
        })
    } else {
        theRestOfTheMessage(req, res)
    }
}

function theRestOfTheMessage(req, res) {
    decideMessageMeaning(req.body.Body)
    .then(response => {
        let intent = selectIntent(response.entities)
        let value = getValueForIntent(intent, response.entities)
        if (intent == "add") {
            let food_id = food.getFood().find(element => {return element.name == value})._id
            food.addFoodForUser(food_id, user_id, success => {
                if (success) {
                    res.send(createMessage(intent, value))
                } else {
                    res.send(createMessage("error"))
                }
            })
        } else if (intent == "show") {
            food.seeFoodForUser(user_id, foodz => {
                if (foodz) {
                    res.send(showMessage(foodz))
                } else {
                    res.send(createMessage("error"))
                }
            })
        } else if (intent == "delete") {
            food.remove(value, success => {
                if(success) {
                    res.send(createMessage(intent, value))
                } else {
                    res.send(createMessage("error"))
                }
            })
        } else {
            let mess = createMessage(intent, value)
            res.send(createMessage(intent, value))
        }
    }, error => {
        console.log(error);
    })
}

function decideMessageMeaning(message) {
    return new Promise((resolve, reject) => {
        superagent.get("https://api.wit.ai/message")
        .query({v: 20170307, q: message})
        .set({'Authorization': 'Bearer ' + config.wit_token})
        .end((err, res) => {
            if (err) {
                return reject(err)
            } else {
                resolve(res.body)
            }
        })
    })

}

function selectIntent(entities) {
    if (entities.add) {
        return "add"
    } else if (entities.show) {
        return "show"
    } else if (entities.delete) {
        return "delete"
    } else {
        return "unknown"
    }
}

function createMessage(intent, value) {
    if (intent == "add") {
        return "<Response><Message>Successfully added " + value + " to your inventory</Message></Response>"
    } else if (intent == "show") {
        return "<Response><Message>It sounds like you'd like to see all of your food</Message></Response>"
    } else if (intent == "delete") {
        return "<Response><Message>Successfully removed " + value + " from your inventory</Message></Response>"
    } else if (intent == "error") {
        return "<Response><Message>Sorry there was an error</Message></Response>"
    } else {
        return "<Response><Message>I'm sorry I didn't understand. Try again?</Message></Response>"
    }
}

function getValueForIntent(intent, entities) {
    if (intent == "add") {
        return entities.add[0].value
    } else if (intent == "delete") {
        return entities.delete[0].value
    }
}

function showMessage(foodz) {
    console.log("here");
    var message = "<Response><Message>Here's all the food I have on record for you:\n\n"
    for (f in foodz) {
        console.log(foodz[f]);
        let fObj = food.getFood().find(element => {return element._id == foodz[f].food_id})
        console.log(fObj);
        message += fObj.name + ", Use By: " + food.useBy(foodz[f].createdAt, fObj.expiresin) + "\n\n"
    }
    message += "</Message></Response>"
    return message
}


module.exports = {message}
