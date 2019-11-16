'use strict';

// Модуль forms.js
(function () {
  var sectionForm = document.querySelector('.notice');
  var sectionFieldset = sectionForm.querySelectorAll('fieldset');
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
    placesCount: placesCount,
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
    for (var i = 0; i < sectionFieldset.length; i++) {
      sectionFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  checkDisabled();

  // Функция активации формы
  window.removeDisabled = function () {
    for (var i = 0; i < sectionFieldset.length; i++) {
      sectionFieldset[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция деактивации селекта количества гостей
  var disableAllCapacityOptions = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].setAttribute('disabled', 'disabled');
    }
  };

  // Функция проверки соответствия комнат и гостей
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
        priceValue.setAttribute('min', 0);
        break;
      case ('flat'):
        priceValue.value = '1000';
        priceValue.setAttribute('min', 1000);
        break;
      case ('house'):
        priceValue.value = '5000';
        priceValue.setAttribute('min', 5000);
        break;
      case ('palace'):
        priceValue.value = '10000';
        priceValue.setAttribute('min', 10000);
        break;
    }
  };

  type.addEventListener('change', function () {
    changePrice(type, price);
  });

  price.addEventListener('change', function () {
    changePrice(price, type);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccess, onError);
  });

  var buttonReset = document.querySelector('.ad-form__reset');

  // Функция сброса формы
  buttonReset.addEventListener('click', function () {
    window.forms.form.reset();
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
