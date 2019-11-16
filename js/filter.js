'use strict';

// Модуль filter.js
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var wifi = housingFeatures.querySelector('#filter-wifi');
  var dishwasher = housingFeatures.querySelector('#filter-dishwasher');
  var parking = housingFeatures.querySelector('#filter-parking');
  var washer = housingFeatures.querySelector('#filter-washer');
  var elevator = housingFeatures.querySelector('#filter-elevator');
  var conditioner = housingFeatures.querySelector('#filter-conditioner');

  var removedPins = function () {
    var renderPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < renderPins.length; i++) {
      if (!renderPins[i].classList.contains('map__pin--main')) {
        renderPins[i].remove();
      }
    }
  };

  var filteredType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    }
    return pin.offer.type === housingType.value;
  };

  var filteredPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < 10000;
      case 'high':
        return pin.offer.price > 50000;
      case 'middle':
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      default:
        return true;
    }
  };

  var filteredRoom = function (pin) {
    if (housingRoom.value === 'any') {
      return true;
    }
    return pin.offer.rooms === +housingRoom.value;
  };

  var filteredGuests = function (pin) {
    if (housingGuest.value === 'any') {
      return true;
    }
    return pin.offer.guests === +housingGuest.value;
  };

  var filteredFeature = function (pin, feature) {
    if (feature.checked) {
      return pin.offer.features.includes(feature.value);
    }
    return true;
  };

  var getFilteredAds = function () {
    window.filteredAds = window.ads.filter(function (pin) {
      return filteredType(pin)
          && filteredPrice(pin)
          && filteredRoom(pin)
          && filteredGuests(pin)
          && filteredFeature(pin, wifi)
          && filteredFeature(pin, dishwasher)
          && filteredFeature(pin, parking)
          && filteredFeature(pin, washer)
          && filteredFeature(pin, elevator)
          && filteredFeature(pin, conditioner);
    });
  };

  housingType.addEventListener('change', function () {
    onDebounce();
  });

  housingPrice.addEventListener('change', function () {
    onDebounce();
  });

  housingRoom.addEventListener('change', function () {
    onDebounce();
  });

  housingGuest.addEventListener('change', function () {
    onDebounce();
  });

  housingFeatures.addEventListener('change', function () {
    onDebounce();
  });

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onDebounce = window.debounce(function () {
    removedPins();
    getFilteredAds();
    window.closePopup();
    window.renderPins(window.filteredAds.slice(0, 5));
  });
})();
