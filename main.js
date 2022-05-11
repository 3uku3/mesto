(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=n,this._settings=e}var n,r;return n=t,(r=[{key:"_hasInvalidInput",value:function(){return this._listInputs.some((function(e){return!e.validity.valid}))}},{key:"_hasEmptyInput",value:function(){return this._listInputs.some((function(e){return!e.value.length}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()||this._hasEmptyInput()?this.disableButton():this.enableButton()}},{key:"_checkInputValidity",value:function(e){e.validity.valid&&0!==e.value.length?this._hideInputError(e):this._showInputError(e)}},{key:"_showInputError",value:function(e){var t=this._formElement.querySelector(".popup__input-error_type_".concat(e.id));e.classList.add(this._settings.inputErrorClass),t.textContent=0===e.value.length?"Вы пропустили это поле.":e.validationMessage,t.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".popup__input-error_type_".concat(e.id));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"_setEventListeners",value:function(){var e=this;this._listInputs=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector),this._toggleButtonState(),this._listInputs.forEach((function(t){t.addEventListener("input",(function(){e._toggleButtonState(),e._checkInputValidity(t)}))}))}},{key:"disableButton",value:function(){this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"enableButton",value:function(){this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"hideErrors",value:function(){var e=this;this._listInputs.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r=t.data,o=t.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._image=r.link,this._title=r.name,this._handleCardClick=o,this._templateSelector=n}var t,r;return t=e,(r=[{key:"_cloneCard",value:function(){return document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._imageElement.addEventListener("click",this._handleCardClick),this._buttonLike.addEventListener("click",(function(){e._buttonLike.classList.toggle("place__like-button_active")})),this._buttonDelete.addEventListener("click",(function(){e._card.remove(),e._card=null}))}},{key:"_createCard",value:function(){this._card=this._cloneCard(),this._imageElement=this._card.querySelector(".place__image"),this._titleElement=this._card.querySelector(".place__title"),this._buttonDelete=this._card.querySelector(".place__delete"),this._buttonLike=this._card.querySelector(".place__like-button"),this._imageElement.src=this._image,this._imageElement.alt=this._title,this._titleElement.textContent=this._title,this._setEventListeners()}},{key:"getCard",value:function(){return this._card||this._createCard(),this._card}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscCloseBind=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){document.addEventListener("keydown",this._handleEscCloseBind),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscCloseBind),this._popup.classList.remove("popup_opened")}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup__close-image")||t.target==e._popup)&&e.close()}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=c(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function c(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function p(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=f(r);if(o){var n=f(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(e,t){var n,r=e.submitForm;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._submit=r,n._inputList=Array.from(n._popup.querySelectorAll(".popup__input-text")),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;s(f(a.prototype),"setEventListeners",this).call(this),this._form=this._popup.querySelector(".popup__container_type_form"),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submit(e._getInputValues())}))}},{key:"close",value:function(){s(f(a.prototype),"close",this).call(this),this._inputList.forEach((function(e){e.value=""}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},d.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function b(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popup.querySelector(".popup__image"),t._caption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.image,n=e.caption;this._image.src=t,this._image.alt=n,this._caption.textContent=n,d(g(a.prototype),"open",this).call(this)}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C=function(){function e(t){var n=t.nameSelector,r=t.aboutMeSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._aboutMe=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,aboutMe:this._aboutMe.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.aboutMe;this._name.textContent=t,this._aboutMe.textContent=n}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),O={formSelector:".popup_type_form",inputSelector:".popup__input-text",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input-text_type_error",errorClass:"popup__input-error_active"},j=document.querySelector(".popup-edit"),L=document.querySelector(".popup-add"),P=document.querySelector(".profile__edit"),I=j.querySelector(".popup__container"),q=document.querySelector(".profile__add-button"),x=L.querySelector(".popup__container"),B=j.querySelector(".popup__input-text_type_name"),R=j.querySelector(".popup__input-text_type_about-me"),T=new t(O,x),M=new t(O,I),V=new C({nameSelector:".profile__name",aboutMeSelector:".profile__about-me"}),D=new E(".popup_type_image"),A=new _({submitForm:function(e){var t=z({name:e["name-place"],link:e["link-img"]});F.addItem(t.getCard()),A.close()}},".popup-add"),U=new _({submitForm:function(e){V.setUserInfo({name:e.name,aboutMe:e["about-me"]}),U.close()}},".popup-edit"),F=new w({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=z(e);F.addItem(t.getCard())}},".places"),z=function(e){return new r({data:e,handleCardClick:function(){D.open({caption:e.name,image:e.link})}},"#place-template")};q.addEventListener("click",(function(){A.open(),T.disableButton(),T.hideErrors()})),P.addEventListener("click",(function(){var e=V.getUserInfo();B.value=e.name,R.value=e.aboutMe,M.enableButton(),M.hideErrors(),U.open()})),F.renderItems(),T.enableValidation(),M.enableValidation(),D.setEventListeners(),A.setEventListeners(),U.setEventListeners()})();