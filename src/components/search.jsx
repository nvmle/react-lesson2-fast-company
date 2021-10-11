import React from "react";
import PropTypes from "prop-types";
import TextField from "./textField";

const Search = ({ value, onChange }) => {
  return (
    <form>
      <TextField type="text" name="search" value={value} onChange={onChange} />
    </form>
  );
};
Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
