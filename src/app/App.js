import React, { useState, useEffect } from "react";
import Users from "../components/users";
import api from "../API";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (userId) => {
    setUsers(
      users.filter((user) => {
        return user._id !== userId;
      })
    );
  };

  const handleToggleBookMark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

  return (
    <>
      <Users
        onDelete={handleDelete}
        users={users}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
};

export default App;
