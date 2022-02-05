import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setIsLoading(false);
  }
  function getUserById(userId) {
    return users.find((u) => u._id === userId);
  }

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "loading..."}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;
