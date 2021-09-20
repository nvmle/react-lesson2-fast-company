import React from "react";
import NavBar from "../components/navBar";
import Users from "../components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../components/main";
import Login from "../components/login";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Redirect from="/" to="/main" />
      </Switch>
      {/* <Users /> */}
    </>
  );
};

export default App;
