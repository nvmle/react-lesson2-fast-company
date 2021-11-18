import React, { useState, useEffect } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import MeetingsCard from "../../ui/cards/meetingsCard";
import UserCard from "../../ui/cards/userCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import Comments from "../../ui/cards/comments";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  if (user && users) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <Comments userId={userId} users={users} />
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
