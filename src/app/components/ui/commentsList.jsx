import React from "react";
import PropTypes from "prop-types";
import { takeDate } from "../../utils/displayDate";
import _ from "lodash";

const CommentsList = ({ users, comments, removeComment }) => {
  const takeNameByUserId = (userId) => {
    return users.filter((user) => user._id === userId)[0].name;
  };

  const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {sortedComments.map((comment) => (
          <div className="bg-light card-body mb-3" key={comment._id}>
            <div className="row">
              <div className="col">
                <div className="d-flex flex-start">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                          {takeNameByUserId(comment.userId)}
                          <span className="small">
                            {" - "}
                            {takeDate(comment.created_at)}
                          </span>
                        </p>
                        <button
                          className="btn btn-sm text-primary d-flex align-items-center"
                          onClick={() => removeComment(comment._id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <p className="small mb-0">{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
CommentsList.propTypes = {
  userId: PropTypes.string,
  comments: PropTypes.array,
  users: PropTypes.array,
  removeComment: PropTypes.func
};

export default CommentsList;
