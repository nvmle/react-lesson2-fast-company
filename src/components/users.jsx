import React from "react";
import User from "./user";

const Users = ({ onDelete, users, onToggleBookMark }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <User
              key={user._id}
              onDelete={onDelete}
              {...user}
              onToggleBookMark={onToggleBookMark}
              status={user.status}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
