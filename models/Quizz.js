const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
  title: String,
  courseName: String,
  date: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      description: {
        type: String,
      },
      answer1: {
        type: String,
        required: true,
      },
      answer2: {
        type: String,
        required: true,
      },
      answer3: {
        type: String,
        required: true,
      },
      answer4: {
        type: String,
        required: true,
      },
      correctAnswer: {
        type: String,
      },
    },
  ],
  author: String,
});

module.exports = Quizz = mongoose.model("quiz", QuizzSchema);
