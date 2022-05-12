import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

const settings = {
  popupImageSelector: ".popup_type_image",
  popupEditSelector: ".popup-edit",
  popupEditAvatarSelector: ".popup-avatarEdit",
  popupAddSelector: ".popup-add",
  popupDeleteSelector: ".popup-confirmDelete",
  templateSelector: "#place-template",
  containerSelector: ".places",
  nameSelector: ".profile__name",
  aboutMeSelector: ".profile__about-me",
  avatarSelector: ".profile__image",
};

const settingsValidatator = {
  formSelector: ".popup_type_form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input-text_type_error",
  errorClass: "popup__input-error_active",
};

const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");
const popupEditAvatarImage = document.querySelector(".popup-avatarEdit");

const buttonEdit = document.querySelector(".profile__edit");
const formEdit = popupEditProfile.querySelector(".popup__container");

const buttonAdd = document.querySelector(".profile__add-button");
const formAdd = popupAddCard.querySelector(".popup__container");

const buttonEditAvatar = document.querySelector(".profile__avatar-container");
const formEditAvatar = popupEditAvatarImage.querySelector(".popup__container");

const popupName = popupEditProfile.querySelector(
  ".popup__input-text_type_name"
);
const popupAboutMe = popupEditProfile.querySelector(
  ".popup__input-text_type_about-me"
);

const formAddValidator = new FormValidator(settingsValidatator, formAdd);
const formEditValidator = new FormValidator(settingsValidatator, formEdit);
const formEditAvatarValidator = new FormValidator(
  settingsValidatator,
  formEditAvatar
);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "a48bce56-96e8-42c2-a01a-b99720e0170b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: settings.nameSelector,
  aboutMeSelector: settings.aboutMeSelector,
  avatarSelector: settings.avatarSelector,
});

const popupWithImage = new PopupWithImage(settings.popupImageSelector);

api.getAllInitData().then((res) => {
  const [user, cards] = res;
  userInfo.setInitialData(user);
  const myId = userInfo.getId();

  const createCard = (data) => {
    return new Card(
      {
        data,
        handleCardClick: () => {
          popupWithImage.open({
            caption: data.name,
            image: data.link,
          });
        },
        handleDeleteClick: (card) => {
          popupSubmit.setCard(card);
          popupSubmit.open();
        },
        handleLikeClick: (id, isLiked, card) => {
          if (isLiked) {
            api.deleteLike(id).then((res) => {
              card.updateLikeCounter(res.likes);
            });
          } else {
            api.like(id).then((res) => {
              card.updateLikeCounter(res.likes);
            });
          }
        },
        myId,
      },
      settings.templateSelector
    );
  };

  const popupSubmit = new PopupWithSubmit(
    {
      submitForm: (id) => {
        api.deleteCard(id).finally(() => {
          popupSubmit.close();
        });
      },
    },
    settings.popupDeleteSelector
  );

  const section = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        section.addItem(card.getCard());
      },
    },
    settings.containerSelector
  );

  const popupAdd = new PopupWithForm(
    {
      submitForm: (item) => {
        api.addCard(item).then((res) => {
          const card = createCard(res);
          section.addItem(card.getCard());
          popupAdd.close();
        });
      },
    },
    settings.popupAddSelector
  );

  const popupEdit = new PopupWithForm(
    {
      submitForm: (values) => {
        api.setUserInfo(values).then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            about: res.about,
          });
          popupEdit.close();
        });
      },
    },
    settings.popupEditSelector
  );

  const popupEditAvatar = new PopupWithForm(
    {
      submitForm: (values) => {
        api.setUserAvatar(values).then((res) => {
          userInfo.setAvatar(res.avatar);
        });
        popupEditAvatar.close();
      },
    },
    settings.popupEditAvatarSelector
  );

  buttonAdd.addEventListener("click", () => {
    popupAdd.open();
    formAddValidator.disableButton();
    formAddValidator.hideErrors();
  });

  buttonEdit.addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    popupName.value = info.name;
    popupAboutMe.value = info.aboutMe;
    formEditValidator.enableButton();
    formEditValidator.hideErrors();
    popupEdit.open();
  });

  buttonEditAvatar.addEventListener("click", () => {
    popupEditAvatar.open();
    formEditAvatarValidator.disableButton();
    formEditAvatarValidator.hideErrors();
  });
  section.renderItems();
  popupEditAvatar.setEventListeners();
  popupAdd.setEventListeners();
  popupEdit.setEventListeners();
  popupSubmit.setEventListeners();
});
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formEditAvatarValidator.enableValidation();

popupWithImage.setEventListeners();