import React, { useState, useEffect } from "react";
import api from "../API";
import { useParams, useHistory } from "react-router";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
  const history = useHistory();
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
  }, []);

  const handleAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <QualitiesList qualities={user.qualities} />
        <h4>Встретился, раз: {user.completedMeetings}</h4>
        <h3>Рейтинг: {user.rate}</h3>
        <button onClick={handleAllUsers}>Все пользователи</button>
      </>
    );
  }
  return "Loading...";
};

export default UserPage;
