const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuizResultSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  result: {
    type: Number,
  },
  noQuestions: {
    type: Number,
  },
  studentName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = QuizResult = mongoose.model("quizResult", QuizResultSchema);
