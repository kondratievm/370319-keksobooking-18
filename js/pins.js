'use strict';

// Модуль pins.js
(function () {
  var MAX_PIN_COUNT = 5;
  var mapPins = document.querySelector('.map__pins');

  // Функция открытия попапа по клавише Enter
  var openPopupEnter = function () {
    var openPin = document.querySelector('.map__pin');

    openPin.addEventListener('keydown', onPopupPressEnter);

    var onPopupPressEnter = function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.closePopup();
        openPin.removeEventListener('keydown', onPopupPressEnter);
      }
    };
  };

  // Функция вызова карточки по клику пина
  var addClickListenerToPin = function (pin, card) {
    pin.addEventListener('click', function () {
      window.closePopup();
      openPopupEnter();
      window.renderAds(card);
      window.closePopupEsc();
      window.closePopupHandler();
      window.removeActiveClass();
      pin.classList.add('map__pin--active');
    });
  };

  // Функция отрисовки пинов
  window.renderPins = function (data) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : data.length;

    for (var i = 0; i < takeNumber; i++) {
      var element = template.cloneNode(true);
      element.setAttribute('style', 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;');
      var pinImage = element.querySelector('img');
      pinImage.setAttribute('src', data[i].author.avatar);
      pinImage.setAttribute('alt', data[i].offer.title);
      fragment.appendChild(element);
      addClickListenerToPin(element, data[i]); // Вызов функции pinClickHandler
    }
    mapPins.appendChild(fragment);
  };
})();
