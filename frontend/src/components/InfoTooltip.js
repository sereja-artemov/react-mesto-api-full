import React, { useState } from "react";
import Popup from "./Popup";


const InfoTooltip = ({ isOpen, onClose, text, image }) => {
  return (
    <Popup
      id="info-tooltip"
      containerSelector="info-tooltip__container"
      isOpen={isOpen}
      onClose={onClose}
      content={
        <>
          <img
            src={image}
            alt="Изображение статуса события"
            className="info-tooltip__img"
          />
          <p className="info-tooltip__text">{text}</p>
        </>
      }
    />
  );
};

export default InfoTooltip;
