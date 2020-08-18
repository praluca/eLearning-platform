import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
  getCourseByAuthor,
  deleteCourse,
  getQuizzByAuthor,
  getAssignmentByAuthor,
  deleteAssignment,
  deleteQuizz,
} from "../../actions/profile";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const AddedCourses = ({
  auth: { user },
  course: { courses, course, coursesAdded },
  quizz: { quizzAdded },
  assignment: { assignmentsAdded },
  getCourseByAuthor,
  getAssignmentByAuthor,
  getQuizzByAuthor,
  deleteCourse,
  deleteAssignment,
  deleteQuizz,
}) => {
  useEffect(() => {
    getCourseByAuthor(user && user.name);
  }, []);
  useEffect(() => {
    getQuizzByAuthor(user && user.name);
  }, []);
  useEffect(() => {
    getAssignmentByAuthor(user && user.name);
  }, []);

  const myCourses =
    coursesAdded &&
    coursesAdded.map((course) => (
      <tr key={course._id}>
        <td>{course.name}</td>
        <td>
          <Moment format="YYYY/MM/DD">{course.date}</Moment>
        </td>
        <td>
          <Link
            to={`/add-courses/${course._id}`}
            className="btn btn-success"
            courseEdit={course}
          >
            {" "}
            Edit
          </Link>
        </td>
        <td>
          <button
            onClick={() => {
              deleteCourse(course._id);
              coursesAdded.splice(coursesAdded.indexOf(course._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  const myQuizzes =
    quizzAdded &&
    quizzAdded.map((quiz) => (
      <tr key={quiz._id}>
        <td>{quiz.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{quiz.date}</Moment>
        </td>
        <td>
          <button
            onClick={() => {
              deleteQuizz(quizzAdded._id);
              quizzAdded.splice(quizzAdded.indexOf(quiz._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  const myAssignmets =
    assignmentsAdded &&
    assignmentsAdded.map((ass) => (
      <tr key={ass._id}>
        <td>{ass.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{ass.date}</Moment>
        </td>
        <td>
          <button
            onClick={() => {
              deleteAssignment(ass._id);
              assignmentsAdded.splice(assignmentsAdded.indexOf(ass._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2 className="titleDashboard">My Added Courses</h2>
      <table className="table">
        <tbody>{myCourses}</tbody>
      </table>
      <h2 className="titleDashboard">My Added Quizzes</h2>
      <table className="table">
        <tbody>{myQuizzes}</tbody>
      </table>
      <h2 className="titleDashboard">My Added Assignments</h2>
      <table className="table">
        <tbody>{myAssignmets}</tbody>
      </table>
    </Fragment>
  );
};

AddedCourses.propTypes = {
  auth: PropTypes.object.isRequired,
  getCourseByAuthor: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
  quizz: PropTypes.object.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  deleteQuizz: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  quizz: state.quizz,
  assignment: state.assignment,
});
export default connect(mapStateToProps, {
  getCourseByAuthor,
  deleteCourse,
  getQuizzByAuthor,
  getAssignmentByAuthor,
  deleteAssignment,
  deleteCourse,
})(AddedCourses);
