import React, { useState } from "react";
import Users from "../components/users";
import SearchStatus from "../components/searchStatus";
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

  const handleToggleBookMark = (userId, status) => {
    // const newUsers = users.map((user) => {
    //   if (user._id === userId) {
    //     user.status = !user.status;
    //   }
    //   return user;
    // });

    // // setUsers(
    // //   users.map((user) => {
    // //     console.log(user.status);
    // //     return user._id === userId ? (user.status = user.status) : user;
    // //   })
    // // );
    // setUsers(newUsers);

    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          user.status = !user.status;
        }
        return user;
      })
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        users={users}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
};

export default App;
