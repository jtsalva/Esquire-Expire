const chatbotController = require('../controllers/chatbot')

module.exports = function(app) {
    app.post('/hello', chatbotController.message)
}
