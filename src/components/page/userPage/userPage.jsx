import React, { useState, useEffect } from "react";
import api from "../../../API";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import MeetingsCard from "../../ui/cards/meetingsCard";
import UserCard from "../../ui/cards/userCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import Comment from "../../ui/cards/comment";
import CommentsList from "../../ui/cards/commentsList";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  const [commentsForUser, setCommentsForUser] = useState();

  const [newCommentData, setNewCommentData] = useState({
    userId: "",
    pageId: userId,
    content: ""
  });

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setCommentsForUser(data);
    });
  }, []);

  console.log("commentsForUser", commentsForUser);

  const handleEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  console.log("userPage", user);

  const removeComment = (commentId) => {
    console.log("commentId", commentId);

    api.comments.remove(commentId);

    api.comments.fetchCommentsForUser(userId).then((data) => {
      setCommentsForUser(data);
    });
  };

  const addNewComment = (data) => {
    api.comments.add(data);
    setNewCommentData({ userId: "", pageId: userId, content: "" });

    // api.comments.fetchCommentsForUser(userId).then((data) => {
    //   setCommentsForUser(data);
    // });
  };

  const handleChange = (target) => {
    if (target.target?.name === "exampleFormControlTextarea1") {
      setNewCommentData((prevState) => ({
        ...prevState,
        content: target.target.value
      }));
    } else {
      setNewCommentData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    }
  };

  if (user) {
    return (
      <>
        <div className="col-md-4 mb-3">
          <UserCard
            name={user.name}
            profession={user.profession.name}
            rate={user.rate}
            onEditUser={handleEditUser}
          />
          <QualitiesCard qualities={user.qualities} />
          <MeetingsCard completedMeetings={user.completedMeetings} />
        </div>

        <div className="col-md-8">
          {users && (
            <Comment
              data={newCommentData}
              options={users}
              userId={userId}
              addNewComment={addNewComment}
              onChange={handleChange}
            />
          )}

          {commentsForUser && users && (
            <CommentsList
              users={users}
              comments={commentsForUser}
              removeComment={removeComment}
            />
          )}
        </div>
      </>
    );
  }
  return "Loading...";
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
