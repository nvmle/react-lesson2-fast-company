import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectForm from "../../common/form/selectForm";
import TextAreaField from "../../common/form/textAreaField";
import api from "../../../API";

const Comment = ({ options, addNewComment, userId }) => {
  const [newCommentData, setNewCommentData] = useState({
    userId: "",
    pageId: userId,
    content: ""
  });

  options = options.map((option) => ({ name: option.name, value: option._id }));

  const handleChange = (target) => {
    setNewCommentData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handlePublish = () => {
    if (newCommentData.userId && newCommentData.content) {
      api.comments.add(newCommentData);

      addNewComment();
      setNewCommentData({ userId: "", pageId: userId, content: "" });
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <SelectForm
              name="userId"
              value={newCommentData.userId}
              onChange={handleChange}
              defaultOption="Выберите пользователя"
              options={options}
            />
          </div>
          <div className="mb-4">
            <TextAreaField
              label="Сообщение"
              name="exampleFormControlTextarea1"
              onChange={handleChange}
              value={newCommentData.content}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handlePublish}
          >
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  options: PropTypes.array,
  addNewComment: PropTypes.func,
  userId: PropTypes.string
};

export default Comment;
