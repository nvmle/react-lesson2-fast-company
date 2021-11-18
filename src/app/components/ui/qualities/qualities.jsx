import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Qualities = ({ id }) => {
  const { getQuality } = useQuality();

  const { _id, color, name } = getQuality(id);

  return (
    <span key={_id} className={"badge m-1 bg-" + color}>
      {name}
    </span>
  );
};
Qualities.propTypes = {
  id: PropTypes.string.isRequired
};

export default Qualities;
