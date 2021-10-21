import React from "react";
import UserPage from "../components/page/userPage/";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  if (userId) {
    return <UserPage userId={userId} />;
  }
  return <UsersListPage />;
};

export default Users;
