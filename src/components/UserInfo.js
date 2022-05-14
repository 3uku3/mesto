export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._aboutMe = document.querySelector(aboutMeSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return { name: this._name.textContent, aboutMe: this._aboutMe.textContent };
  }
  getId() {
    return this._data._id;
  }
  setInitialData(data) {
    this._data = data;
    this.setUserInfo(data);
    this.setAvatar(data.avatar);
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._aboutMe.textContent = about;
  }
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
