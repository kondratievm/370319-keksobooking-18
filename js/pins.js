'use strict';

// Модуль pins.js
(function () {
  var mapPins = document.querySelector('.map__pins');

  // Функция открытия попапа по клавише Enter
  var openPopupEnter = function () {
    var openPin = document.querySelector('.map__pin');
    openPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.closePopup();
      }
    });
  };

  // Функция вызова карточки по клику пина
  var pinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      window.closePopup();
      openPopupEnter();
      window.renderAds(card);
      window.closePopupEsc();
      window.closePopupHandler();
      pin.classList.add('map__pin--active');
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
      var pinImage = element.querySelector('img');
      pinImage.setAttribute('src', data[i].author.avatar);
      pinImage.setAttribute('alt', data[i].offer.title);
      fragment.appendChild(element);
      pinClickHandler(element, data[i]); // Вызов функции pinClickHandler
    }
    mapPins.appendChild(fragment);
  };
})();
