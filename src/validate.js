const settings = {
  formSelector: '.popup_type_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (inputErrorClass, errorClass, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.value.length === 0 ? "Вы пропустили это поле." : errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputErrorClass, errorClass, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hideErrors = (inputErrorClass, errorClass, inputSelector, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(inputErrorClass, errorClass, formElement, inputElement);
  })
}

const hasEmptyInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.value.length;
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const disableButton = (inactiveButtonClass, buttonElement) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (inactiveButtonClass, buttonElement) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (inactiveButtonClass, inputList, buttonElement) => {
  if(hasInvalidInput(inputList) || hasEmptyInput(inputList)) {
    disableButton(inactiveButtonClass, buttonElement);
  } else {
    enableButton(inactiveButtonClass, buttonElement);
  }
}

const checkInputValidity = (inputErrorClass, errorClass, formElement, inputElement) => {
  if (!inputElement.validity.valid || inputElement.value.length === 0) {
    showInputError(inputErrorClass, errorClass, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputErrorClass, errorClass, formElement, inputElement);
  }
};

const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(settings.inactiveButtonClass, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(settings.inactiveButtonClass, inputList, buttonElement);
      checkInputValidity(settings.inputErrorClass, settings.errorClass, formElement, inputElement);
    })
  })
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(settings, formElement);
  })
}

enableValidation(settings);