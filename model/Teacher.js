const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teacher = new Schema({
  name: { type: String },
  subject: { type: String },
});

module.exports = mongoose.model("Teacher", Teacher);
