import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getQuizzesByCourseName } from "../../actions/profile";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import StartQuiz from "../dashboard/StartQuiz";
import history from "./history";

const Quizzes = ({
  getQuizzesByCourseName,
  quizz: { quizzes },
  course: { course },
}) => {
  useEffect(() => {
    getQuizzesByCourseName(course && course.name);
  }, []);
  return (
    <Fragment>
      <div class="lead">List of Quizzes</div>
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Quiz Name</th>
            <th scope="col">Quiz Author</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quizz, index) => (
            <tr key={quizz._id}>
              <td>{index}</td>
              <td className="hide-sm">{quizz.title}</td>
              <td className="hide-sm">{quizz.author}</td>
              <td>
                <Link
                  to={`/student/start-quiz/${quizz._id}`}
                  class="btn btn-danger"
                >
                  Start Quizz
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={`/student/start-course/${course && course._id}`}
        className="myButton3"
      >
        Back
      </Link>
    </Fragment>
  );
};

Quizzes.propTypes = {
  getQuizzesByCourseName: PropTypes.func.isRequired,
  quizzes: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  quizz: state.quizz,
  course: state.course,
});
export default connect(mapStateToProps, { getQuizzesByCourseName })(Quizzes);
