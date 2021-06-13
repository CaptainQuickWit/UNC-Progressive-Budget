
/*boiler code only*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aSchema = new Schema({
  subsituteVar: {
    type: String,
    trim: true,
    required: "Enter a value"
  },
  object: {
    type: Number,
    required: "Enter a value"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const aSchema = mongoose.model("aSchema", aSchemaSchema);
module.exports = aSchema;
