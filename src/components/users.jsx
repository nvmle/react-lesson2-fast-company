import React, { useState } from "react";
import api from "../API";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderQualities = (qualities) => {
    return qualities.map((qualitie) => {
      const classes = "badge m-1 bg-";
      return (
        <span key={qualitie._id} className={classes + qualitie.color}>
          {qualitie.name}
        </span>
      );
    });
  };

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => {
      return !(user._id === id);
    });
    setUsers(newUsers);
  };

  const renderPhrase = () => {
    const countOfUsers = users.length;
    let declination = "человек тусанет";
    let classes = "badge bg-";

    if (countOfUsers === 2 || countOfUsers === 3 || countOfUsers === 4) {
      declination = "человека тусанут";
    }

    const phrase =
      countOfUsers > 0
        ? `${countOfUsers} ${declination} с тобой сегодня`
        : "Никто с тобой не тусанет";
    classes = countOfUsers > 0 ? (classes += "primary") : (classes += "danger");
    return (
      <h1>
        <span className={classes}>{phrase}</span>
      </h1>
    );
  };

  const renderUsers = () => {
    return users.map((user) => {
      const qualities = renderQualities(user.qualities);
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{qualities}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button
              onClick={() => {
                handleDelete(user._id);
              }}
              className="btn btn-danger btn-sm"
            >
              delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {renderPhrase()}
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
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
