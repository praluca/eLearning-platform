const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
const Quizz = require("../../models/Quizz");
const User = require("../../models/User");

//@route POST api/quizzes
//@desc Create one quizz
//@access Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newQuizz = new Quizz({
      title: req.body.title,
      courseName: req.body.courseName,
      author: user.name,
    });

    const quizz = await newQuizz.save();
    res.json(quizz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/quizzes
//@desc Create one quizz
//@access Private
router.post("/add", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newQuizz = new Quizz({
      title: req.body.title,
      author: user.name,
      questions: req.body.questions,
    });

    const quizz = await newQuizz.save();
    res.json(quizz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/quizzes/question/:id
//@desc Add one question to a quizz
//@access Private
router.post("/question/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const quizz = await Quizz.findById(req.params.id);

    const newQuestion = {
      description: req.body.description,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      answer3: req.body.answer3,
      answer4: req.body.answer4,
      correctAnswer: req.body.correctAnswer,
    };

    quizz.questions.unshift(newQuestion);

    await quizz.save();
    res.json(quizz.questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route GET api/quizzes
//@desc Get all quizzes
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const quizzes = await Quizz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const quizz = await Quizz.findById(req.params.id);
    res.json(quizz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get quizz by name course
router.get("/quiz/:name", auth, async (req, res) => {
  console.log(req.params.name);
  try {
    const quizz = await Quizz.find({ courseName: req.params.name });
    if (!quizz) {
      return res.status(404).json({ msg: "Quizz not found" });
    }

    res.json(quizz);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const quizz = await Quizz.findById(req.params.id);

    if (!quizz) {
      return res.status(404).json({ msg: "Quizz not found" });
    }

    await quizz.remove();
    res.json({ msg: "Quizz removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Quizz not found" });
    }
    res.status(500).send("Server error");
  }
});
module.exports = router;
