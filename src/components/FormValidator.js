export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }
  
  _hasInvalidInput() {
    return this._listInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _hasEmptyInput() {
    return this._listInputs.some((inputElement) => {
      return !inputElement.value.length;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput() || this._hasEmptyInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid || inputElement.value.length === 0) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const elementError = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    elementError.textContent = inputElement.value.length === 0 ? "Вы пропустили это поле." : inputElement.validationMessage;
    elementError.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const elementError = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    elementError.classList.remove(this._settings.errorClass);
    elementError.textContent = '';
  }

  _setEventListeners() {
    this._listInputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState();
    this._listInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      })
    })
  }

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  
  hideErrors() {
    this._listInputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

