'use strict';

// Модуль main.js
(function () {
  var activatePin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  window.main = {
    activatePin: activatePin,
    map: map
  };

  // Функция открытия страницы
  window.openPage = function () {
    window.main.map.classList.remove('map--faded');
  };

  // Функция получения координат главного пина
  window.getPinCoords = function () {
    var mainPinCoords = window.main.activatePin.getBoundingClientRect().x + ' ' + window.main.activatePin.getBoundingClientRect().y;

    window.forms.addressInput.value = mainPinCoords;
  };

  // Функция активации страницы
  window.pageActivate = function () {
    window.openPage();
    window.forms.form.classList.remove('ad-form--disabled');

    window.renderPins(window.ads);
    window.getPinCoords();
  };

  window.main.activatePin.addEventListener('mousedown', function () {
    window.pageActivate();
    window.removeDisabled();
  });

  window.main.activatePin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.openPage();
      window.pageActivate();
      window.removeDisabled();
    }
  });
})();
