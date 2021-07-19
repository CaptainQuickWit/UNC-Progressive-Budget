
/*boiler code only*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const budgetSchema = new Schema({
  subsituteVar: {
    type: String,
    trim: true,
    required: "What do you want this transaction to be labeled as"
  },
  object: {
    type: Number,
    required: "Enter the amount in USD"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const budgetModel = mongoose.model("budgetSchema", budgetSchema);
//export
module.exports = budgetModel;
