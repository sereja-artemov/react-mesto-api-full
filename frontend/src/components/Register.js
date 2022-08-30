import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import * as userAuth from "../utils/userAuth";

const Register = ({ onRegister, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }

  return (
    <main>
      <section className="register container">
        <Form
          id="register"
          key="register-form"
          onSubmit={handleFormSubmit}
          isLightTheme
          title="Регистрация"
          textSubmitBtn="Зарегистрироваться"
          isLoading={isLoading}
          bottomText={[
            "Уже зарегистрированы? ",
            <a className="form__link" href="/sign-in">
              Войти
            </a>,
          ]}
          formItems={
            <>
              <div className="form__item-wrapper" htmlFor="register-email">
                <input
                  value={email}
                  onChange={handleChangeEmail}
                  className="form__item form__item_color_white"
                  type="email"
                  name="email"
                  id="register-email"
                  placeholder="Email"
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="form__error-msg register-email-error"></span>
              </div>
              <div className="form__item-wrapper" htmlFor="register-password">
                <input
                  value={password}
                  onChange={handleChangePassword}
                  className="form__item form__item_color_white"
                  type="password"
                  name="password"
                  id="register-password"
                  placeholder="Пароль"
                  required
                />
                <span className="form__error-msg register-password-error"></span>
              </div>
            </>
          }
        />
      </section>
    </main>
  );
};

export default Register;
