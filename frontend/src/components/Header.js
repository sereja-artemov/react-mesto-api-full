import React, { useState } from "react";
import logoImage from "../images/mesto-logo.svg";
import {Link, Route, Switch} from "react-router-dom";

function Header({ userData, loggedIn, onClickExit }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  function handleMenuBtnClick() {
    !isMenuActive ? setIsMenuActive(true) : setIsMenuActive(false);
  }

  return (
    <header className="header container-fluid">
      <div className="header__logo-wrapper">
        <Link to="/" className="header__logo">
          <img
            src={logoImage}
            alt="логотип mesto russia"
            className="header__logo-img"
          />
        </Link>
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__auth">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__auth">
              Войти
            </Link>
          </Route>
        </Switch>
        {loggedIn && (
          <button
            onClick={handleMenuBtnClick}
            className={`header__menu-btn ${
              isMenuActive && "header__menu-btn_status_opened"
            }`}
          ></button>
        )}
      </div>

      {loggedIn && (
        <div
          className={`header__nav ${
            isMenuActive && "header__nav_status_opened"
          }`}
        >
          <Link to={`mailto:${userData.email}`} className="header__email">
            {userData.email}
          </Link>
          <button onClick={onClickExit} className="header__logout">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
