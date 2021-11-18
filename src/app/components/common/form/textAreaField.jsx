import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: "content", value: target.value });

    // console.log(target.value);
  };
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={name}
        name={name}
        rows="3"
        value={value}
        onChange={handleChange}
      ></textarea>
    </>
  );
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextAreaField;
