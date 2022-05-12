import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({submitForm},popupSelector){
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector(".popup__container_type_form");
    this._formButton = this._popup.querySelector(".popup__save-button");
  }
  setCard(card) {
    this._card = card;
  }
 
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const textButton = this._formButton.textContent;
      this._formButton.textContent = "Удаление...";
      this._submit(this._card.getId());
      this._card.delete();
      this._formButton.textContent = textButton;
    })
  }
}