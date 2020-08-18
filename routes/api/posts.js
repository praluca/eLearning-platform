const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const authStudent = require("../../middleware/authStudent");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const Student = require("../../models/Student");
const Course = require("../../models/Course");

//@route POST api/posts/comm/course/:id
//@desc Comment on a course
//@access Private
router.post(
  "/comm/course/:id",
  [authStudent, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await Student.findById(req.student.id).select(
        "-password"
      );
      const course = await Course.findById(req.params.id);
      const newPost = {
        text: req.body.text,
        name: student.name,
        avatar: student.avatar,
        student: req.student.id,
      };

      course.comment.unshift(newPost);
      await course.save();
      res.json(course.comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// //@route POST api/posts/feedback/course/:id
// //@desc Comment on a course
// //@access Private
// router.post("/feedback/course/:id", authStudent, async (req, res) => {
//   try {
//     const student = await Student.findById(req.student.id).select("-password");
//     const course = await Course.findById(req.params.id);
//     const newFeedback = {
//       score: req.body.score,
//       student: req.student.id,
//     };

//     course.rating.unshift(newFeedback);
//     await course.save();
//     res.json(course.rating);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

//@route GET api/posts
//@desc Get all post
//@access Private

router.get("/", authStudent, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/posts/:id
//@desc Get post by id
//@access Private

router.get("/:id", authStudent, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Posts not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Posts not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route DELTE api/posts'/:ID
//@desc Delete a  post
//@access Private

router.delete("/:id", authStudent, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Posts not found" });
    }

    if (post.student.toString() !== req.student.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Posts not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route PUT api/posts'/like/:ID
//@desc Like a  post
//@access Private
router.put("/like/:id", authStudent, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.student.toString() === req.student.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ student: req.student.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "Posts not found" });
  }
});

//@route PUT api/posts'/unlike/:ID
//@desc Like a  post
//@access Private
router.put("/unlike/:id", authStudent, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.student.toString() === req.student.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    //Get remove index
    const removeIndex = post.likes
      .map((like) => like.student.toString())
      .indexOf(req.student.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "Posts not found" });
  }
});

//@route POST api/posts/comment/:id
//@desc Coment on a post
//@access Private
router.post(
  "/comment/:id",
  [authStudent, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await Student.findById(req.student.id).select(
        "-password"
      );
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: student.name,
        avatar: student.avatar,
        student: req.student.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
//@route DELETE api/posts/comment/:id/:COMMENT_ID
//@desc Delete comment
//@access Private

router.delete("/comment/:id/:comment_id", authStudent, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure commment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    //check user
    if (comment.student.toString() !== req.student.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.student.toString())
      .indexOf(req.student.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
