import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, getAuthErrors } from "../../store/users";

const LoginForm = () => {
  const history = useHistory();
  const loginError = useSelector(getAuthErrors());
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const redirect = history.location.state?.from?.pathname
    ? history.location.state.from.pathname
    : "/";

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
      isRequired: { message: "Электронная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(logIn({ payload: data, redirect }));
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
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
