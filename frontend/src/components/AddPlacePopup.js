import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleChangeName(event) {
    setPlaceName(event.target.value);
  }

  function handleChangeLink(event) {
    setPlaceLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      id="place"
      title="Новое место"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      formItems={
        <>
          <div className="form__item-wrapper" htmlFor="place-name">
            <input
              value={placeName}
              onChange={handleChangeName}
              className="form__item"
              type="text"
              name="name"
              id="place-name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__error-msg place-name-error"></span>
          </div>
          <div className="form__item-wrapper" htmlFor="place-link">
            <input
              value={placeLink}
              onChange={handleChangeLink}
              className="form__item"
              type="url"
              name="link"
              id="place-link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__error-msg place-link-error"></span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
