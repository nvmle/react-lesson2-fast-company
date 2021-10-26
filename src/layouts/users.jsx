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
      <div className="container">
        <div className="row gutters-sm">
          <UserPage userId={userId} />
        </div>
      </div>
    );
  }
  return <UsersListPage />;
};

export default Users;
