class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getData);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getData);
  }

  sendUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getData);
  }

  sendNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getData);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getData);
  }

  delCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getData);
  }

  setLike(dataId) {
    return fetch(`${this._baseUrl}/cards/${dataId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getData);
  }

  removeLike(dataId) {
    return fetch(`${this._baseUrl}/cards/${dataId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getData);
  }

  changeLikeCardStatus(dataId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${dataId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getData);
  }

  _getData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "421e1d14-42de-4757-b693-b79ba1c9d363",
    "Content-Type": "application/json",
  },
});

export default api;
