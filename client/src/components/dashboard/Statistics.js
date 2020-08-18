import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import {
  getCourseByAuthor,
  deleteCourse,
  getQuizzByAuthor,
  getAssignmentByAuthor,
} from "../../actions/profile";
import { connect } from "react-redux";
const Statistics = ({
  auth: { user },
  course: { courses, course, coursesAdded },
  quizz: { quizzAdded },
  assignment: { assignmentsAdded },
  getCourseByAuthor,
  getAssignmentByAuthor,
  getQuizzByAuthor,
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
  const data = coursesAdded.map(
    (result) =>
      result.rating.reduce((acc, curr) => acc + curr.score, 0) /
      result.rating.length
  );
  const myData = {
    type: "line",
    title: {
      text: "Number of monthly new users",
    },
    "scale-x": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },

    series: [{ values: [0, 1, 0, 1, 2, 1, 1] }],
  };

  const myData2 = {
    type: "bar3d",
    title: {
      text: "Average rating for each course",
    },
    plot: {
      aspect: "bar",
    },
    "scale-x": {
      labels: coursesAdded.map((course) => course.name).slice(),
    },
    series: [{ values: data }],
  };

  const myData3 = {
    type: "pie",
    legend: {
      layout: "1x2",
      x: "10%",
      y: "16%",
    },
    title: {
      text: "Users by gender",
    },
    series: [
      { values: [3], text: "M" },
      { values: [3], text: "F" },
    ],
  };
  return (
    <div>
      <h1 className=".text-secondary">
        {" "}
        <i class="far fa-chart-bar .text-success"></i> Statistics
      </h1>
      <p className="padd">
        <div className="container3">
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-book .text-success"></i>
              <div className="content">
                <h3>{coursesAdded.length} cursuri</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-question .text-success"></i>
              <div className="content">
                <h3>{quizzAdded.length} chestionare</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-user-circle .text-success"></i>
              <div className="content">
                <h3>6 cursanti</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="far fa-calendar-check"></i>
              <div className="content">
                <h3>{assignmentsAdded.length} teme</h3>
              </div>
            </div>
          </div>
        </div>
      </p>

      <p className="centerText">
        <ZingChart data={myData} height="400" width="600"></ZingChart>
      </p>
      <p className="centerText">
        <ZingChart data={myData2} height="400" width="600"></ZingChart>
      </p>
      <p className="centerText">
        <ZingChart data={myData3} height="400" width="600"></ZingChart>
      </p>
    </div>
  );
};

Statistics.propTypes = {
  auth: PropTypes.object.isRequired,
  getCourseByAuthor: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
  quizz: PropTypes.object.isRequired,
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
})(Statistics);
