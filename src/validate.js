export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _hasEmptyInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.value.length;
    })
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList) || this._hasEmptyInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
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
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.value.length === 0 ? "Вы пропустили это поле." : inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(inputElement);
      })
    })
  }

  static hideInputError(inputErrorClass, errorClass, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  static hideErrors(inputErrorClass, errorClass, inputSelector, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      FormValidator.hideInputError(inputErrorClass, errorClass, formElement, inputElement);
    })
  }
  
  static disableButton(inactiveButtonClass, buttonElement) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  static enableButton(inactiveButtonClass, buttonElement) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }

  enableValidation() {
    this._setEventListeners();
  }
}

