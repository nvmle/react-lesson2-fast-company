import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectForm from "../common/form/selectForm";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useSelector, useDispatch } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });

  const qualities = useSelector(getQualities());

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  const professions = useSelector(getProfessions());

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validateConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена не корректно" }
    },
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      min: { message: "Имя должно содержать минимум 3 символа", value: 3 }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      min: { message: "Пароль должен содержать минимум 8 символов", value: 8 }
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" }
    },
    license: { isRequired: { message: "Обязательно нужно приять соглашение" } }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    dispatch(signUp(newData));
    // await signUp(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectForm
        label="Выберите вашу профессию: "
        name="profession"
        onChange={handleChange}
        defaultOption="Chose..."
        options={professionsList}
        value={data.profession}
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
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества:"
      />
      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
