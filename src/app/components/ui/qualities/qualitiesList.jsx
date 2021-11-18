import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQuality();

  const userQualities = qualities.map((quality) => getQuality(quality));

  return (
    <>
      {!isLoading
        ? userQualities.map((qualitie) => (
            <Qualities key={qualitie._id} {...qualitie} />
          ))
        : "Loading.."}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
