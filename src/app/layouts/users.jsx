import React from "react";
import UserPage from "../components/page/userPage/";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            currentUserId === userId ? (
              <EditUserPage userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );

  // if (userId) {
  //   return edit ? (
  //     <EditUserPage userId={userId} />
  //   ) : (
  //     <div className="container">
  //       <div className="row gutters-sm">
  //         <UserPage userId={userId} />
  //       </div>
  //     </div>
  //   );
  // }
  // return <UsersListPage />;
};

export default Users;

/* <EditUserPage userId={currentUser._id} /> */
