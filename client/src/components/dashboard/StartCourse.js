import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentCourseById } from "../../actions/profile";
import ReactPlayer from "react-player";
import Posts from "../../components/posts/Posts";
import PostItem from "../posts/PostItem";
import CommentItem from "../posts/CommentItem";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { addFeedback } from "../../actions/post";
const StartCourse = ({ match, getCurrentCourseById, course, addFeedback }) => {
  useEffect(() => {
    getCurrentCourseById(match.params.id);
    console.log("useEffect");
  }, [getCurrentCourseById, match.params.id]);
  return (
    <Fragment>
      <div className="courseTitleContainer">{course && course.name}</div>

      <div className="courseTitleContainer">
        <ReactPlayer
          height="130"
          width="300"
          url={course && `../../../../uploads/videos/${course.videoName}`}
          type="video/mp4"
          controls
          volume
        />
        <div className="myText">
          <br />
          If you want to practice what you've learned in this course solve the
          quizzes and assignments below!
        </div>
        <div>
          <Link
            to={"/student/quizzes"}
            className="btn btn-black btn-lg btn-block"
          >
            Quizzes
          </Link>
          <Link
            to={"/student/assignments-list"}
            className="btn btn-black btn-lg btn-block"
          >
            Assignments
          </Link>
        </div>
        <br />
        {course && <PostItem courseId={course._id} />}
        <br />
        <div className="myText">
          Your feedback!
          <br />
          {/* <Rating
            onClick={(value) => {
              console.log(value);
              addFeedback(course._id, { value });
            }}
            emptySymbol="fa fa-thumbs-down fa-2x"
            fullSymbol="fa fa-thumbs-up fa-2x"
          /> */}
          <Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            onClick={(score) => {
              console.log(score);
              addFeedback(course._id, { score });
            }}
          />
        </div>
        <br />
        <div className="posts">
          {course &&
            course.comment.map((comm) => (
              <CommentItem key={comm._id} comm={comm} courseId={course._id} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

StartCourse.propTypes = {
  getCurrentCourseById: PropTypes.func.isRequired,
  addFeedback: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  course: state.course.course,
});

export default connect(mapStateToProps, { getCurrentCourseById, addFeedback })(
  StartCourse
);
