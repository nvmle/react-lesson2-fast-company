import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import history from "./app/utils/history";
// import Users from "./components/users";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <Router history={history}>
        <App />
      </Router>
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
