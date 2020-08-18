import React from "react";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import lms from "../../img/login4.jpg";
import {
  login,
  registerStudent,
  loadStudent,
  loadUser,
} from "../../actions/auth";
import { loginStudent } from "../../actions/auth";

const Login = ({ login, isAuthenticated, loginStudent }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    status: "",
  });
  const { email, password, status } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "Developer") {
      login(email, password, status);
    } else {
      loginStudent(email, password, status);
    }
  };

  //Redirect if logged in
  if (isAuthenticated && status === "Developer") {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && status == "Student or Learning") {
    return <Redirect to="/student/dashboard" />;
  }

  return (
    <Fragment>
      <div className="imgLogin">
        <img src={lms} alt="imgLogin" height="300"></img>
      </div>{" "}
      <h1 className=".text-secondary">
        {" "}
        <i className="fas fa-user"></i> Sign In
      </h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">Select Professional Status</option>
            <option value="Developer">Instructor</option>
            <option value="Student or Learning">Student or Learning</option>
          </select>
        </div>
        <input type="submit" className="btn btn-secondary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loginStudent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, loginStudent })(Login);
