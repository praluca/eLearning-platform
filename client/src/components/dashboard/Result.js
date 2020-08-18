import React, { useEffect, useState } from "react";
import { addMyQuizResult } from "../../actions/profile";
import { connect } from "react-redux";

export const Result = ({ score, quizz, addMyQuizResult }) => {
  const [formData, setFormData] = useState({
    result: score,
    title: quizz.title,
    noQuestions: quizz.questions.length,
  });
  const { result, title } = formData;
  return (
    <div className="score-board">
      <div className="score">
        Your scored {score}/{quizz.questions.length} correct answers!
        <br />
        <button
          className="btn btn-black"
          onClick={() => {
            console.log("rulaaaaaaaaaaaaaaaaaaa");
            console.log(formData);
            addMyQuizResult(formData);
          }}
        >
          Salveaza Rezultatul
        </button>
      </div>
    </div>
  );
};
export default connect(null, { addMyQuizResult })(Result);
