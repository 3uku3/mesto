import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../initialCards.js";
import "./index.css";

const settings = {
  popupImageSelector: '.popup_type_image',
  popupEditSelector: '.popup-edit',
  popupAddSelector: '.popup-add',
  templateSelector: '#place-template',
  containerSelector: '.places',
  nameSelector: '.profile__name',
  aboutMeSelector: '.profile__about-me'
}

const settingsValidatator = {
  formSelector: '.popup_type_form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active',
}


const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");

const buttonEdit = document.querySelector(".profile__edit");
const formEdit = popupEditProfile.querySelector('.popup__container');

const buttonAdd = document.querySelector(".profile__add-button");
const formAdd = popupAddCard.querySelector('.popup__container');

const popupName = popupEditProfile.querySelector(".popup__input-text_type_name");
const popupAboutMe = popupEditProfile.querySelector(".popup__input-text_type_about-me");

const formAddValidator = new FormValidator(settingsValidatator, formAdd);
const formEditValidator = new FormValidator(settingsValidatator, formEdit);

const userInfo = new UserInfo({
  nameSelector: settings.nameSelector,
  aboutMeSelector: settings.aboutMeSelector
})

const popupWithImage = new PopupWithImage(settings.popupImageSelector);

const popupAdd = new PopupWithForm({
  submitForm: (item) => {
    const card = createCard({
      name: item.firstValue,
      link: item.secondValue
      });
    section.addItem(card.getCard());
    popupAdd.close();
  }
}, settings.popupAddSelector)

const popupEdit = new PopupWithForm({
  submitForm: (values) => {
    userInfo.setUserInfo({
      name: values.firstValue,
      aboutMe: values.secondValue
    });
    popupEdit.close()
  }
}, settings.popupEditSelector)

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card.getCard());
  }
},settings.containerSelector)

const createCard = (data) => {
  return new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open({
        caption: data.name,
        image: data.link
      })
    }
  }, settings.templateSelector)
}


buttonAdd.addEventListener('click', () => {
  popupAdd.open()
  formAddValidator.disableButton();
  formAddValidator.hideErrors();
})

buttonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupName.value = info.name;
  popupAboutMe.value = info.aboutMe;
  formEditValidator.enableButton();
  formEditValidator.hideErrors();
  popupEdit.open();
})


section.renderItems();

formAddValidator.enableValidation();
formEditValidator.enableValidation();

popupWithImage.setEventListeners()
popupAdd.setEventListeners()
popupEdit.setEventListeners()