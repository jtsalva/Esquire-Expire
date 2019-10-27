let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FoodConnectionSchema = new Schema(
    {
        user_id: {type: String, required: true},
        food_id: {type: String, required: true},
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

FoodConnectionSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('foodConnection', FoodConnectionSchema);
