const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  name: { type: String },
  gpa: { type: Number },
  id: { type: Number },
});

module.exports = mongoose.model("Student", Student);
