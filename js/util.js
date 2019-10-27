'use strict';

// Модуль util.js
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
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
})();
