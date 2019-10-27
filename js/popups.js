'use strict';

// Модуль popups.js
(function () {
  // Функция удаления карточки
  window.closePopup = function () {
    var pinCard = document.querySelector('.map__card');
    if (pinCard) {
      pinCard.remove();
    }
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
    // var btnClose = document.querySelector('.popup__close');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.closePopup();
      }
    });
  };

  // Функция открытия попапа по клавише Enter
  window.openPopupEnter = function () {
    var openPin = document.querySelector('.map__pin');
    openPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.closePopup();
      }
    });
  };
})();
