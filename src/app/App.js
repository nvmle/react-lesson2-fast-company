import React, { useState } from "react";
import Users from "../components/users";
import api from "../API";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

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
