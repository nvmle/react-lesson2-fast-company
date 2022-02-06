import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useHistory, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectForm from "../../common/form/selectForm";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useQuality } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProfession";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = ({ userId }) => {
  // const { userId } = useParams();
  const history = useHistory();

  const { qualities: allQualities } = useQuality();
  const { professions } = useProfession();

  const { getUserById } = useUsers();
  const user = getUserById(userId);
  const { editUser } = useAuth();

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const qualitiesList = allQualities.map((q) => ({
    label: q.name,
    value: q._id
  }));

  // const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { qualities } = data;

    editUser({
      ...data,
      qualities: qualities.map((q) => (q.value ? q.value : q._id))
    });

    history.push(`/users/${data._id}`);
  };

  useEffect(() => {
    setIsLoading(true);

    setData({
      ...user,
      qualities: user.qualities.map((q) =>
        allQualities.find((qual) => qual._id === q)
      )
    });
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Введите ваше имя"
      }
    }
  };
  useEffect(() => validate(), [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading ? (
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
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectForm
                label="Выбери свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professionsList}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={qualitiesList}
                onChange={handleChange}
                values
                name="qualities"
                label="Выберите ваши качесвта"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
EditUserPage.propTypes = {
  userId: PropTypes.string
};

export default EditUserPage;
