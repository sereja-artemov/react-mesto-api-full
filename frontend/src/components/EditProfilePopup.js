import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.about, currentUser.name, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      id="edit"
      title="Редактировать профиль"
      textSubmitBtn="Сохранить"
      isLoading={isLoading}
      formItems={
        <>
          <div className="form__item-wrapper" htmlFor="name">
            <input
              value={name || ""}
              onChange={handleChangeName}
              className="form__item"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__error-msg name-error"></span>
          </div>
          <div className="form__item-wrapper" htmlFor="about">
            <input
              value={description || ""}
              onChange={handleChangeDescription}
              className="form__item"
              type="text"
              name="about"
              id="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__error-msg about-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditProfilePopup;
