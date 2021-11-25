import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { setTokens } from "../services/localStorage.service";

const httpLogIn = axios.create();

const LogInContext = React.createContext();

export const useLogIn = () => {
  return useContext(LogInContext);
};

const LogInProvider = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpLogIn.post(url, {
        email,
        password,
        returnSecureToken: true
      });

      setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        let errorObject;
        if (message === "EMAIL_NOT_FOUND") {
          errorObject = {
            email: "Пользователя с таким Email не существует"
          };
        }
        if (message === "INVALID_PASSWORD") {
          errorObject = { password: "Не правильно введён пароль" };
        }
        throw errorObject;
      }
    }
  }

  function errorCatcher(error) {
    setError(error);
  }
  return (
    <LogInContext.Provider value={{ signIn }}>{children}</LogInContext.Provider>
  );
};
LogInProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default LogInProvider;
