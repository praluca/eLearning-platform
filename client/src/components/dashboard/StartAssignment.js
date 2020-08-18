import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentAssignmentById } from "../../actions/profile";
import parse from "html-react-parser";
const StartAssignment = ({
  match,
  getCurrentAssignmentById,
  currentAssignment,
}) => {
  useEffect(() => {
    getCurrentAssignmentById(match.params.id);
    console.log("useEffect");
  }, [getCurrentAssignmentById, match.params.id]);
  return (
    <div>
      <div class="title">{currentAssignment && currentAssignment.title}</div>
      <div class="myText">
        {parse(`${currentAssignment && currentAssignment.problemDescription}`)}
      </div>
      <form
        action="https://www.jdoodle.com/api/redirect-to-post/online-java-compiler"
        method="post"
      >
        <textarea name="initScript" rows="8" cols="120"></textarea>
        <input type="submit" value="Submit" class="btn btn-black" />
      </form>
    </div>
  );
};

StartAssignment.propTypes = {
  currentAssignment: PropTypes.object.isRequired,
  getCurrentAssignmentById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  currentAssignment: state.assignment.currentAssignment,
});

export default connect(mapStateToProps, { getCurrentAssignmentById })(
  StartAssignment
);
