export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  } 
  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  getUser() {
    return fetch(this._options.baseUrl + "/users/me", {
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }
  getAllInitData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }

  setUserInfo({ name, about }) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._getResponseData);
  }
  setUserAvatar({ avatar }) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._getResponseData);
  }
  addCard({ name, link }) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._getResponseData);
  }
  deleteCard(id) {
    return fetch(this._options.baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then(this._getResponseData);
  }
  like(id) {
    return fetch(this._options.baseUrl + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then(this._getResponseData);
  }
  deleteLike(id) {
    return fetch(this._options.baseUrl + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then(this._getResponseData);
  }
}
