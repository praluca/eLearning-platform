import React, { Fragment } from "react";
import { Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import NotificationSystem from "react-notification-system";
export const Navbar = ({
  auth: { user, isAuthenticated, loading },
  logout,
}) => {
  const notificationSystem = React.createRef();
  const addNotification = (event) => {
    event.preventDefault();
    const notification = notificationSystem.current;
    notification.addNotification({
      message: "Notification message",
      level: "success",
      children: (
        <div>
          <h5>Hello, {user && user.name}</h5>
          <a>Check out new courses on this platform!</a>
        </div>
      ),
    });

    notification.addNotification({
      message: "Notification message",
      level: "warning",
      children: (
        <div>
          <h5>Hello, {user && user.name}</h5>
          <a>
            Don't forget! Soon we will introduce a new function on platform.
            More details in a few days!
          </a>
        </div>
      ),
    });
    notification.addNotification({
      message: "Notification message",
      level: "info",
      children: (
        <div>
          <h5>Quote of day</h5>
          <a>
            “The best thing about a boolean is even if you are wrong, you are
            only off by a bit.”
          </a>
        </div>
      ),
    });
  };

  const authLinks = (
    <ul>
      {user && user.status === "Developer" ? (
        <Fragment>
          <li>
            <Link to="/profiles">Instructors</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user"></i>
              <span className=".text-light"> Dashboard</span>
            </Link>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li>
            <div
              id="divid"
              onClick={(e) => {
                addNotification(e);
                document.getElementById(
                  "divid"
                ).innerHTML = `<i class="fas fa-bell badge">  </i>`;
              }}
            >
              {" "}
              <i class="fas fa-bell badge"> 3 </i>
            </div>
            <NotificationSystem ref={notificationSystem} />
          </li>
          <li>
            <Link to="/profiles">Instructors</Link>
          </li>
          <li>
            <Link to="/student/dashboard">
              <i className="fas fa-user"></i>
              <span className=".text-light"> Dashboard</span>
            </Link>
          </li>
        </Fragment>
      )}

      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className=".text-light"> Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Instructors</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-dark bg-dark">
      <h4>
        <Link to="/">
          <i className="fas fa-code"></i> Nostradamus
        </Link>
      </h4>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
