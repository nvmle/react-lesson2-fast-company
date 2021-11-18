import React from "react";
import UserPage from "../components/page/userPage/";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams } from "react-router";
import UserProvider from "../hooks/useUsers";
import { QualityProvider } from "../hooks/useQuality";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <QualityProvider>
            <UsersListPage />
          </QualityProvider>
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
