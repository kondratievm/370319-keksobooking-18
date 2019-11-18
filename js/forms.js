'use strict';

// Модуль forms.js
(function () {
  var BUNGALO_PRICE = 0;
  var FLAT_PRICE = 1000;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;
  var MAX_ROOMS_COUNT = 100;
  var THREE_ROOMS_COUNT = 3;
  var MAIN_PIN_LEFT_COORD = 570;
  var MAIN_PIN_TOP_COORD = 375;
  var sectionForm = document.querySelector('.notice');
  var sectionFieldsets = sectionForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var mapFiltres = document.querySelectorAll('.map__filter');
  var mapFiltresCheckboxs = document.querySelectorAll('.map__checkbox');
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var roomsCount = document.querySelector('#room_number');
  var placesCount = document.querySelector('#capacity');
  var placeNotForGuests = placesCount.querySelectorAll('option')[3];
  var capacityOptions = placesCount.options;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  window.forms = {
    addressInput: addressInput,
    form: form,
  };

  // Функция деактивации фильтров
  var checkDisabledFiltres = function () {
    for (var i = 0; i < mapFiltres.length; i++) {
      mapFiltres[i].setAttribute('disabled', 'disabled');
    }
  };

  checkDisabledFiltres();

  // Функция активации фильтров
  window.removeDisabledFiltres = function () {
    for (var i = 0; i < mapFiltres.length; i++) {
      mapFiltres[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция деактивации фильтров чекбоксов
  var checkDisabledFiltrCheckboxes = function () {
    for (var i = 0; i < mapFiltresCheckboxs.length; i++) {
      mapFiltresCheckboxs[i].setAttribute('disabled', 'disabled');
    }
  };

  checkDisabledFiltrCheckboxes();

  // Функция активации фильтров чекбоксов
  window.removeDisabledFiltrCheckboxes = function () {
    for (var i = 0; i < mapFiltresCheckboxs.length; i++) {
      mapFiltresCheckboxs[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция деактивации формы
  var checkDisabled = function () {
    for (var i = 0; i < sectionFieldsets.length; i++) {
      sectionFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  checkDisabled();

  // Функция активации формы
  window.removeDisabled = function () {
    for (var i = 0; i < sectionFieldsets.length; i++) {
      sectionFieldsets[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция деактивации селекта количества гостей
  var onDisableAllCapacityOptions = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].setAttribute('disabled', 'disabled');
    }
  };

  // Функция проверки соответствия комнат и гостей
  var onChangeOption = function () {
    for (var i = 0; i <= roomsCount.value - 1; i++) {
      if (roomsCount.value < MAX_ROOMS_COUNT) {
        capacityOptions[i].removeAttribute('disabled', 'disabled');
      } else if (roomsCount.value === MAX_ROOMS_COUNT || i > THREE_ROOMS_COUNT) {
        placeNotForGuests.removeAttribute('disabled', 'disabled');
      }
    }
  };

  roomsCount.addEventListener('change', onDisableAllCapacityOptions);
  roomsCount.addEventListener('change', onChangeOption);

  var changeTimeOption = function (timeBefore, timeAfter) {
    timeAfter.value = timeBefore.value;
  };

  timeIn.addEventListener('change', function () {
    changeTimeOption(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    changeTimeOption(timeOut, timeIn);
  });

  // Функция изменения цены
  var changePrice = function (typeValue, priceValue) {
    switch (typeValue.value) {
      case ('bungalo'):
        priceValue.value = '0';
        priceValue.setAttribute('min', BUNGALO_PRICE);
        break;
      case ('flat'):
        priceValue.value = '1000';
        priceValue.setAttribute('min', FLAT_PRICE);
        break;
      case ('house'):
        priceValue.value = '5000';
        priceValue.setAttribute('min', HOUSE_PRICE);
        break;
      case ('palace'):
        priceValue.value = '10000';
        priceValue.setAttribute('min', PALACE_PRICE);
        break;
    }
  };

  changePrice(type, price);

  type.addEventListener('change', function () {
    changePrice(type, price);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccess, onError);
  });

  // Функция сброса формы
  var resetForm = function () {
    window.forms.form.classList.add('ad-form--disabled');
    window.forms.form.setAttribute('disabled', 'disabled');
    window.forms.form.reset();
    filterForm.reset();
    window.main.activatePin.style.left = MAIN_PIN_LEFT_COORD + 'px';
    window.main.activatePin.style.top = MAIN_PIN_TOP_COORD + 'px';

    window.main.map.classList.add('map--faded');
    window.closePopup();

    window.pinActive = false;

    window.isRemovedPins();
    checkDisabledFiltres();
    checkDisabledFiltrCheckboxes();
    checkDisabled();
  };

  var buttonReset = document.querySelector('.ad-form__reset');

  buttonReset.addEventListener('click', function () {
    resetForm();
  });

  var onSuccess = function () {
    resetForm();

    var successPlace = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment();
    var element = successTemplate.cloneNode(true);
    fragment.appendChild(element);
    successPlace.appendChild(fragment);

    var onMessageEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        element.remove();
        document.removeEventListener('keydown', onMessageEscPress);
      }
    };

    document.addEventListener('keydown', onMessageEscPress);

    document.addEventListener('click', function () {
      element.remove();
    });
  };

  var onError = function () {
    window.errorMessageShowing();

    var reloadButton = document.querySelector('.error__button');

    var onReloadButton = function (evt) {
      evt.preventDefault();
      window.errorMessage.remove();
      reloadButton.removeEventListener('click', onReloadButton);
    };

    reloadButton.addEventListener('click', onReloadButton);

    var onMessageEscPressWindowElement = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.element.remove();
        document.removeEventListener('keydown', onMessageEscPressWindowElement);
      }
    };

    document.addEventListener('keydown', onMessageEscPressWindowElement);

    document.addEventListener('click', function () {
      window.element.remove();
    });
  };
})();
