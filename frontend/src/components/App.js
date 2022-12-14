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
// import api from "../utils/api";
import {
  changeLikeCardStatus,
  delCard,
  getInitialCards,
  getUserInfo,
  sendNewCard,
  sendUserInfo,
  setUserAvatar
} from "../utils/api";
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
  // const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);

  const [userData, setUserData] = useState({});
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImage, setTooltipImage] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      history.push('/');
      Promise.all([getUserInfo(), getInitialCards()])
          .then(([user, data]) => {
            setUserData(user);
            setCards(data.reverse());
          })
          .catch((error) => {
            console.log(error);
          });
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
    sendUserInfo(userInfo)
      .then((res) => {
        setUserData(res);
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
    setUserAvatar(avatarLink)
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((like) => like._id === userData._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    delCard(card)
      .then(() => {
        setCards(cards.filter((cardEl) => cardEl._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    sendNewCard(cardData)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister({ email, password }) {
    setIsLoading(true);
    userAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          openTooltip(successImage, '???? ?????????????? ????????????????????????????????????!');
          history.push("/sign-in");
        }
      })
      .catch(() => {
        setIsRegistered(false);
        openTooltip(crossImage, '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.');
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin({ email, password }) {
    userAuth
      .auth(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        checkToken();
      })
      .catch((err) => {
        openTooltip(crossImage, '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.');
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  }

  function onClickExit() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserData({});
    // history.push("/sign-in");
  }

  function openTooltip(image, text) {
    setTooltipText(text);
    setTooltipImage(image);
    setIsTooltipActive(true);
  }

  return (
    <CurrentUserContext.Provider value={userData}>
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
          title="???? ???????????????"
          textSubmitBtn="????"
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
