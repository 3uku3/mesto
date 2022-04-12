import { FormValidator } from "./validate.js";
import { Card } from "./card.js";
import { initialCards } from "./initialCards.js";


const settings = {
  formSelector: '.popup_type_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
}

const popupsList = Array.from(document.querySelectorAll(".popup"));
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");

const buttonEdit = document.querySelector(".profile__edit");
const formEdit = popupEditProfile.querySelector('.popup__container');

const buttonAdd = document.querySelector(".profile__add-button");
const formAdd = popupAddCard.querySelector('.popup__container');

const namePlaceInput = popupAddCard.querySelector(".popup__input-text_type_name-place");
const linkInput = popupAddCard.querySelector(".popup__input-text_type_link");

const formAddValidator = new FormValidator(settings, formAdd);
const formEditValidator = new FormValidator(settings, formEdit);

const formValidators = [formAddValidator, formEditValidator];

export const popupImage = {
  popup: document.querySelector(".popup_type_image"),
  image: document.querySelector(".popup__image"),
  caption: document.querySelector(".popup__caption")
}

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const popupName = popupEditProfile.querySelector(".popup__input-text_type_name");
const popupAboutMe = popupEditProfile.querySelector(".popup__input-text_type_about-me");

const places = document.querySelector(".places");

export const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupKeydown);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupKeydown);
  popup.classList.remove("popup_opened");
}

const closePopupKeydown = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    formValidators.forEach((formValidator) => {
      if (formValidator.compareForm(popup.firstElementChild)) {
        formValidator.hideErrors();
      }
    })
    closePopup(popup);
  }
}

const setCloseButtonEvents = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close-image") || evt.target == popup) {
      formValidators.forEach((formValidator) => {
        if (formValidator.compareForm(popup.firstElementChild)) {
          formValidator.hideErrors();
        }
      })
      closePopup(popup);
    }
  })
}

initialCards.forEach((item) => {
  const card = new Card(item, "#place-template");
  places.append(card.getCard());
})

formValidators.forEach((formValidator) => {
  formValidator.enableValidation();
})

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAboutMe.textContent = popupAboutMe.value;
  closePopup(popupEditProfile)
})

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const popupAddData = {
    name: namePlaceInput.value,
    link: linkInput.value
  }
  const card = new Card(popupAddData, "#place-template");
  places.prepend(card.getCard());
  closePopup(popupAddCard);
})

buttonEdit.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupAboutMe.value = profileAboutMe.textContent;
  formEditValidator.enableButton();
  openPopup(popupEditProfile);
})

popupsList.forEach((popup) => {
  setCloseButtonEvents(popup);
})

buttonAdd.addEventListener('click', () => {
  formAdd.reset();
  formAddValidator.disableButton();
  openPopup(popupAddCard);
})