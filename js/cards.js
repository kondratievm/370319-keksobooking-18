'use strict';

// Модуль cards.js
(function () {

  window.cards = {
  // Функция отрисовки фотографий
    renderPhotos: function (adPhoto, element) {
      var photoList = adPhoto.querySelector('.popup__photos');
      var photoTemplate = photoList.querySelector('.popup__photo');
      var photoElement = photoList.querySelector('.popup__photo');
      photoList.innerHTML = '';

      for (var i = 0; i < element.offer.photos.length; i++) {
        photoElement = photoTemplate.cloneNode(true);
        photoElement.setAttribute('src', element.offer.photos[i]);
        photoList.appendChild(photoElement);
      }
      adPhoto.appendChild(photoList);
    },

    // Функция наполнения карточки данными из объекта
    renderAd: function (adElement, element) {
      adElement.querySelector('.popup__avatar').src = element.author.avatar;
      adElement.querySelector('.popup__title').textContent = element.offer.title;
      adElement.querySelector('.popup__text--address').textContent = element.offer.address;
      adElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
      adElement.querySelector('.popup__type').textContent = window.util.translateOffer(element.offer.type);
      adElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
      adElement.querySelector('.popup__text--time').textContent = 'заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      adElement.querySelector('.popup__features').src = element.offer.features;
      adElement.querySelector('.popup__description').textContent = element.offer.description;
      window.cards.renderPhotos(adElement, element);
    },

    // Рендер карточки
    renderAds: function (element) {
      var adPlace = document.querySelector('.map__filters-container');
      var template = document.querySelector('#card').content.querySelector('.map__card');
      var fragment = document.createDocumentFragment();
      var ad = template.cloneNode(true);
      window.cards.renderAd(ad, element);
      fragment.appendChild(ad);

      adPlace.appendChild(fragment);
    },

    // Функция удаления карточки
    closePopup: function () {
      var pinCard = document.querySelector('.map__card');
      if (pinCard) {
        pinCard.remove();
      }
    }
  };

})();
