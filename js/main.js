'use strict';

// Модуль main.js
(function () {
  var MAX_Y_COORD = 130;
  var MIN_Y_COORD = 630;
  var activatePin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinTail = parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').height, 10);

  window.main = {
    map: map,
    activatePin: activatePin,
  };

  // Функция открытия страницы
  var openPage = function () {
    window.main.map.classList.remove('map--faded');
  };

  // Функция получения координат главного пина
  var getPinCoords = function () {

    window.addressCoords = {
      x: window.main.activatePin.offsetLeft + Math.ceil(window.main.activatePin.offsetWidth / 2),
      y: window.main.activatePin.offsetTop + Math.ceil(window.main.activatePin.offsetHeight + pinTail)
    };

    window.forms.addressInput.value = window.addressCoords.x + ' ' + window.addressCoords.y;
  };

  // Функция движения главного пина
  window.main.activatePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinCoords();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var nextX = window.main.activatePin.offsetLeft - shift.x + window.main.activatePin.offsetWidth / 2;
      var nextY = window.main.activatePin.offsetTop - shift.y + window.main.activatePin.offsetHeight + pinTail;

      var mapRect = map.getBoundingClientRect();

      if (nextX > 0 && nextX < mapRect.width && mapRect.x < moveEvt.clientX && moveEvt.clientX < mapRect.x + mapRect.width) {
        window.main.activatePin.style.left = (window.main.activatePin.offsetLeft - shift.x) + 'px';
      }
      if (nextY > MAX_Y_COORD && nextY < MIN_Y_COORD && mapRect.y + MAX_Y_COORD < moveEvt.clientY && moveEvt.clientY < mapRect.y + MIN_Y_COORD) {
        window.main.activatePin.style.top = (window.main.activatePin.offsetTop - shift.y) + 'px';
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

  window.showErrorMessage = function () {
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
    window.showErrorMessage();

    window.onReloadButton = function (evt) {
      evt.preventDefault();
      window.errorMessage.remove();
      pageActivate();
      window.reloadButton.removeEventListener('click', window.onReloadButton);
    };

    window.reloadButton.addEventListener('click', window.onReloadButton);
  };

  var popupContent = document.querySelector('.map__card');

  var onSuccess = function (data) {
    window.ads = data;

    window.renderPins(window.ads);

    window.pins = document.querySelectorAll('.map__pin');
    window.activePin = document.querySelector('.map__pin');

    if (popupContent !== null) {
      popupContent.setAttribute('hidden', 'hidden');
    }
  };

  var onActivatePinEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPage();
      pageActivate();
      window.forms.removeDisabled();
      window.forms.removeDisabledFiltrCheckboxes();
      window.forms.removeDisabledFiltres();
      window.main.activatePin.removeEventListener('keydown', onActivatePinEnter);
    }
  };

  window.main.activatePin.addEventListener('keydown', onActivatePinEnter);

  // Функция активации страницы
  var pageActivate = function () {
    openPage();
    window.forms.form.classList.remove('ad-form--disabled');

    window.loading.load(onSuccess, onError);

    getPinCoords();
  };

  window.main.activatePin.addEventListener('mousedown', function () {
    getPinCoords();

    if (!window.pinActive) {
      pageActivate();
      window.pinActive = true;
    }

    window.forms.removeDisabled();
    window.forms.removeDisabledFiltres();
    window.forms.removeDisabledFiltrCheckboxes();
  });
})();
