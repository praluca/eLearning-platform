const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const MyCourse = require("../../models/MyCourses");
const User = require("../../models/User");
const Student = require("../../models/Student");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
const QuizResult = require("../../models/QuizResult");
//@route POST api/mycourses
//@desc Get course by name author
//@access Private
router.post("/", authStudent, async (req, res) => {
  const student = await Student.findById(req.student.id).select("-password");
  const myQuizResult = new QuizResult({
    studentName: student.name,
    title: req.body.title,
    result: req.body.result,
    noQuestions: req.body.noQuestions,
  });
  try {
    const newQuizResult = await myQuizResult.save();
    res.json(newQuizResult);
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
    const quizResult = await QuizResult.find({
      studentName: req.params.nameAuth,
    });
    if (!quizResult) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(quizResult);
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
