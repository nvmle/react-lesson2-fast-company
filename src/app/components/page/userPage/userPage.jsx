import React from "react";
// import React, { useState, useEffect } from "react";
// import api from "../../../API";
import PropTypes from "prop-types";
import MeetingsCard from "../../ui/meetingsCard";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  // const [user, setUser] = useState();
  // const [users, setUsers] = useState();

  const { getUserById } = useUsers();
  const user = getUserById(userId);

  // useEffect(() => {
  //   api.users.getById(userId).then((data) => {
  //     setUser(data);
  //   });
  //   api.users.fetchAll().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);

  // if (user && users) {
  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            {/* <Comments userId={userId} users={users} /> */}
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      </div>
    );
  }
  return "Loading...";
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
