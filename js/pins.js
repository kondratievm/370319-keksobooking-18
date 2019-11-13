'use strict';

// Модуль pins.js
(function () {
  window.MAP_PINS = document.querySelector('.map__pins');

  // Функция открытия попапа по клавише Enter
  window.openPopupEnter = function () {
    var openPin = document.querySelector('.map__pin');
    openPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.closePopup();
      }
    });
  };

  // Функция вызова карточки по клику пина
  window.pinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      window.closePopup();
      window.openPopupEnter();
      window.renderAds(card);
      window.closePopupEsc();
      window.closePopupHandler();
    });
  };

  // Функция отрисовки пинов

  window.renderPins = function (data) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > 5 ? 5 : data.length;

    for (var i = 0; i < takeNumber; i++) {
      var element = template.cloneNode(true);
      element.setAttribute('style', 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;');
      var pinImg = element.querySelector('img');
      pinImg.setAttribute('src', data[i].author.avatar);
      pinImg.setAttribute('alt', data[i].offer.title);
      fragment.appendChild(element);
      window.pinClickHandler(element, data[i]); // Вызов функции pinClickHandler
    }
    window.MAP_PINS.appendChild(fragment);
  };

})();
