'use strict';

// Модуль ads.js
(function () {
  var AD_COUNT = 8;

  // Создаем массив фотографий
  var createPhotoArr = function (min, max) {
    var photos = [];
    for (var i = 0; i < window.getRandomCount(min, max); i++) {
      photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }
    return photos;
  };

  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var OFFER_TITLES = ['Отель Prince', 'Отель APA Asakusa Taharamachi Ekimae', 'Отель APA Hotel Shinagawa Sengakuji Eki-Mae'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = ['Находится рядом с железнодорожным вокзалом Синагава, от которого можно за 25 минут доехать до аэропорта Ханэда.', 'Удобно расположен всего в 1 минуте ходьбы от станции метро Tawaramachi', 'расположен в 2 минутах ходьбы от станции метро Sengakuji', 'расположен в оживленном квартале Кабуки-тё, в 6 минутах ходьбы от железнодорожной станции Shinjuku'];
  var OFFER_PHOTOS = createPhotoArr(1, 3);

  // Создаем объект данных объявлений
  window.createAds = function (count) {
    var ads = [];
    for (var i = 0; i < count; i++) {
      var adsObject = {};
      adsObject.author = {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      };
      adsObject.offer = {
        title: window.getRandomElement(OFFER_TITLES),
        price: window.getRandomCount(10, 75) * 100,
        type: window.getRandomElement(OFFER_TYPES),
        rooms: window.getRandomCount(1, 5),
        guests: window.getRandomCount(1, 4),
        checkin: window.getRandomElement(OFFER_CHECKINS),
        checkout: window.getRandomElement(OFFER_CHECKOUTS),
        features: window.getRandomElement(OFFER_FEATURES),
        description: window.getRandomElement(OFFER_DESCRIPTIONS),
        photos: OFFER_PHOTOS
      };
      adsObject.location = {
        x: window.getRandomCount(0, window.outerWidth),
        y: window.getRandomCount(130, 630)
      };
      ads[i] = adsObject;
    }
    return ads;
  };

  // Функция отрисовки фотографий
  var renderPhotos = function (adPhoto) {
    var photoList = adPhoto.querySelector('.popup__photos');
    var photoTemplate = photoList.querySelector('.popup__photo');
    photoList.innerHTML = '';

    for (var i = 0; i < OFFER_PHOTOS.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.setAttribute('src', OFFER_PHOTOS[i]);
      photoList.appendChild(photoElement);
    }
    adPhoto.appendChild(photoList);
  };

  // Функция сравнения названий
  var offerTranslatter = function (type) {
    switch (type) {
      case 'flat': type = 'Квартира';
        break;
      case 'bungalo': type = 'Бунгало';
        break;
      case 'house': type = 'Дом';
        break;
      case 'palace': type = 'Дворец';
        break;
    }
    return type;
  };

  // Функция наполнения карточки данными из объекта
  var renderAd = function (adElement, element) {
    adElement.querySelector('.popup__avatar').src = element.author.avatar;
    adElement.querySelector('.popup__title').textContent = element.offer.title;
    adElement.querySelector('.popup__text--address').textContent = element.offer.address;
    adElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = offerTranslatter(element.offer.type);
    adElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    adElement.querySelector('.popup__features').textContent = element.offer.features;
    adElement.querySelector('.popup__description').textContent = element.offer.description;
    renderPhotos(adElement);
  };

  // Рендер карточки
  window.renderAds = function (elem) {
    var adPlace = document.querySelector('.map__filters-container');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);
    renderAd(element, elem);
    fragment.appendChild(element);

    adPlace.appendChild(fragment);
  };

  // Передаем в функцию createAds количество элементов
  window.ads = window.createAds(AD_COUNT);
})();
