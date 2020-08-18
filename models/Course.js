const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoBasePath = "uploads/videos";
const path = require("path");
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  rating: [
    {
      score: {
        type: Number,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
  videoName: {
    type: String,
    // required: true,
  },
  comment: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
CourseSchema.virtual("videoPath").get(function () {
  if (this.videoName != null) {
    return path.join("/", videoBasePath, this.videoName);
  }
});
module.exports = Course = mongoose.model("course", CourseSchema);
module.exports.videoBasePath = videoBasePath;
