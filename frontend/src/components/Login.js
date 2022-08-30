import React, { useState } from "react";
import Form from "./Form";

function Login({ onLogin, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <main>
      <section className="login container">
        <Form
          id="login"
          onSubmit={handleFormSubmit}
          isLightTheme
          isLoading={isLoading}
          title="Вход"
          textSubmitBtn="Войти"
          formItems={
            <>
              <div className="form__item-wrapper" htmlFor="login-email">
                <input
                  value={email}
                  onChange={handleChangeEmail}
                  className="form__item form__item_color_white"
                  type="email"
                  name="email"
                  id="login-email"
                  placeholder="Email"
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="form__error-msg login-email-error"></span>
              </div>
              <div className="form__item-wrapper" htmlFor="login-password">
                <input
                  value={password}
                  onChange={handleChangePassword}
                  className="form__item form__item_color_white"
                  type="password"
                  name="password"
                  id="login-password"
                  placeholder="Пароль"
                  required
                />
                <span className="form__error-msg login-password-error"></span>
              </div>
            </>
          }
        />
      </section>
    </main>
  );
}

export default Login;
