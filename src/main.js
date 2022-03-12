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

const placeTemplate = document.querySelector("#place-template").content;
const places = document.querySelector(".places");
initialCards.forEach((item) => {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");
  const placeDelete = placeElement.querySelector(".place__delete");

  placeImage.src = item.link;
  placeImage.alt = item.name;
  placeTitle.textContent = item.name;

  placeImage.addEventListener('click', () => {
    const popup = document.querySelector(".popup_type_image");
    const popupImage = popup.querySelector(".popup__image");
    const popupTitle = popup.querySelector(".popup__caption");
    popupImage.src = placeImage.src;
    popupTitle.textContent = placeTitle.textContent;
    popup.classList.add("popup__opened");
  })
  placeLike.addEventListener('click', () => {
    placeLike.classList.toggle("place__like-button_active");
  })
  placeDelete.addEventListener('click', () => {
    placeElement.remove();
  })
  places.append(placeElement);
})

const popupEdit = document.querySelector(".popup-edit");

const editButton = document.querySelector(".profile__edit");
const saveButton = popupEdit.querySelector(".popup__save-button");
const closeButton = popupEdit.querySelector(".popup__close-button");

const name = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const popupName = popupEdit.querySelector(".popup__input-text_type_name");
const popupAboutMe = popupEdit.querySelector(".popup__input-text_type_about-me");

editButton.addEventListener('click', () => {
  popupName.value = name.textContent;
  popupAboutMe.value = aboutMe.textContent;
  popupEdit.classList.add("popup__opened");
})

saveButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  name.textContent = popupName.value;
  aboutMe.textContent = popupAboutMe.value;
  popupEdit.classList.remove("popup__opened");
});

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupEdit.classList.remove("popup__opened");
})

const popupAdd = document.querySelector(".popup-add");


const addButton = document.querySelector(".profile__add-button");
const createButton = popupAdd.querySelector(".popup__save-button");
const closeButtonEdit = popupAdd.querySelector(".popup__close-button");

const placeName = popupAdd.querySelector(".popup__input-text_type_name-place");
const placeLink = popupAdd.querySelector(".popup__input-text_type_link");

addButton.addEventListener('click', () => {
  popupAdd.classList.add("popup__opened");
})

closeButtonEdit.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupAdd.classList.remove("popup__opened");
})

createButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");
  const placeDelete = placeElement.querySelector(".place__delete");

  placeImage.src = placeLink.value;
  placeImage.alt = placeName.value;
  placeLink.value = "";
  placeTitle.textContent = placeName.value;
  placeName.value = "";

  placeImage.addEventListener('click', () => {
    const popup = document.querySelector(".popup_type_image");
    const popupImage = popup.querySelector(".popup__image");
    const popupTitle = popup.querySelector(".popup__caption");
    popupImage.src = placeImage.src;
    popupTitle.textContent = placeTitle.textContent;
    popup.classList.add("popup__opened");
  })
  placeLike.addEventListener('click', () => {
    placeLike.classList.toggle("place__like-button_active");
  })
  placeDelete.addEventListener('click', () => {
    placeElement.remove();
  })
  places.prepend(placeElement);
  popupAdd.classList.remove("popup__opened");
})

const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseBtn = popupImage.querySelector(".popup__close-button");

popupImageCloseBtn.addEventListener('click', () => {
  popupImage.classList.remove("popup__opened");
})