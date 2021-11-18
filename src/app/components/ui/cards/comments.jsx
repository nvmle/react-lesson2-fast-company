import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentsList from "./commentsList";
import api from "../../../API";

const Comments = ({ userId, users }) => {
  const [commentsForUser, setCommentsForUser] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setCommentsForUser(data);
    });
  }, []);

  const removeComment = (commentId) => {
    api.comments.remove(commentId);

    api.comments.fetchCommentsForUser(userId).then((data) => {
      setCommentsForUser(data);
    });
  };

  const addNewComment = () => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setCommentsForUser(data);
    });
  };

  return (
    <>
      <Comment options={users} userId={userId} addNewComment={addNewComment} />

      {commentsForUser ? (
        <CommentsList
          users={users}
          comments={commentsForUser}
          removeComment={removeComment}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};
Comments.propTypes = {
  userId: PropTypes.string,
  users: PropTypes.array
};

export default Comments;
