const superagent = require('superagent');
const config = require('../../config.js');
const path = require('path');

function indexController(req, res) {
    res.status(200);
    res.sendFile(path.resolve('../EsquireExpireSignUp.htm'));
}

const chatbotController = require('../controllers/chatbot')
const registerController = require('../controllers/registration')

module.exports = function(app) {
    app.get('/', indexController)
    app.post('/hello', chatbotController.message)
    app.post('/register', registerController.register)
    app.get('/thank-you', thankYouController)
}

function thankYouController(req, res) {
    res.send("<html><head><title>Thank you!</title><style>h1 { font-size: 3em; text-align: center; }</style></head><body><br /><br /><br /><h1>Thank you " + req.query.firstName + " for registering with " + req.query.number + "</h1></body></html>")
}
