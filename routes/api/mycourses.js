const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const MyCourse = require("../../models/MyCourses");
const User = require("../../models/User");
const Student = require("../../models/Student");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");

//@route POST api/mycourses
//@desc Get course by name author
//@access Private
router.post("/", authStudent, async (req, res) => {
  const student = await Student.findById(req.student.id).select("-password");
  const myCourse = new MyCourse({
    studentName: student.name,
    courseId: req.body.id,
    courseName: req.body.courseName,
    authorName: req.body.authorName,
    videoName: req.body.videoName,
    description: req.body.description,
    rating: req.body.rating,
  });
  try {
    const newCourse = await myCourse.save();
    res.json(newCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/mycourses/course/:nameAuth
//@desc Get course by student name
//@access Private

router.get("/:nameAuth", auth, async (req, res) => {
  console.log("aaaa");
  try {
    const course = await MyCourse.find({ studentName: req.params.nameAuth });
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
