import React from "react";
import PropTypes from "prop-types";
import SelectForm from "../../common/form/selectForm";

const Comment = ({ options, userId, addNewComment, onChange, data }) => {
  options = options.map((option) => ({ name: option.name, value: option._id }));

  const handleChange = (target) => {
    console.log("target handlechange", target);

    onChange(target);

    // if (target.target?.name === "exampleFormControlTextarea1") {
    //   setData((prevState) => ({ ...prevState, content: target.target.value }));
    // } else {
    //   setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // }
  };

  const handlePublish = () => {
    addNewComment(data);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <SelectForm
              name="userId"
              value={data.userId}
              onChange={handleChange}
              defaultOption="Выберите пользователя"
              options={options}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="exampleFormControlTextarea1"
              rows="3"
              value={data.content}
              onChange={handleChange}
            ></textarea>
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
  userId: PropTypes.string,
  addNewComment: PropTypes.func,
  onChange: PropTypes.func,
  data: PropTypes.obj
};

export default Comment;
