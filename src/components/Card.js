export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick, myId },
    templateSelector
  ) {
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._data = data;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }

  _cloneCard() {
    return document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);
  }

  updateLikeCounter(likes) {
    this._likes = likes;
    this._likesCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", this._handleCardClick);

    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this.getId(), this._isLiked(), this);
      this._buttonLike.classList.toggle("place__like-button_active");
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  _isLiked() {
    return this._likes.find((elem) => {
      return elem._id === this._myId;
    });
  }

  _createCard() {
    this._card = this._cloneCard();

    this._imageElement = this._card.querySelector(".place__image");
    this._titleElement = this._card.querySelector(".place__title");
    this._buttonLike = this._card.querySelector(".place__like-button");
    this._likesCounter = this._card.querySelector(".place__like-count");
    this._buttonDelete = this._card.querySelector(".place__delete");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    if (this._isLiked()) {
      this._buttonLike.classList.add("place__like-button_active");
    }
    this._titleElement.textContent = this._title;
    this._likesCounter.textContent = this._likes.length;
    this._setEventListeners();
    if (this._data.owner._id !== this._myId) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
  }

  getId() {
    return this._data._id;
  }

  delete() {
    this._card.remove();
    this._card = null;
  }

  getCard() {
    if (!this._card) {
      this._createCard();
    }
    return this._card;
  }
}
