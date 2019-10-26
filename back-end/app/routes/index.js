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
    app.post('/hello', chatbotController.message)
    app.post('/register', registerController.register)
    app.get('/', indexController)
}
