import React from "react";
import PropTypes from "prop-types";

const TextField = ({ type, name, value, onChange }) => {
  return (
    <div>
      <input
        type={type}
        id={name}
        className="w-100 mx-auto"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Search..."
      ></input>
    </div>
  );
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextField;
