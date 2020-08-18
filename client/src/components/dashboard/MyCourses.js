import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getCourseByStudent, getCourseById } from "../../actions/profile";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const MyCourses = ({
  auth: { user },
  getCourseByStudent,
  course: { courses, course, coursesAdded, myCourses },
}) => {
  useEffect(() => {
    getCourseByStudent(user && user.name);
  }, []);
  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {myCourses &&
          myCourses.map((result) => (
            <div className="videoContainer">
              <div>
                <ReactPlayer
                  height="130"
                  width="300"
                  url={`../../../../uploads/videos/${result.videoName}`}
                  type="video/mp4"
                />
              </div>
              <div className="text-black">
                <strong className="courseTitle">{result.courseName}</strong>
                <br />
                <strong className="courseAuthor">{result.authorName}</strong>
                <br />
                <Rating
                  readonly
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  initialRating={result.rating}
                />

                <Link
                  to={`/student/start-course/${result.courseId}`}
                  class="myButton"
                >
                  Reattempt Course
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

MyCourses.propTypes = {
  getCourseByStudent: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});
export default connect(mapStateToProps, { getCourseByStudent })(MyCourses);
