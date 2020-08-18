const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
  likes: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    },
  ],
  comments: [
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Posts = mongoose.model("post", PostSchema);
