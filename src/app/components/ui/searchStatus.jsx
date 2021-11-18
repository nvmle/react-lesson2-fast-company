import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = () => {
    if (length > 1 && length < 5) return "человека тусанут";
    return "человек тусанет";
  };

  return (
    <h1>
      <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
        {length > 0
          ? `${length} ${renderPhrase()} с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>
    </h1>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
