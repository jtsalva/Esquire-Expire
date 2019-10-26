const superagent = require('superagent')
const config = require('../../config.js')
const userInfo = require('../models/userInfo.js')
const mongoose = require('mongoose')

function register(req, res) {
    const data = JSON.parse(Object.keys(req.body)[0])
    res.status(200);
    res.send("Hello there"); 
    mongoose.connect("mongodb+srv://scraper:securepassword@cluster0-yvue0.gcp.mongodb.net/userinfo");


    var conn= mongoose.connection;
    conn.collection('testuser').insert(data)
}

module.exports = {register}
