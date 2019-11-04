'use strict';

// Модуль cards.js
(function () {
  var OFFER_PHOTOS = window.createPhotoArr(1, 3);

  window.cards = {
    OFFER_PHOTOS: OFFER_PHOTOS
  };

  // Функция наполнения карточки данными из объекта
  window.renderAd = function (adElement, element) {
    adElement.querySelector('.popup__avatar').src = element.author.avatar;
    adElement.querySelector('.popup__title').textContent = element.offer.title;
    adElement.querySelector('.popup__text--address').textContent = element.offer.address;
    adElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = window.offerTranslatter(element.offer.type);
    adElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    adElement.querySelector('.popup__features').textContent = element.offer.features;
    adElement.querySelector('.popup__description').textContent = element.offer.description;
    window.renderPhotos(adElement);
  };

  // Рендер карточки
  window.renderAds = function (elem) {
    var adPlace = document.querySelector('.map__filters-container');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);
    window.renderAd(element, elem);
    fragment.appendChild(element);

    adPlace.appendChild(fragment);
  };

  // Функция удаления карточки
  window.closePopup = function () {
    var pinCard = document.querySelector('.map__card');
    if (pinCard) {
      pinCard.remove();
    }
  };
})();
