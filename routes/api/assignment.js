const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
const Quizz = require("../../models/Quizz");
const User = require("../../models/User");
const Assignment = require("../../models/Assignment");
//@route POST api/assignment
//@desc Create one assignment
//@access Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newAssignment = new Assignment({
      title: req.body.title,
      courseName: req.body.courseName,
      problemDescription: req.body.problemDescription,
      author: user.name,
    });

    const assignment = await newAssignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get assignment by name course
router.get("/assignment/:name", auth, async (req, res) => {
  console.log(req.params.name);
  try {
    const assignment = await Assignment.find({ courseName: req.params.name });
    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});
//@route GET api/courses/course/:id
//@desc Get post by id
//@access Private

router.get("/:id", authStudent, async (req, res) => {
  try {
    const course = await Assignment.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    await assignment.remove();
    res.json({ msg: "Assignment removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
