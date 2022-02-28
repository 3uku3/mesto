let editButton = document.querySelector(".profile__edit");
let saveButton = document.querySelector(".popup__save-button");
let closeButton = document.querySelector(".popup__close-button");

let popup = document.querySelector(".popup");
let name = document.querySelector(".profile__name");
let aboutMe = document.querySelector(".profile__about-me");
let popupName = popup.querySelector(".popup__input-text_type_name");
let popupAboutMe = popup.querySelector(".popup__input-text_type_about-me");

editButton.addEventListener('click', () => {
  popupName.value = name.textContent;
  popupAboutMe.value = aboutMe.textContent;
  popup.classList.add("popup__opened");
})

saveButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  name.textContent = popupName.value;
  aboutMe.textContent = popupAboutMe.value;
  popup.classList.remove("popup__opened");
});

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popup.classList.remove("popup__opened");
})