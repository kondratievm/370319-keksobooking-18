'use strict';

// Модуль forms.js
(function () {
  var sectionForm = document.querySelector('.notice');

  var sectionFieldset = sectionForm.querySelectorAll('fieldset');

  // Функция деактивации формы
  var checkDisabled = function () {
    for (var i = 0; i < sectionFieldset.length; i++) {
      sectionFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  checkDisabled();

  window.removeDisabled = function () {
    for (var i = 0; i < sectionFieldset.length; i++) {
      sectionFieldset[i].removeAttribute('disabled', 'disabled');
    }
  };

  var roomsCount = document.querySelector('#room_number');
  var placesCount = document.querySelector('#capacity');
  var placeNotForGuests = placesCount.querySelectorAll('option')[3];
  var capacityOptions = placesCount.options;

  // Функция деактивации селекта количества гостей
  var disableAllCapacityOptions = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].setAttribute('disabled', 'disabled');
    }
  };

  disableAllCapacityOptions();

  // Функция проверки соответствия комнта и гостей
  var changeOption = function () {
    for (var i = 0; i <= roomsCount.value - 1; i++) {
      if (roomsCount.value < 100) {
        capacityOptions[i].removeAttribute('disabled', 'disabled');
      } else if (roomsCount.value === 100 || i > 3) {
        placeNotForGuests.removeAttribute('disabled', 'disabled');
      }
    }
  };

  roomsCount.addEventListener('change', disableAllCapacityOptions);
  roomsCount.addEventListener('change', changeOption);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var changeTimeOption = function (valueA, valueB) {
    switch (true) {
      case (valueA.value === '12:00'): valueB.value = '12:00';
        break;
      case (valueA.value === '13:00'): valueB.value = '13:00';
        break;
      case (valueA.value === '14:00'): valueB.value = '14:00';
        break;
    }
    return true;
  };

  timeIn.addEventListener('change', function () {
    changeTimeOption(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    changeTimeOption(timeOut, timeIn);
  });
})();
