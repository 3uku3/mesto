export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _cloneCard() {
    return document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true);
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', this._handleCardClick);

    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle("place__like-button_active");
    })

    this._buttonDelete.addEventListener('click', () => {
      this._card.remove();
      this._card = null;
    })
  }

  _createCard() {
    this._card = this._cloneCard();
    
    this._imageElement = this._card.querySelector(".place__image");
    this._titleElement = this._card.querySelector(".place__title");
    this._buttonDelete = this._card.querySelector(".place__delete");
    this._buttonLike = this._card.querySelector(".place__like-button");
    
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    this._setEventListeners();
  }

  getCard() {
    if (!this._card) {
      this._createCard();
    }
    return this._card;
  }
}

