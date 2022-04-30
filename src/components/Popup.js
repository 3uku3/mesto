export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._handleEscCloseBind = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this._handleEscCloseBind);
    this._popup.classList.add('popup_opened');
  }
  
  close() {
    document.removeEventListener('keydown', this._handleEscCloseBind);
    this._popup.classList.remove('popup_opened');
  }
  
  setEventListeners(){
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup__close-image") || evt.target == this._popup) {
        this.close();
      }
    })
  }
}