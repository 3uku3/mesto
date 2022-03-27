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

const popupsList = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");
const imagePopup = document.querySelector(".popup_type_image");

const editButton = document.querySelector(".profile__edit");
const editForm = editPopup.querySelector('.popup__container');

const addButton = document.querySelector(".profile__add-button");
const addForm = addPopup.querySelector('.popup__container');

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const addPlaceName = addPopup.querySelector(".popup__input-text_type_name-place");
const addPlaceLink = addPopup.querySelector(".popup__input-text_type_link");
const popupAddData = {
  name: '',
  link: ''
}

const name = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const popupName = editPopup.querySelector(".popup__input-text_type_name");
const popupAboutMe = editPopup.querySelector(".popup__input-text_type_about-me");

const templatePlace = document.querySelector("#place-template").content.querySelector(".place");
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
    closePopup(document.querySelector(".popup_opened"));
    document.removeEventListener('keydown', closePopupKeydown);
  }
}

const setCloseButtonEvents = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close-image") || evt.target == popup) {
      closePopup(popup);
    }
  })
}

const createCard = (item) => {
  const placeElement = templatePlace.cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeDelete = placeElement.querySelector(".place__delete");

  placeImage.src = item.link;
  placeImage.alt = item.name;
  placeTitle.textContent = item.name;

  placeImage.addEventListener('click', () => {
    popupImage.src = placeImage.src;
    popupImage.alt = placeTitle.textContent;
    popupCaption.textContent = placeTitle.textContent;
    openPopup(imagePopup);
  })
  placeDelete.addEventListener('click', () => {
    placeElement.remove();
  })
  return placeElement;
}

initialCards.forEach((item) => {
  const placeElement = createCard(item);
  places.append(placeElement);
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
  popupAddData.name = addPlaceName.value;
  popupAddData.link = addPlaceLink.value;
  const placeElement = createCard(popupAddData);
  addForm.reset();
  places.prepend(placeElement);
  closePopup(addPopup);
})

editButton.addEventListener('click', () => {
  popupName.value = name.textContent;
  popupAboutMe.value = aboutMe.textContent;
  openPopup(editPopup);
})

popupsList.forEach((popup) => {
  setCloseButtonEvents(popup);
})

addButton.addEventListener('click', () => {
  openPopup(addPopup);
})