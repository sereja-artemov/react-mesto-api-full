import React from "react";
import Form from "./Form";

function PopupWithForm({
  id,
  title,
  isOpen,
  onClose,
  onSubmit,
  formItems,
  textSubmitBtn,
  isLoading,
}) {
  return (
    <div id={`popup-${id}`} className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <Form
          onSubmit={onSubmit}
          id={id}
          isLoading={isLoading}
          title={title}
          textSubmitBtn={textSubmitBtn}
          formItems={formItems}
        />
        <button
          onClick={onClose}
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
