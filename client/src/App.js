import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import AddQuizz from "./components/profile-forms/AddQuizz";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import AddCourse from "./components/profile-forms/AddCourse";
import Profile from "./components/profile/Profile";
import Quizzes from "./components/dashboard/Quizzes";
import StartQuiz from "./components/dashboard/StartQuiz";
import StartCourse from "./components/dashboard/StartCourse";
import Statistics from "./components/dashboard/Statistics";
import Chat from "./components/dashboard/Chat";
//Redux

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { loadStudent } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import AddedCourses from "./components/dashboard/AddedCourses";
import EditedCourses from "./components/dashboard/EditedCourses";
import DescriptionOfCourse from "./components/dashboard/DescriptionOfCourse";
import AddAssignment from "./components/profile-forms/AddAssignment";
import Assignments from "./components/dashboard/Assignments";
import StartAssignment from "./components/dashboard/StartAssignment";
import ChatItem from "./components/dashboard/ChatItem";
import MyCourses from "./components/dashboard/MyCourses";
import QuizResults from "./components/dashboard/QuizResults";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    store.dispatch(loadStudent());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/student/dashboard"
                component={StudentDashboard}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/add-courses" component={AddCourse} />
              <PrivateRoute exact path="/add-quizz" component={AddQuizz} />
              <PrivateRoute
                exact
                path="/add-assignment"
                component={AddAssignment}
              />
              <PrivateRoute
                exact
                path="/student/assignments-list"
                component={Assignments}
              />
              <PrivateRoute
                exact
                path="/get-statistics"
                component={Statistics}
              />
              <PrivateRoute
                exact
                path="/added-courses"
                component={AddedCourses}
              />
              <PrivateRoute exact path="/student/quizzes" component={Quizzes} />
              <PrivateRoute
                exact
                path="/student/start-quiz/:id"
                component={StartQuiz}
              />
              <PrivateRoute
                exact
                path="/student/describe-course/:id"
                component={DescriptionOfCourse}
              />
              <PrivateRoute
                exact
                path="/student/start-course/:id"
                component={StartCourse}
              />
              <PrivateRoute
                exact
                path="/student/start-assignment/:id"
                component={StartAssignment}
              />
              <PrivateRoute
                exact
                path="/add-courses/:id"
                component={EditedCourses}
              />
              <PrivateRoute exact path="/join" component={Chat} />
              <PrivateRoute exact path="/chat" component={ChatItem} />
              <PrivateRoute
                exact
                path="/student/my-courses"
                component={MyCourses}
              />
              <PrivateRoute
                exact
                path="/student/quiz-result"
                component={QuizResults}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
