import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({submitForm},popupSelector) {
    super(popupSelector);
    this._submit = submitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input-text'));
  }
  _getInputValues() {
    const values = this._inputList.map((input, index) => {
      return input.value;
    })
    return values;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form = this._popup.querySelector(".popup__container_type_form");
    this._form.addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    this._inputList.forEach((input) => {
      input.value = '';
    })
  }
}