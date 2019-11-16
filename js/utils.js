'use strict';

// Модуль util.js
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.pin = document.querySelector('.pin');

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
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

  // Функция закрытия попапа
  window.closePopupHandler = function () {
    var buttonClose = document.querySelector('.popup__close');

    buttonClose.addEventListener('click', function () {
      window.closePopup();
      window.removedActiveClass();
    });
  };

  // Функция удвления класса активного пина
  window.removedActiveClass = function () {
    for (var i = 0; i < window.pins.length; i++) {
      if (window.pins[i].classList.contains('map__pin--active')) {
        window.pins[i].classList.remove('map__pin--active');
      }
    }
  };

  // Функция закрытия попапа по клавише Esc
  window.closePopupEsc = function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.closePopup();
      }
      window.removedActiveClass();
    });
  };
})();
