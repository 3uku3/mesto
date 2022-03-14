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


const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");
const imagePopup = document.querySelector(".popup_type_image");

const editButton = document.querySelector(".profile__edit");
const editSaveButton = editPopup.querySelector(".popup__save-button");
const editCloseButton = editPopup.querySelector(".popup__close-button");
const editForm = editPopup.querySelector('.popup__container');

const addButton = document.querySelector(".profile__add-button");
const addCreateButton = addPopup.querySelector(".popup__save-button");
const addCloseButton = addPopup.querySelector(".popup__close-button");
const addForm = addPopup.querySelector('.popup__container');

const imageCloseButton = imagePopup.querySelector(".popup__close-button");

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


function openPopup(popup) {
  popup.classList.add('popup__opened');
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

function createCard(item) {
  const placeElement = templatePlace.cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");
  const placeDelete = placeElement.querySelector(".place__delete");

  placeImage.src = item.link;
  placeImage.alt = item.name;
  placeTitle.textContent = item.name;

  placeImage.addEventListener('click', () => {
    popupImage.src = placeImage.src;
    popupCaption.textContent = placeTitle.textContent;
    openPopup(imagePopup);
  })
  placeLike.addEventListener('click', () => {
    placeLike.classList.toggle("place__like-button_active");
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

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
})


addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
})

editButton.addEventListener('click', () => {
  popupName.value = name.textContent;
  popupAboutMe.value = aboutMe.textContent;
  openPopup(editPopup);
})

editSaveButton.addEventListener('click', () => {
  name.textContent = popupName.value;
  aboutMe.textContent = popupAboutMe.value;
  closePopup(editPopup)
});

editCloseButton.addEventListener('click', () => {
  closePopup(editPopup)
})

addButton.addEventListener('click', () => {
  openPopup(addPopup);
})

addCloseButton.addEventListener('click', () => {
  closePopup(addPopup);
})

addCreateButton.addEventListener('click', () => {
  popupAddData.name = addPlaceName.value;
  popupAddData.link = addPlaceLink.value;
  const placeElement = createCard(popupAddData);
  addPlaceName.value = '';
  addPlaceLink.value = '';
  places.prepend(placeElement);
  closePopup(addPopup);
})

imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
})