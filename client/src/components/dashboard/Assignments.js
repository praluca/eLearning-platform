import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getAssignmentsByCourseName } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Assignments = ({
  getAssignmentsByCourseName,
  assignment: { assignments },
  course: { course },
}) => {
  useEffect(() => {
    getAssignmentsByCourseName(course && course.name);
  }, []);
  return (
    <Fragment>
      <div class="lead">List of Assignments</div>
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Assignment Name</th>
            <th scope="col">Assignment Author</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment._id}>
              <td>{index}</td>
              <td className="hide-sm">{assignment.title}</td>
              <td className="hide-sm">{assignment.author}</td>
              <td>
                <Link
                  to={`/student/start-assignment/${assignment._id}`}
                  class="btn btn-danger"
                >
                  Solve Challenge
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

Assignments.propTypes = {
  getAssignmentsByCourseName: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  assignment: state.assignment,
  course: state.course,
});

export default connect(mapStateToProps, { getAssignmentsByCourseName })(
  Assignments
);
