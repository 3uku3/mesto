import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({submitForm},popupSelector){
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector(".popup__container_type_form");
    this._formButton = this._popup.querySelector(".popup__save-button");
    this._textButton = this._formButton.textContent;
  }
  setCard(card) {
    this._card = card;
  }
  deleteCard() {
    this._card.delete();
  } 
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formButton.textContent = "Удаление...";
      this._submit(this._card.getId());
    })
  }

  resetTextButton = () => {
    this._formButton.textContent = this._textButton;
  }
}