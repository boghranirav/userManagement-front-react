import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { UserNavigationLink } from "./routes";
// import withTracker from "./withTracker";
import Login from "./user/pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { useAuth } from "./shared/auth-hook";
import { AuthContext } from "./shared/auth-context";

export default () => {
  const { token, login, logout } = useAuth();
  const { routes } = UserNavigationLink();

  let routeNav;
  if (token) {
    routeNav = (
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
        <Route
          path="/logout"
          component={() => {
            logout();
            window.location.href = "/";
          }}
        ></Route>
        <Redirect to="/dashboard"></Redirect>
      </div>
    );
  } else {
    routeNav = (
      <div>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login"></Redirect>
      </div>
    );
  }

  window.onclick = e => {
    window.globalVar =
      e.target &&
      e.target.closest(".nav-link") &&
      e.target.closest(".nav-link").id
        ? e.target.closest(".nav-link").id
        : 0;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout
      }}
    >
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        {routeNav}
      </Router>
    </AuthContext.Provider>
  );
};
