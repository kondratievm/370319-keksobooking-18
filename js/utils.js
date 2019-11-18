'use strict';

// Модуль util.js
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.pin = document.querySelector('.pin');

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    // Функция генерирования числа от min до max
    getRandomCount: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Функция получения рандомного числа
    getRandomElement: function (elements) {
      return elements[Math.floor(Math.random() * elements.length)];
    },
    // Функция сравнения названий
    translateOffer: function (type) {
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
    },
    // Функция закрытия попапа
    onClosePopup: function () {
      var buttonClose = document.querySelector('.popup__close');

      buttonClose.addEventListener('click', function () {
        window.cards.closePopup();
        window.util.removeActiveClass();
      });
    },
    // Функция удаления класса активного пина
    removeActiveClass: function () {
      var renderActivePins = document.querySelectorAll('.map__pin');
      renderActivePins.forEach(function (renderActivePin) {
        renderActivePin.classList.remove('map__pin--active');
      });
    },
    // Функция закрытия попапа по клавише Esc
    closePopupEsc: function () {
      var onPopupPressEsc = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          window.cards.closePopup();
          document.removeEventListener('keydown', onPopupPressEsc);
        }
        window.util.removeActiveClass();
      };

      document.addEventListener('keydown', onPopupPressEsc);
    }
  };
})();
