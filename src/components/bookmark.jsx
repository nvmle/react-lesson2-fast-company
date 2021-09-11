import React from "react";

const BookMark = ({ onToggleBookMark, id, status }) => {
  console.log(status);
  return (
    <button onClick={() => onToggleBookMark(id)}>
      {status === true ? (
        <i className="bi bi-bookmark-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  );
};

export default BookMark;
