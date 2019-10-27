'use strict';

// Модуль pins.js
(function () {
  var MAP_PINS = document.querySelector('.map__pins');

  // Функция вызова карточки по клику пина
  var pinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      window.closePopup();
      window.openPopupEnter();
      window.renderAds(card);
      window.closePopupEsc();
      window.closePopupHandler();
    });
  };

  // Функция отрисовки пинов
  window.renderPins = function (array) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var element = template.cloneNode(true);
      element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
      var pinImg = element.querySelector('img');
      pinImg.setAttribute('src', array[i].author.avatar);
      pinImg.setAttribute('alt', array[i].offer.title);
      fragment.appendChild(element);
      pinClickHandler(element, array[i]); // Вызов функции pinClickHandler
    }
    MAP_PINS.appendChild(fragment);
  };
})();
