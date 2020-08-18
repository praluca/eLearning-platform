import React from "react";
import { Link } from "react-router-dom";
export const DashboardActions = () => {
  return (
    <div class="sidenav">
      <Link to="/edit-profile">
        <i class="fas fa-user-circle .text-success"></i> Edit Profile
      </Link>
      <Link to="/add-experience">
        <i class="fab fa-black-tie .text-success"></i> Add Experience
      </Link>
      <Link to="/add-education">
        <i class="fas fa-graduation-cap .text-success"></i> Add Education
      </Link>
      <Link to="/add-courses">
        <i class="fas fa-book .text-success"></i> Add Courses
      </Link>
      <Link to="/add-quizz">
        <i class="fas fa-question .text-success"></i> Add Quizzes
      </Link>
      <Link to="/add-assignment">
        <i class="fas fa-keyboard"></i> Add Assignments
      </Link>
      <Link to="/added-courses">
        <i class="fas fa-book-open"></i> Added Courses
      </Link>
      <Link to="/join">
        <i class="fas fa-comment-dots .text-success"></i> Chat
      </Link>
      <Link to="/get-statistics">
        <i class="far fa-chart-bar .text-success"></i> Statistics
      </Link>
    </div>
  );
};
export default DashboardActions;
