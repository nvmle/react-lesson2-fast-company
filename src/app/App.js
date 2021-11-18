import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../app/components/ui/navBar";
import Main from "../app/layouts/main";
import Login from "../app/layouts/login";
import Users from "../app/layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
  return (
    <>
      <NavBar />
      <QualityProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualityProvider>
      <ToastContainer />
    </>
  );
};

export default App;
