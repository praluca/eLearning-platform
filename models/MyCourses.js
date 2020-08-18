const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MyCoursesSchema = new Schema({
  courseId: {
    type: String,
  },
  studentName: {
    type: String,
  },
  courseName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  videoName: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
module.exports = MyCourses = mongoose.model("mycourses", MyCoursesSchema);
