const express = require("express");
const router = express.Router();
const Assignment = require("../../models/Assignment");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");
//@route GET api/courses/course/:nameAuth
//@desc Get course by name author
//@access Private

router.get("/:nameAuth", auth, async (req, res) => {
  console.log("aaaa");
  try {
    const assignment = await Assignment.find({ author: req.params.nameAuth });
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
    console.log("aa");
  }
});
module.exports = router;
