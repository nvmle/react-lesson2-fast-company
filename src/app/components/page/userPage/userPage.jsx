import React from "react";
import PropTypes from "prop-types";
import MeetingsCard from "../../ui/meetingsCard";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

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
            <Comments />
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
