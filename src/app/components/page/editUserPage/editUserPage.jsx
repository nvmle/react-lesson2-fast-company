import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../API";
import { validator } from "../../../utils/validator";

import TextField from "../../common/form/textField";
import SelectForm from "../../common/form/selectForm";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [data, setData] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });

    api.users.getById(userId).then((data) => {
      setData({
        ...data,
        sex: data.sex ? data.sex : "male",
        email: data.email ? data.email : ""
      });
    });
  }, []);

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validateConfig = {
    name: { isRequired: { message: "Имя обязательнао для заполнения" } },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена не корректно" }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const editUserData = () => {
    const professionsArray =
      !Array.isArray(professions) && typeof professions === "object"
        ? Object.keys(professions).map((profession) => ({
            name: professions[profession].name,
            _id: professions[profession]._id
          }))
        : professions;

    const qualitiesArray =
      !Array.isArray(qualities) && typeof qualities === "object"
        ? Object.keys(qualities).map((qualitie) => ({
            name: qualities[qualitie].name,
            _id: qualities[qualitie]._id,
            color: qualities[qualitie].color
          }))
        : qualities;

    let userData = {};

    const userQualities =
      Object.keys(data.qualities[0]).length > 2
        ? data.qualities
        : data.qualities.map((userQualitie) => {
            return qualitiesArray.filter(
              (qualitie) => qualitie._id === userQualitie.value
            )[0];
          });

    userData = {
      ...data,
      profession:
        typeof data.profession === "object"
          ? data.profession
          : professionsArray.filter((prof) => prof._id === data.profession)[0],
      qualities: userQualities
    };

    return userData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const edituserdata = editUserData();

    api.users.update(userId, edituserdata);

    history.replace(`/users/${userId}`);
  };

  const handleGoBack = () => {
    history.push(`/users/${userId}`);
  };

  if (data) {
    return (
      <div className="constainer mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <button
              type="button"
              className="btn btn-primary mb-4"
              onClick={handleGoBack}
            >
              <i className="bi bi-arrow-left m-1" />
              Назад
            </button>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectForm
                label="Выберите вашу профессию: "
                name="profession"
                onChange={handleChange}
                defaultOption="Chose..."
                options={professions}
                value={data.profession._id}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол: "
                name="sex"
                value={data.sex}
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" }
                ]}
                onChange={handleChange}
              />
              <MultiSelectField
                options={qualities}
                defaultValue={data.qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества:"
              />
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return "Loading...";
};
EditUserPage.propTypes = {
  userId: PropTypes.string
};
export default EditUserPage;
