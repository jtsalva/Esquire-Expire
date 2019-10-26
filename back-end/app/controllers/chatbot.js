const superagent = require('superagent')
const config = require('../../config.js')

function message(req, res) {
    res.status(200)
    res.set('Content-Type', "text/xml")
    decideMessageMeaning(req.body.Body)
    .then(response => {
        let intent = selectIntent(response.entities)
        let value = getValueForIntent(intent, response.entities)
        let mess = createMessage(intent, value)
        res.send(createMessage(intent, value))
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
    console.log(entities);
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
        return "<Response><Message>It sounds like you'd like to add a " + value + "</Message></Response>"
    } else if (intent == "show") {
        return "<Response><Message>It sounds like you'd like to see all of your food</Message></Response>"
    } else if (intent == "delete") {
        return "<Response><Message>It sounds like you'd like to remove your " + value + "</Message></Response>"
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

module.exports = {message}
