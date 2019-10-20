'use strict';

// Модуль forms.js
(function () {
  window.sectionForm = document.querySelector('.notice');
  window.sectionFieldset = window.sectionForm.querySelectorAll('fieldset');

  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var roomsCount = document.querySelector('#room_number');
  var placesCount = document.querySelector('#capacity');
  var placeNotForGuests = placesCount.querySelectorAll('option')[3];
  var capacityOptions = placesCount.options;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  window.forms = {
    addressInput: addressInput,
    form: form,
    roomsCount: roomsCount,
    placesCount: placesCount,
    placeNotForGuests: placeNotForGuests,
    capacityOptions: capacityOptions,
    timeIn: timeIn,
    timeOut: timeOut
  };

  // Функция деактивации формы
  window.checkDisabled = function () {
    for (var i = 0; i < window.sectionFieldset.length; i++) {
      window.sectionFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  // Функция активации формы
  window.removeDisabled = function () {
    for (var i = 0; i < window.sectionFieldset.length; i++) {
      window.sectionFieldset[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция деактивации селекта количества гостей
  var disableAllCapacityOptions = function () {
    for (var i = 0; i < window.forms.capacityOptions.length; i++) {
      window.forms.capacityOptions[i].setAttribute('disabled', 'disabled');
    }
  };

  disableAllCapacityOptions();

  // Функция проверки соответствия комнта и гостей
  var changeOption = function () {
    for (var i = 0; i <= window.forms.roomsCount.value - 1; i++) {
      if (window.forms.roomsCount.value < 100) {
        window.forms.capacityOptions[i].removeAttribute('disabled', 'disabled');
      } else if (window.forms.roomsCount.value === 100 || i > 3) {
        window.forms.placeNotForGuests.removeAttribute('disabled', 'disabled');
      }
    }
  };

  window.forms.roomsCount.addEventListener('change', disableAllCapacityOptions);
  window.forms.roomsCount.addEventListener('change', changeOption);

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

  window.forms.timeIn.addEventListener('change', function () {
    changeTimeOption(timeIn, timeOut);
  });

  window.forms.timeOut.addEventListener('change', function () {
    changeTimeOption(timeOut, timeIn);
  });
})();
