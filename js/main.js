'use strict';

var activatePin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');

// Функция открытия страницы
var openPage = function () {
  map.classList.remove('map--faded');
};

// Функция получения координат главного пина
var getPinCoords = function () {
  var mainPinCoords = activatePin.getBoundingClientRect().x + ' ' + activatePin.getBoundingClientRect().y;

  addressInput.value = mainPinCoords;
};

// Функция активации страницы
var pageActivate = function () {
  openPage();
  form.classList.remove('ad-form--disabled');

  window.renderPins(window.ads);
  getPinCoords();
};

activatePin.addEventListener('mousedown', function () {
  pageActivate();
  window.removeDisabled();
});

activatePin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    openPage();
    pageActivate();
    window.removeDisabled();
  }
});
