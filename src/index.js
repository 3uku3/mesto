import { FormValidator } from "./validate.js";
import { Card } from "./card.js";

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  formSelector: '.popup_type_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
}

const formList = Array.from(document.querySelectorAll(settings.formSelector));

const popupsList = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");

const editButton = document.querySelector(".profile__edit");
const editForm = editPopup.querySelector('.popup__container');
const editSaveButton = editPopup.querySelector(".popup__save-button");

const addButton = document.querySelector(".profile__add-button");
const addForm = addPopup.querySelector('.popup__container');
const addSaveButton = addPopup.querySelector(".popup__save-button")

const addPlaceName = addPopup.querySelector(".popup__input-text_type_name-place");
const addPlaceLink = addPopup.querySelector(".popup__input-text_type_link");


const popupImage = {
  popup: document.querySelector(".popup_type_image"),
  image: document.querySelector(".popup__image"),
  caption: document.querySelector(".popup__caption")
}

const name = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const popupName = editPopup.querySelector(".popup__input-text_type_name");
const popupAboutMe = editPopup.querySelector(".popup__input-text_type_about-me");

const places = document.querySelector(".places");

const openPopup = (popup) => {
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
    FormValidator.hideErrors(settings.inputErrorClass, settings.errorClass, settings.inputSelector, popup);
    closePopup(popup);
  }
}

const setCloseButtonEvents = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close-image") || evt.target == popup) {
      FormValidator.hideErrors(settings.inputErrorClass, settings.errorClass, settings.inputSelector, popup);
      closePopup(popup);
    }
  })
}

initialCards.forEach((item) => {
  const card = new Card(item, "#place-template");
  places.append(card.getCard(popupImage, openPopup));
})

formList.forEach((formElement) => {
  const validation = new FormValidator(settings, formElement);
  validation.enableValidation();
})

places.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("place__like-button")) {
    evt.target.classList.toggle("place__like-button_active");
  }
})

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  name.textContent = popupName.value;
  aboutMe.textContent = popupAboutMe.value;
  closePopup(editPopup)
})

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const popupAddData = {
    name: addPlaceName.value,
    link: addPlaceLink.value
  }
  const card = new Card(popupAddData, "#place-template");
  places.prepend(card.getCard(popupImage, openPopup));
  closePopup(addPopup);
})

editButton.addEventListener('click', () => {
  popupName.value = name.textContent;
  popupAboutMe.value = aboutMe.textContent;
  FormValidator.enableButton(settings.inactiveButtonClass, editSaveButton);
  openPopup(editPopup);
})

popupsList.forEach((popup) => {
  setCloseButtonEvents(popup);
})

addButton.addEventListener('click', () => {
  addForm.reset();
  FormValidator.disableButton(settings.inactiveButtonClass, addSaveButton);
  openPopup(addPopup);
})