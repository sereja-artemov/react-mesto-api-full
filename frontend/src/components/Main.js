import React, { useContext } from "react";
import Card from "./Card";
import editPenImage from "../images/edit-pen.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile container">
        <div className="profile__user">
          <div className="profile__avatar-wrapper">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__img"
            />
            <div onClick={onEditAvatar} className="profile__avatar-overlay">
              <img
                src={editPenImage}
                alt="Редактировать"
                className="profile__avatar-edit-img"
              />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-btn"
                aria-label="Редактировать"
                data-modal=""
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-btn"
          aria-label="Добавить"
          data-modal=""
        ></button>
      </section>
      <section className="cards container">
        <ul className="cards__wrapper">
          {cards.map((cardItem) => (
            <Card
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              key={cardItem._id}
              card={cardItem}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
