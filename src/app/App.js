import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../app/components/ui/navBar";
import Main from "../app/layouts/main";
import Login from "../app/layouts/login";
import Users from "../app/layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
          <Redirect to="/" />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};

export default App;
