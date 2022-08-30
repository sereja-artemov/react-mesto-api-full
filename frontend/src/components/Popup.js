import React from "react";

function Popup({ id, isOpen, onClose, content, containerSelector }) {
  return (
    <div id={id} className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container ${containerSelector}`}>
        {content}

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

export default Popup;
