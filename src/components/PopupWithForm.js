import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({submitForm},popupSelector) {
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector(".popup__container_type_form");
    this._formButton = this._popup.querySelector(".popup__save-button");
    this._textButton = this._formButton.textContent;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input-text'));
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formButton.textContent = "Сохранение...";
      this._submit(this._getInputValues());
    });
  }
  resetTextButton = () => {
    this._formButton.textContent = this._textButton;
  }
  close() {
    super.close();
    this._inputList.forEach((input) => {
      input.value = '';
    })
  }
}