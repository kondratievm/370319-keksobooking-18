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

  // Функция проверки соответствия комнат и гостей
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccess, onError);
  });

  var onSuccess = function () {
    window.forms.form.classList.add('ad-form--disabled');
    window.forms.form.reset();

    for (var i = 0; i < window.pins.length; i++) {
      if (!window.pins[i].classList.contains('map__pin--main')) {
        window.pins[i].remove();
      }
    }

    window.activatePin.style.left = 570 + 'px';
    window.activatePin.style.top = 375 + 'px';

    window.main.map.classList.add('map--faded');
    window.closePopup();

    window.pinActive = false;

    var successPlace = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment();
    var element = successTemplate.cloneNode(true);
    fragment.appendChild(element);
    successPlace.appendChild(fragment);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        element.remove();
      }
    });

    document.addEventListener('click', function () {
      element.remove();
    });
  };

  var onError = function () {
    window.errorMessageShowing();

    var reloadButton = document.querySelector('.error__button');

    var reloadButtonHandler = function (evt) {
      evt.preventDefault();
      window.errorMessage.remove();
      reloadButton.removeEventListener('click', reloadButtonHandler);
    };

    reloadButton.addEventListener('click', reloadButtonHandler);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.element.remove();
      }
    });

    document.addEventListener('click', function () {
      window.element.remove();
    });

  };

})();
