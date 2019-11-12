'use strict';

// Модуль main.js
(function () {
  window.activatePin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinTail = parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').height, 10);

  window.main = {
    activatePin: window.activatePin,
    map: map
  };

  // Функция открытия страницы
  window.openPage = function () {
    window.main.map.classList.remove('map--faded');
  };

  // Функция получения координат главного пина
  window.getPinCoords = function () {

    window.addressCoords = {
      x: window.activatePin.offsetLeft + Math.ceil(window.activatePin.offsetWidth / 2),
      y: window.main.activatePin.offsetTop + Math.ceil(window.main.activatePin.offsetHeight + pinTail)
    };

    window.forms.addressInput.value = window.addressCoords.x + ' ' + window.addressCoords.y;
  };

  // Функция движения главного пина
  window.activatePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.getPinCoords();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var nextX = window.activatePin.offsetLeft - shift.x + window.activatePin.offsetWidth / 2;
      var nextY = window.activatePin.offsetTop - shift.y + window.activatePin.offsetHeight + pinTail;

      var mapRect = map.getBoundingClientRect();

      if (nextX > 0 && nextX < mapRect.width && mapRect.x < moveEvt.clientX && moveEvt.clientX < mapRect.x + mapRect.width) {
        window.activatePin.style.left = (window.activatePin.offsetLeft - shift.x) + 'px';
      }
      if (nextY > 130 && nextY < 630 && mapRect.y + 130 < moveEvt.clientY && moveEvt.clientY < mapRect.y + 630) {
        window.activatePin.style.top = (window.activatePin.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pinActive = false;

  window.errorMessageShowing = function () {
    var errorPlace = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var fragment = document.createDocumentFragment();
    window.element = errorTemplate.cloneNode(true);
    fragment.appendChild(window.element);
    errorPlace.appendChild(fragment);

    window.errorMessage = document.querySelector('.error');
    window.reloadButton = document.querySelector('.error__button');
  };

  var onError = function () {
    window.errorMessageShowing();

    window.reloadButtonHandler = function (evt) {
      evt.preventDefault();
      window.errorMessage.remove();
      window.pageActivate();
      window.reloadButton.removeEventListener('click', window.reloadButtonHandler);
    };

    window.reloadButton.addEventListener('click', window.reloadButtonHandler);
  };

  var popupContent = document.querySelector('.map__card');

  var onSuccess = function (data) {
    window.ads = data;
    window.renderPins(window.ads);

    window.pins = document.querySelectorAll('.map__pin');

    if (popupContent === undefined) {
      popupContent.setAttribute('hidden', 'hidden');
    }
  };

  // Функция активации страницы
  window.pageActivate = function () {
    window.openPage();
    window.forms.form.classList.remove('ad-form--disabled');

    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

    window.getPinCoords();
  };

  window.main.activatePin.addEventListener('mousedown', function () {
    window.getPinCoords();

    if (!window.pinActive) {
      window.pageActivate();
      window.pinActive = true;
    }

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

