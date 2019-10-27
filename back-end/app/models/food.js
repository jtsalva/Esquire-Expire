let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FoodSchema = new Schema(
    {
        name: {type: String, required: true},
        expiresin: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('foods', FoodSchema);
