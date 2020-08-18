import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const PostItem = ({ addComment, courseId }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="myText2">Leave a comment!</div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="90"
          rows="3"
          placeholder="Write a comment"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            console.log("rula");
          }}
          required
        />
        <div className="myDiv">
          <button
            type="button"
            class="btn btn-black btn-sm my-1"
            onClick={(e) => {
              e.preventDefault();
              addComment(courseId, { text });
              setText("");
              console.log("rula");
            }}
          >
            Submit
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

PostItem.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(PostItem);
