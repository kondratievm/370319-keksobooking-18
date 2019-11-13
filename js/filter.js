'use strict';

// Модуль pins.js
(function () {

  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function () {

    for (var i = 0; i < window.pins.length; i++) {
      if (!window.pins[i].classList.contains('map__pin--main')) {
        window.pins[i].remove();
      }
    }

    var filteredAds = window.ads.filter(function (element) {
      return element.offer.type === housingType.value;
    });

    window.renderPins(filteredAds.slice(0, 5));
  });
})();
