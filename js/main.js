'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomCount = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var MAP_PINS = document.querySelector('.map__pins');
var AD_COUNT = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPES_TRANSLATE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var OFFER_TITLES = ['Отель Prince', 'Отель APA Asakusa Taharamachi Ekimae', 'Отель APA Hotel Shinagawa Sengakuji Eki-Mae'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Находится рядом с железнодорожным вокзалом Синагава, от которого можно за 25 минут доехать до аэропорта Ханэда.', 'Удобно расположен всего в 1 минуте ходьбы от станции метро Tawaramachi', 'расположен в 2 минутах ходьбы от станции метро Sengakuji', 'расположен в оживленном квартале Кабуки-тё, в 6 минутах ходьбы от железнодорожной станции Shinjuku'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getTranslate = function () {
  var translateType = [];

  for (var i = 0; i < OFFER_TYPES.length; i++) {
    var typesIndex = OFFER_TYPES[i];
    var type = OFFER_TYPES_TRANSLATE[typesIndex];
    translateType += type;
  }
  return translateType;
};

var createAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    var adsObject = {};
    adsObject.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };
    adsObject.offer = {
      title: getRandomElement(OFFER_TITLES),
      price: getRandomCount(10, 75) * 100,
      // type: OFFER_TYPES[getRandomInt(OFFER_TYPES.length)],
      type: getTranslate(),
      rooms: getRandomCount(1, 5),
      guests: getRandomCount(1, 4),
      checkin: OFFER_CHECKINS[getRandomInt(OFFER_CHECKINS.length)],
      features: getRandomElement(OFFER_FEATURES),
      description: getRandomElement(OFFER_DESCRIPTIONS),
      photos: getRandomElement(OFFER_PHOTOS.length)
    };
    adsObject.location = {
      x: getRandomCount(0, window.outerWidth),
      y: getRandomCount(130, 630)
    };
    ads[i] = adsObject;
  }
  return ads;
};

var pinImg = document.querySelector('.map__pin > img');

var renderElements = function (array) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    pinImg.setAttribute('src', array[i].author.avatar);
    pinImg.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  MAP_PINS.appendChild(fragment);
};

var renderAd = function (adElement, element) {
  adElement.querySelector('.popup__title').textContent = element.offer.title;
  adElement.querySelector('.popup__text--address').textContent = element.offer.address;
  adElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = element.offer.type;
  adElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = element.offer.checkin + 'заезд после' + element.offer.checkout + 'выезд до';
  adElement.querySelector('.popup__features').textContent = element.offer.features;
  adElement.querySelector('.popup__description').textContent = element.offer.description;
  adElement.querySelector('.popup__photos > img').src = element.offer.photos;
  adElement.querySelector('.popup__avatar').src = element.author.avatar;
};

var renderAds = function (array) {
  var adPlace = document.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    renderAd(element, array[i]);
    fragment.appendChild(element);
  }
  adPlace.appendChild(fragment);
};


renderAds(createAds(AD_COUNT));
renderElements(createAds(AD_COUNT));
