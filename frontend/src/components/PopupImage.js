import React from "react";
import Popup from "./Popup";

const PopupImage = ({ isOpen, card, onClose }) => {
  return (
    <Popup
      id="popup-image"
      isOpen={isOpen}
      onClose={onClose}
      containerSelector="popup-card__container"
      content={
        <>
          <img src={card?.link} alt={card?.name} className="popup-card__img" />
          <span className="popup-card__place-name">{card?.name}</span>
        </>
      }
    />
  );
};

export default PopupImage;
