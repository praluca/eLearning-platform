import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ADD_COURSE,
  GET_COURSES,
  COURSES_ERROR,
  GET_FILTERED_COURSE,
  ADD_QUIZZ,
  QUIZZES_ERROR,
  ADD_QUESTION,
  QUESTION_ERROR,
  GET_QUIZZES,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_CURRENT_QUIZZ,
  GET_CURRENT_COURSE,
  GET_COURSE_BY_AUTHOR,
  DELETE_COURSE,
  DELETE_ERROR,
  UPDATE_COURSE,
  GET_COURSE_BY_ID,
  GET_QUIZZ_BY_COURSE_NAME,
  ADD_ASSIGNMENT,
  GET_ASSIGNMENT_BY_COURSE_NAME,
  GET_ASSIGNMENT_BY_ID,
  ADD_MY_COURSE,
  GET_COURSE_BY_STUDENT_NAME,
  ADD_MY_QUIZ_RESULT,
  GET_QUIZ_BY_STUDENT_NAME,
  GET_QUIZZ_BY_AUTHOR,
  GET_ASSIGNMENT_BY_AUTHOR,
  DELETE_QUIZZ,
  DELETE_ASSIGNMENT,
} from "./types";
import course from "../reducers/course";

//Get the current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience  Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education  Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add course
export const addCourse = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("api/courses", formData, config);
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("Course Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all courses
export const getAllCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/courses");

    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get filtered courses
export const getFilteredCourse = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/${enteredFilter}`);
    dispatch({
      type: GET_FILTERED_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get  course by id
export const getCourseById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/course/${id}`);
    dispatch({
      type: GET_COURSE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get course by author
export const getCourseByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/added/${enteredFilter}`);
    dispatch({
      type: GET_COURSE_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Delete course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/courses/${id}`);
    dispatch({
      type: DELETE_COURSE,
      payload: res.data,
    });

    dispatch(setAlert("Course  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Update course
export const updateCourse = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.put(`/api/courses/${id}`, formData, config);
    dispatch({
      type: UPDATE_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("Course Updated", "success"));
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add a quizz
export const addQuizz = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/quizzes", formData, config);
    dispatch({
      type: ADD_QUIZZ,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a question to quizz
export const addQuestion = (quizzId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/quizzes/question/${quizzId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    });
    dispatch(setAlert("Question Added", "success"));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get quizzes
export const getQuizzes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/quizzes");
    dispatch({
      type: GET_QUIZZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get quizzes by course name
export const getQuizzesByCourseName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/quizzes/quiz/${name}`);
    dispatch({
      type: GET_QUIZZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_QUIZZ_BY_COURSE_NAME,
      payload: { status: err.response.status },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get current quizz by id
export const getCurrentQuizzById = (quizzId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/quizzes/${quizzId}`);
    dispatch({
      type: GET_CURRENT_QUIZZ,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get current course by id
export const getCurrentCourseById = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/course/${courseId}`);
    dispatch({
      type: GET_CURRENT_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add assignment
export const addAssignment = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/assignments", formData, config);
    dispatch({
      type: ADD_ASSIGNMENT,
      payload: res.data,
    });
    dispatch(setAlert("Assignment Added", "success"));
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get assignments by course name
export const getAssignmentsByCourseName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/assignments/assignment/${name}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_COURSE_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_QUIZZ_BY_COURSE_NAME,
      payload: { status: err.response.status },
    });
  }
};

//Get current assignment by id
export const getCurrentAssignmentById = (assignmentId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/assignments/${assignmentId}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a view course
export const addMyCourse = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/mycourses", formData, config);
    dispatch({
      type: ADD_MY_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get course by student name
export const getCourseByStudent = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/mycourses/${enteredFilter}`);
    dispatch({
      type: GET_COURSE_BY_STUDENT_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a my quiz result
export const addMyQuizResult = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/myquizresults", formData, config);
    dispatch({
      type: ADD_MY_QUIZ_RESULT,
      payload: res.data,
    });
    dispatch(setAlert("Result saved", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get quiz by student name
export const getQuizzResultByStudent = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/myquizresults/${enteredFilter}`);
    dispatch({
      type: GET_QUIZ_BY_STUDENT_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get quizz by author
export const getQuizzByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/addedQuizzes/${enteredFilter}`);
    dispatch({
      type: GET_QUIZZ_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get assignment by author
export const getAssignmentByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/addedAssignments/${enteredFilter}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Delete quizz
export const deleteQuizz = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/quizzes/${id}`);
    dispatch({
      type: DELETE_QUIZZ,
      payload: res.data,
    });

    dispatch(setAlert("Quizz  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Delete assignment
export const deleteAssignment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/assignments/${id}`);
    dispatch({
      type: DELETE_ASSIGNMENT,
      payload: res.data,
    });

    dispatch(setAlert("Assignment  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};
