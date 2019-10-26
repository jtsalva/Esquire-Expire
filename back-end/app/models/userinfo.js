const mongoose = require("mongoose");


const schema = new mongoose.Schema({ firstName: "string", phoneNumber: "string"});
const userInfo = mongoose.model("userInfo", schema, 'testuser');

module.exports = {userInfo};