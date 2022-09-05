export const BASE_URL = "http://localhost:3000";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(getData);
};

export const auth = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(getData);
};

export const logout = (email) => {
  return fetch(`${BASE_URL}/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    credentials: 'include',
    body: JSON.stringify({ 'email': email }),
  }).then(getData);
}

export const getToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    credentials: 'include',
  })
    .then(getData)
    .then((data) => data);
};

function getData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
