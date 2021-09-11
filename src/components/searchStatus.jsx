import React from "react";

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

export default SearchStatus;
