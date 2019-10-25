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
  window.getPinCoords = function () {

    window.addressCoords = {
      x: window.main.activatePin.getBoundingClientRect().x + window.main.activatePin.offsetWidth,
      y: window.main.activatePin.getBoundingClientRect().y + window.main.activatePin.offsetHeight + pinTail
    };

    window.forms.addressInput.value = window.addressCoords.x + ' ' + window.addressCoords.y;
  };

  activatePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.getPinCoords();

      var mapBlockCoords = {
        x: window.main.map.offsetWidth,
        y: window.main.map.offsetHeight
      };
      console.log(mapBlockCoords.x);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      console.log(window.addressCoords.x - 100);
      // console.log(shift.x);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.addressCoords.x - 100 < mapBlockCoords.x) {
        activatePin.style.left = (activatePin.offsetLeft - shift.x) + 'px';
      }
      // if (shift.y < mapBlockCoords.y) {
        activatePin.style.top = (activatePin.offsetTop - shift.y) + 'px';
      // }

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
    window.getPinCoords();
  };

  window.main.activatePin.addEventListener('mousedown', function () {
    window.getPinCoords();

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
