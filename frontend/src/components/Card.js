import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `cards__trash-btn ${
    isOwn ? "cards__trash-btn_visible" : "cards__trash-btn_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="cards__item">
      <img
        onClick={handleClick}
        className="cards__image"
        src={card.link}
        alt={card.name}
      />
      <div className="cards__content">
        <h3 className="cards__title">{card.name}</h3>
        <div className="cards__like-wrapper">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <span className="cards__like-counter">{card.likes.length}</span>
        </div>
        <button
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
        ></button>
      </div>
    </li>
  );
}

export default Card;
