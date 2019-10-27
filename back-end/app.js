const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
let config = require('./config.js')
const mongoose = require('mongoose')

let options = {
                useNewUrlParser: true,
            };

mongoUri = config.DBHost
mongoose.connect(mongoUri, options);
mongoose.connection.once('open', () => {
    console.log('MongoDB successfully connected');
});
app.use(bodyParser.urlencoded({extended: false}))

require('./app/routes/index')(app)

app.listen(port)
console.log("We are live at port 8000")
