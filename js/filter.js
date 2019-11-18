'use strict';

// Модуль filter.js
(function () {
  var MIN_OFFER_PRICE = 10000;
  var MAX_OFFER_PRICE = 50000;
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

  window.filter = {
    isRemovedPins: function () {
      var renderPins = document.querySelectorAll('.map__pin');
      for (var i = 0; i < renderPins.length; i++) {
        if (!renderPins[i].classList.contains('map__pin--main')) {
          renderPins[i].remove();
        }
      }
    },
    debounce: function (cb) {
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
    }
  };

  var isFilteredType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    }
    return pin.offer.type === housingType.value;
  };

  var isFilteredPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < MIN_OFFER_PRICE;
      case 'high':
        return pin.offer.price > MAX_OFFER_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_OFFER_PRICE && pin.offer.price <= MAX_OFFER_PRICE;
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

  var isFilteredAds = function () {
    window.filteredAds = window.ads.filter(function (pin) {
      return isFilteredType(pin)
          && isFilteredPrice(pin)
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

  var onDebounce = window.filter.debounce(function () {
    window.util.removeActiveClass();
    window.filter.isRemovedPins();
    isFilteredAds();
    window.cards.closePopup();
    window.renderPins(window.filteredAds.slice(0, 5));
  });

  housingType.addEventListener('change', onDebounce);

  housingPrice.addEventListener('change', onDebounce);

  housingRoom.addEventListener('change', onDebounce);

  housingGuest.addEventListener('change', onDebounce);

  housingFeatures.addEventListener('change', onDebounce);
})();
