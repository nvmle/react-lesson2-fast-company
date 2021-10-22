import React, { useState, useEffect } from "react";
import api from "../../../API";
import { useHistory } from "react-router";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
  }, []);

  const handleEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  console.log("userPage", user);

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <Qualities qualities={user.qualities} />
        <h4>Встретился, раз: {user.completedMeetings}</h4>
        <h3>Рейтинг: {user.rate}</h3>
        <button onClick={handleEditUser}>Изменить</button>
      </>
    );
  }
  return "Loading...";
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
