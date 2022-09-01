import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWidthForm from "./PopupWithForm";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupImage from "./PopupImage";
import InfoTooltip from "./InfoTooltip";
import * as userAuth from "../utils/userAuth";
import ProtectedRoute from "./ProtectedRoute";

import successImage from "../images/tooltip/success.svg";
import crossImage from "../images/tooltip/cross.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [userData, setUserData] = useState({});
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImage, setTooltipImage] = useState(undefined);


  const history = useHistory();

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => setCurrentUser(data))
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((data) => setCards(data))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsTooltipActive(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isSubmitPopupOpen || isTooltipActive;

  useEffect(() => {

    const closeByEscape = (evt) => {
        (evt.key === 'Escape') && closeAllPopups();
    };

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .sendUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar: avatarLink }) {
    api
      .setUserAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .delCard(card)
      .then(() => {
        setCards(cards.filter((cardEl) => cardEl._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .sendNewCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onRegister = ({ email, password }) => {
    setIsLoading(true);
    return userAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          openTooltip(successImage, 'Вы успешно зарегистрировались!');
          history.push("/sign-in");
        }
      })
      .catch(() => {
        setIsRegistered(false);
        openTooltip(crossImage, 'Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => setIsLoading(false));
  };

  const onLogin = ({ email, password }) => {
    setIsLoading(true);
    return userAuth
      .auth(email, password)
      .then(() => {
        checkToken();
      })
      .catch((err) => {
        openTooltip(crossImage, 'Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => setIsLoading(false));
  };

  const checkToken = () => {
      userAuth
        .getToken()
        .then((res) => {
          if (res) {
            setUserData(res);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => err);

  };

  function onClickExit() {
    userAuth.logout()
        .then((res) => {
          setLoggedIn(false);
          history.push("/sign-in");
        })
        .catch((err) => err);
  }

  function openTooltip(image, text) {
    setTooltipText(text);
    setTooltipImage(image);
    setIsTooltipActive(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          loggedIn={loggedIn}
          userData={userData}
          onClickExit={onClickExit}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={onRegister} isLoading={isLoading} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} isLoading={isLoading} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWidthForm
          id="confirm"
          title="Вы уверены?"
          textSubmitBtn="Да"
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipActive}
          onClose={closeAllPopups}
          isLoading={isLoading}
          text={tooltipText}
          image={tooltipImage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
