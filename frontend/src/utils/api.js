import {BASE_URL} from './userAuth';

// class Api {
//   constructor(options) {
//     this._baseUrl = options.baseUrl;
//     this._headers = options.headers;
//   }

 export function getInitialCards() {
    return fetch(`${BASE_URL}/cards`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

 export function getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

 export function sendUserInfo(data) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(data),
    }).then(getData);
  }

 export function sendNewCard(data) {
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(getData);
  }

export function  setUserAvatar(avatar) {
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(getData);
  }

export function  delCard(data) {
    return fetch(`${BASE_URL}/cards/${data._id}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

export function  setLike(dataId) {
    return fetch(`${BASE_URL}/cards/${dataId}/likes`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

export function  removeLike(dataId) {
    return fetch(`${BASE_URL}/cards/${dataId}/likes`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

export function  changeLikeCardStatus(dataId, isLiked) {
    return fetch(`${BASE_URL}/cards/${dataId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(getData);
  }

 function getData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

// const api = new Api({
//   baseUrl: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     // Authorization: `Bearer ${ localStorage.getItem('jwt') }`,
//   },
// });
//
// export default api;
