import React, { useState } from "react";

export const QuestionBox = ({
  description,
  answer1,
  answer2,
  answer3,
  answer4,
  selected,
}) => {
  const [options, setOptions] = useState([answer1, answer2, answer3, answer4]);
  return (
    <div className="questionBox">
      <div className="question">{description}</div>
      {options.map((text, index) => (
        <button
          key={index}
          className="answerBtn"
          onClick={() => {
            setOptions([text]);
            selected(text);
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
};
export default QuestionBox;
