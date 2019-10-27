const mongoose = require('mongoose');
const config = require('../../config.js');

mongoose.connect(config.DBHost + "/test");
