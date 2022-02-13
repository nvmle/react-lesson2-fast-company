import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../app/components/ui/navBar";
import Main from "../app/layouts/main";
import Login from "../app/layouts/login";
import Users from "../app/layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
