import React from "react";
import UserPage from "../components/page/userPage/";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams } from "react-router";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            currentUser._id === userId ? (
              <EditUserPage userId={userId} />
            ) : (
              <EditUserPage userId={currentUser._id} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
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
