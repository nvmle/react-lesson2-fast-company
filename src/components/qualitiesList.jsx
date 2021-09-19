import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qualitie) => (
        <Qualities key={qualitie._id} {...qualitie} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
