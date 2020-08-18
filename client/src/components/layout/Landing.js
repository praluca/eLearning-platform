import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Landing = ({ auth: { user, isAuthenticated } }) => {
  if (isAuthenticated && user.status === "Developer") {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && user.status === "Student or Learning") {
    return <Redirect to="/student/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Learn programming faster</h1>
          <p className="lead">
            “Code is like humor. When you have to explain it, it’s bad.”
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Landing);
