import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
    </button>
  );
};

BookMark.propTypes = {
  rest: PropTypes.array,
  status: PropTypes.bool
};

export default BookMark;
