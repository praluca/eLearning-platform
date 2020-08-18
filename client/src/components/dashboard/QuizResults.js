import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getQuizzResultByStudent } from "../../actions/profile";
import { connect } from "react-redux";
import Moment from "react-moment";

const QuizResults = ({
  getQuizzResultByStudent,
  auth: { user },
  quizz: { quizResults },
}) => {
  useEffect(() => {
    getQuizzResultByStudent(user && user.name);
  }, []);
  return (
    <Fragment>
      <h2 className="titleDashboard">Quiz Results</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Quiz Name</th>
            <th scope="col">Quiz Result</th>
            <th scope="col">Quiz Date</th>
          </tr>
        </thead>
        <tbody>
          {quizResults &&
            quizResults.map((q) => (
              <tr key={q._id}>
                <td>{q.title}</td>
                <td className="hide-sm">
                  {q.result}/{q.noQuestions}
                </td>
                <td>
                  <Moment format="YYYY/MM/DD">{q.date}</Moment>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

QuizResults.propTypes = {
  getQuizzResultByStudent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  quizz: state.quizz,
});

export default connect(mapStateToProps, { getQuizzResultByStudent })(
  QuizResults
);
