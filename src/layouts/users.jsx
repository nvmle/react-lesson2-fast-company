import React from "react";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";
import { useParams } from "react-router";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  if (userId) {
    return <UserPage userId={userId} />;
  }
  return <UsersList />;
};

export default Users;
