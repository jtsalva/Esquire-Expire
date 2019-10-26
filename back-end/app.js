const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.urlencoded({extended: false}))

require('./app/routes/index')(app)

app.listen(port, '0.0.0.0')
console.log("We are live at port 8000")
