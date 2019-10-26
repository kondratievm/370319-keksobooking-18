'use strict';

// Модуль main.js
(function () {
  var activatePin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinTail = parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').height, 10);

  window.main = {
    activatePin: activatePin,
    map: map
  };

  // Функция открытия страницы
  window.openPage = function () {
    window.main.map.classList.remove('map--faded');
  };

  // Функция получения координат главного пина
  var getPinCoords = function () {

    window.addressCoords = {
      x: activatePin.offsetLeft + Math.ceil(activatePin.offsetWidth / 2),
      y: window.main.activatePin.offsetTop + Math.ceil(window.main.activatePin.offsetHeight + pinTail)
    };

    window.forms.addressInput.value = window.addressCoords.x + ' ' + window.addressCoords.y;
  };

  // Функция движения главного пина
  activatePin.addEventListener('mousedown', function (evt) {
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

      var nextX = activatePin.offsetLeft - shift.x + activatePin.offsetWidth / 2;
      var nextY = activatePin.offsetTop - shift.y + activatePin.offsetHeight + pinTail;

      var mapRect = map.getBoundingClientRect();

      if (nextX > 0 && nextX < mapRect.width && mapRect.x < moveEvt.clientX && moveEvt.clientX < mapRect.x + mapRect.width) {
        activatePin.style.left = (activatePin.offsetLeft - shift.x) + 'px';
      }
      if (nextY > 130 && nextY < 630 && nextY < mapRect.height && mapRect.y < moveEvt.clientY && moveEvt.clientY < mapRect.y + mapRect.height - 130) {
        activatePin.style.top = (activatePin.offsetTop - shift.y) + 'px';
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

  var pinActive = false;

  // Функция активации страницы
  window.pageActivate = function () {
    window.openPage();
    window.forms.form.classList.remove('ad-form--disabled');

    window.renderPins(window.ads);
    getPinCoords();
  };

  window.main.activatePin.addEventListener('mousedown', function () {
    getPinCoords();

    if (!pinActive) {
      window.pageActivate();
      pinActive = true;
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
