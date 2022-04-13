import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { openPopup, closePopup } from "./utils.js";

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

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const popupName = popupEditProfile.querySelector(".popup__input-text_type_name");
const popupAboutMe = popupEditProfile.querySelector(".popup__input-text_type_about-me");

const places = document.querySelector(".places");

const setCloseButtonEvents = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close-image") || evt.target == popup) {
      closePopup(popup);
    }
  })
}

initialCards.forEach((item) => {
  const card = new Card(item, "#place-template");
  places.append(card.getCard());
})

formAddValidator.enableValidation();
formEditValidator.enableValidation();

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
  formEditValidator.hideErrors();
  openPopup(popupEditProfile);
})

popupsList.forEach((popup) => {
  setCloseButtonEvents(popup);
})

buttonAdd.addEventListener('click', () => {
  formAdd.reset();
  formAddValidator.disableButton();
  formAddValidator.hideErrors();
  openPopup(popupAddCard);
})