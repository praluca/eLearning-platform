const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
//@route GET api/courses/course/:nameAuth
//@desc Get course by name author
//@access Private

router.get("/:nameAuth", auth, async (req, res) => {
  console.log("aaaa");
  try {
    const course = await Course.find({ author: req.params.nameAuth });
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Server error");
    console.log("aa");
  }
});
module.exports = router;
