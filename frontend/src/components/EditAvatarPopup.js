import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarLinkRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      id="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textSubmitBtn="Сохранить"
      isLoading={isLoading}
      formItems={
        <>
          <div className="form__item-wrapper" htmlFor="form_type_avatar">
            <input
              ref={avatarLinkRef}
              className="form__item"
              type="url"
              name="avatar"
              id="avatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__error-msg avatar-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
