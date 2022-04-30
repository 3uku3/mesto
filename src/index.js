import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import { initialCards } from "./initialCards.js";
import "../pages/index.css";

const settings = {
  formSelector: '.popup_type_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active',
  popupImageSelector: '.popup_type_image',
  popupEditSelector: '.popup-edit',
  popupAddSelector: '.popup-add',
  templateSelector: '#place-template',
  containerSelector: '.places',
  nameSelector: '.profile__name',
  aboutMeSelector: '.profile__about-me'
}
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");

const buttonEdit = document.querySelector(".profile__edit");
const formEdit = popupEditProfile.querySelector('.popup__container');

const buttonAdd = document.querySelector(".profile__add-button");
const formAdd = popupAddCard.querySelector('.popup__container');

const namePlaceInput = popupAddCard.querySelector(".popup__input-text_type_name-place");
const linkInput = popupAddCard.querySelector(".popup__input-text_type_link");

const popupName = popupEditProfile.querySelector(".popup__input-text_type_name");
const popupAboutMe = popupEditProfile.querySelector(".popup__input-text_type_about-me");

const formAddValidator = new FormValidator(settings, formAdd);
const formEditValidator = new FormValidator(settings, formEdit);

const userInfo = new UserInfo({
  nameSelector: settings.nameSelector,
  aboutMeSelector: settings.aboutMeSelector
})

const popupWithImage = new PopupWithImage(settings.popupImageSelector);
popupWithImage.setEventListeners()

const popupAdd = new PopupWithForm({
  submitForm: (evt) => {
    evt.preventDefault();
    const values = popupAdd._getInputValues();
    const data = {
      name: namePlaceInput.value,
      link: linkInput.value
    }
    const card = new Card({
      data,
      handleCardClick: () => {
        popupWithImage.open({
          image: data.link,
          caption: data.name
        })
      }
    }, settings.templateSelector);
    section.addItem(card.getCard());
    popupAdd.close();
  }
}, settings.popupAddSelector)
popupAdd.setEventListeners()

buttonAdd.addEventListener('click', () => {
  popupAdd.open()
  formAddValidator.disableButton();
  formAddValidator.hideErrors();
})


const popupEdit = new PopupWithForm({
  submitForm: (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({
      name: popupName.value,
      aboutMe: popupAboutMe.value});
    popupEdit.close()
  }
}, settings.popupEditSelector)
popupEdit.setEventListeners()

buttonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupName.value = info.name;
  popupAboutMe.value = info.aboutMe;
  formEditValidator.enableButton();
  formEditValidator.hideErrors();
  popupEdit.open();
})

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open({
          image: item.link,
          caption: item.name
        });
      }
    },
    settings.templateSelector);
    section.addItem(card.getCard());
  }
},settings.containerSelector)
section.renderItems();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
