const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authStudent");
const Student = require("../../models/Student");
const bcriypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//@route GET api/studentsAuth
//@desc TEST
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/studentsAuth
//@desc Authenticate student & get token
//@access Public
router.post(
  "/",
  [
    check("email", "Please include an valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //See if the user exists
      let student = await Student.findOne({ email });

      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcriypt.compare(password, student.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //Return jsonwebtoken
      const payload = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
