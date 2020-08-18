const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  title: String,
  courseName: String,
  problemDescription: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Assignment = mongoose.model("assignment", AssignmentSchema);
