/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import history from './history'
import "./index.css"
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux"
import rootReducer from "./redux/reducers/rootReducer"
import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
// require("history").createBrowserHistory

import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

// my notes: I have added these lines from dashboard index.js file
// import "dashboard_app/assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "dashboard_app/assets/scss/argon-dashboard-react.scss";

import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import UserProfile from "views/examples/UserProfile";
import BoardPage from "views/examples/BoardPage"
// import AdminLayout from "dashboard_app/layouts/Admin.js"
// import AuthLayout from "dashboard_app/layouts/Auth.js";
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk,logger));

ReactDOM.render(
  <Provider store = {store}>
    <Router history = {history}>
    <Switch>
      {/* <Route path="/dashboard" exact render={props => <Index {...props} />} /> */}
      <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      {/* <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      /> */}
      <Route path="/user-profile" exact render={props => <UserProfile {...props} />} />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      <Route
        // path="/board-page/:userName/:userId/:boardName"
        path="/board-page/:boardId"
        exact
        render={props => <BoardPage {...props} />}
      />

    
      {/* <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" /> */}
      <Redirect to="/landing-page"/>
    </Switch>
  </Router>
  </Provider>
  ,
  document.getElementById("root")
);
