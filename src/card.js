export class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
  }

  _cloneCard() {
    return document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true);
  }
  
  _setData(cardFields) {
    cardFields.image.src = this._image;
    cardFields.image.alt = this._title;
    cardFields.title.textContent = this._title;
  }

  _setEventImage(image, popupImage, openPopup) {
    image.addEventListener('click', () => {
      popupImage.image.src = this._image;
      popupImage.image.alt = this._title;
      popupImage.caption.textContent = this._title;
      openPopup(popupImage.popup);
    })
  }

  _setEventDelete(card, deleteButton) {
    deleteButton.addEventListener('click', () => {
      card.remove();
    })
  }

  _setEventListeners(image, popupImage, openPopup, card, deleteButton) {
    this._setEventImage(image, popupImage, openPopup);
    this._setEventDelete(card, deleteButton);
  }

  _createCard(popupImage, openPopup) {
    const card = this._cloneCard();
    
    const image = card.querySelector(".place__image");
    const title = card.querySelector(".place__title");
    const deleteButton = card.querySelector(".place__delete");
    this._setData({image, title});
    this._setEventListeners(image, popupImage, openPopup, card, deleteButton);
    this._card = card;
  }

  getCard(popupImage, openPopup) {
    if (!this._card) {
      this._createCard(popupImage, openPopup);
    }
    return this._card;
  }
}

