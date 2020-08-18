import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import course from "./course";
import quizz from "./quizz";
import post from "./post";
import assignment from "./assignment";
export default combineReducers({
  alert,
  auth,
  profile,
  course,
  quizz,
  assignment,
  post,
});
