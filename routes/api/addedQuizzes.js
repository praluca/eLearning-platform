const express = require("express");
const router = express.Router();
const Quizz = require("../../models/Quizz");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
//@route GET api/courses/course/:nameAuth
//@desc Get course by name author
//@access Private

router.get("/:nameAuth", auth, async (req, res) => {
  console.log("aaaa");
  try {
    const quizz = await Quizz.find({ author: req.params.nameAuth });
    if (!quizz) {
      return res.status(404).json({ msg: "Quizz not found" });
    }
    res.json(quizz);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Quizz not found" });
    }
    res.status(500).send("Server error");
    console.log("aa");
  }
});
module.exports = router;
