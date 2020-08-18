import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  COMMENT_ERROR,
  ADD_MY_FEEDBACK,
} from "./types";

//Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add a comment to course
export const addComment = (courseId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comm/course/${courseId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//add a feedback to course
export const addFeedback = (courseId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/courses/course/${courseId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_MY_FEEDBACK,
      payload: res.data,
    });
    dispatch(setAlert("Feedback added", "success"));
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { status: err.response.status },
    });
  }
};
