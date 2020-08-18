import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentQuizzById, addMyQuizResult } from "../../actions/profile";
import QuestionBox from "./QuestionBox";
import Result from "./Result";
import { Link } from "react-router-dom";
const StartQuiz = ({
  match,
  getCurrentQuizzById,
  currentQuizz,
  addMyQuizResult,
  course: { course },
}) => {
  useEffect(() => {
    getCurrentQuizzById(match.params.id);
    console.log("useEffect");
  }, [getCurrentQuizzById, match.params.id]);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState(0);
  const computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    setResponses(
      currentQuizz && responses < currentQuizz.questions.length
        ? responses + 1
        : currentQuizz.questions.length
    );
  };
  const [formData, setFormData] = useState({
    title: currentQuizz && currentQuizz.title,
    scor: score,
  });
  const { title, scor } = formData;
  return (
    <Fragment>
      <div class="container2">
        <div class="title">{currentQuizz && currentQuizz.title}</div>
        {currentQuizz &&
          responses < currentQuizz.questions.length &&
          currentQuizz.questions.map(
            ({
              description,
              answer1,
              answer2,
              answer3,
              answer4,
              correctAnswer,
              _id,
            }) => (
              <QuestionBox
                description={description}
                answer1={answer1}
                answer2={answer2}
                answer3={answer3}
                answer4={answer4}
                key={_id}
                selected={(answer) => computeAnswer(answer, correctAnswer)}
              />
            )
          )}

        {currentQuizz && responses === currentQuizz.questions.length ? (
          <Result score={score} quizz={currentQuizz} />
        ) : null}
      </div>
    </Fragment>
  );
};

StartQuiz.propTypes = {
  currentQuizz: PropTypes.object.isRequired,
  getCurrentQuizzById: PropTypes.func.isRequired,
  addMyQuizResult: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  currentQuizz: state.quizz.currentQuizz,
  course: state.course,
});
export default connect(mapStateToProps, {
  getCurrentQuizzById,
  addMyQuizResult,
})(StartQuiz);
