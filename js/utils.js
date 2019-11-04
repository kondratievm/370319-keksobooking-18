'use strict';

// Модуль util.js
(function () {
  var AD_COUNT = 8;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    AD_COUNT: AD_COUNT
  };

  // Функция генерирования числа от min до max
  window.getRandomCount = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Функция получения рандомного числа
  window.getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  // Создаем массив фотографий
  window.createPhotoArr = function (min, max) {
    var photos = [];
    for (var i = 0; i < window.getRandomCount(min, max); i++) {
      photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }
    return photos;
  };

  // Функция сравнения названий
  window.offerTranslatter = function (type) {
    switch (type) {
      case 'flat': type = 'Квартира';
        break;
      case 'bungalo': type = 'Бунгало';
        break;
      case 'house': type = 'Дом';
        break;
      case 'palace': type = 'Дворец';
        break;
    }
    return type;
  };

  // Функция отрисовки фотографий
  window.renderPhotos = function (adPhoto) {
    var photoList = adPhoto.querySelector('.popup__photos');
    var photoTemplate = photoList.querySelector('.popup__photo');
    photoList.innerHTML = '';

    for (var i = 0; i < window.cards.OFFER_PHOTOS.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.setAttribute('src', window.cards.OFFER_PHOTOS[i]);
      photoList.appendChild(photoElement);
    }
    adPhoto.appendChild(photoList);
  };

  // Функция закрытия попапа
  window.closePopupHandler = function () {
    var btnClose = document.querySelector('.popup__close');

    btnClose.addEventListener('click', function () {
      window.closePopup();
    });
  };

  // Функция закрытия попапа по клавише Esc
  window.closePopupEsc = function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.closePopup();
      }
    });
  };
})();
