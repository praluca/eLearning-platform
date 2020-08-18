import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuestion, getCurrentQuizzById } from "../../actions/profile";
import quizz from "../../reducers/quizz";
import { Link, withRouter } from "react-router-dom";

const AddQuestions = ({ quizz: { quizz }, addQuestion }) => {
  const [formData, setFormData] = useState({
    description: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: "",
  });
  const {
    description,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className=".text-secondary">Add a Question to Quizz</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addQuestion(quizz._id, formData);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Question"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer 1"
            name="answer1"
            value={answer1}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer 2"
            name="answer2"
            value={answer2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer 3"
            name="answer3"
            value={answer3}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer 4"
            name="answer4"
            value={answer4}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Correct answer"
            name="correctAnswer"
            value={correctAnswer}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Finish
        </Link>
      </form>
    </Fragment>
  );
};

AddQuestions.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  quizz: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  quizz: state.quizz,
});
export default connect(mapStateToProps, { addQuestion })(AddQuestions);
