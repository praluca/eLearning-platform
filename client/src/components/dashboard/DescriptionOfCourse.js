import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { getCurrentCourseById } from "../../actions/profile";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { addMyCourse } from "../../actions/profile";

const DescriptionOfCourse = ({
  match,
  getCurrentCourseById,
  course,
  addMyCourse,
}) => {
  useEffect(() => {
    getCurrentCourseById(match.params.id);
    console.log("useEffect");
  }, [getCurrentCourseById, match.params.id]);

  const [formData, setFormData] = useState({
    id: match.params.id,
    courseName: course && course.name,
    authorName: course && course.author,
    videoName: course && course.videoName,
    description: course && course.description,
    rating:
      course &&
      course.rating.reduce((acc, curr) => acc + curr.score, 0) /
        course.rating.length,
  });
  const { id, courseName, authorName, videoName, description } = formData;
  return (
    <Fragment>
      <div className="courseTitleContainer">
        {course && course.name} - {course && course.author}
      </div>
      <div>{parse(`${course && course.description}`)}</div>
      <div>
        <Link
          to={`/student/start-course/${course && course._id}`}
          class="myButton2"
          onClick={() => {
            addMyCourse(formData);
          }}
        >
          Start Course
        </Link>
        <Link to={`/student/dashboard`} className="myButton3">
          Back
        </Link>
      </div>
    </Fragment>
  );
};

DescriptionOfCourse.propTypes = {
  getCurrentCourseById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  course: state.course.course,
});

export default connect(mapStateToProps, { getCurrentCourseById, addMyCourse })(
  DescriptionOfCourse
);
