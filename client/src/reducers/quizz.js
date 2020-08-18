import {
  ADD_QUIZZ,
  QUIZZES_ERROR,
  ADD_QUESTION,
  QUESTION_ERROR,
  GET_QUIZZES,
  GET_CURRENT_QUIZZ,
  GET_QUIZZ_BY_COURSE_NAME,
  ADD_MY_QUIZ_RESULT,
  GET_QUIZ_BY_STUDENT_NAME,
  GET_COURSE_BY_AUTHOR,
  DELETE_QUIZZ,
  GET_QUIZZ_BY_AUTHOR,
} from "../actions/types";

const initialState = {
  quizz: null,
  myQuizz: null,
  quizzes: [],
  currentQuizz: null,
  quizResults: [],
  quizzAdded: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUIZZ_BY_COURSE_NAME:
    case GET_QUIZZES:
      return {
        ...state,
        quizzes: payload,
        loading: false,
      };
    case GET_QUIZZ_BY_AUTHOR:
      return {
        ...state,
        quizzAdded: payload,
        loading: false,
      };
    case GET_QUIZ_BY_STUDENT_NAME:
      return {
        ...state,
        quizResults: payload,
        loading: false,
      };
    case GET_CURRENT_QUIZZ:
      return {
        ...state,
        currentQuizz: payload,
        loading: false,
      };
    case ADD_QUIZZ:
      return {
        ...state,
        quizz: payload,
        loading: false,
      };
    case ADD_MY_QUIZ_RESULT:
      return {
        ...state,
        myQuizz: payload,
        loading: false,
      };
    case QUESTION_ERROR:
    case QUIZZES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_QUESTION:
      return {
        ...state,
        quizz: { ...state.quizz, questions: payload },
        loading: false,
      };
    case DELETE_QUIZZ:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
