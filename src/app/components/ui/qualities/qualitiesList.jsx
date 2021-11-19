import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality();

  if (isLoading) return "Loading";
  return (
    <>
      {qualities.map((qualitie) => (
        <Qualities key={qualitie} id={qualitie} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
