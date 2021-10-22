import React from "react";
import UserPage from "../components/page/userPage/";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams } from "react-router";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  if (userId) {
    return edit ? (
      <EditUserPage userId={userId} />
    ) : (
      <UserPage userId={userId} />
    );
  }
  return <UsersListPage />;
};

export default Users;
