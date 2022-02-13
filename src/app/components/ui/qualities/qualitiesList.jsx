import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";
import { useSelector, useDispatch } from "react-redux";
import {
  getQualitiesLoadingStatus,
  getQualitiesByIds,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (isLoading) return "Loading";

  return (
    <>
      {qualitiesList.map((qualitie) => (
        <Qualities key={qualitie._id} {...qualitie} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
