'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomInts = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var MAP_PINS = document.querySelector('.map__pins');
var AD_COUNT = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = getRandomInt(1, 5);
var OFFER_GUESTS = getRandomInt(1, 4);
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTION = 'Some description text';
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var createAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    var adsObject = {};
    adsObject.autor = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };
    adsObject.offer = {
      title: '600, 350',
      price: 1000,
      type: OFFER_TYPES[getRandomInts(OFFER_TYPES.length)],
      rooms: OFFER_ROOMS,
      guests: OFFER_GUESTS,
      checkin: OFFER_CHECKINS[getRandomInts(OFFER_CHECKINS.length)],
      features: OFFER_FEATURES[getRandomElement(OFFER_FEATURES.length)],
      description: OFFER_DESCRIPTION,
      photos: OFFER_PHOTOS[getRandomElement(OFFER_PHOTOS.length)]
    };
    adsObject.location = {
      x: getRandomInt(0, window.outerWidth),
      y: getRandomInt(130, 630)
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
    pinImg.setAttribute('src', array[i].autor.avatar);
    pinImg.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  MAP_PINS.appendChild(fragment);
};

renderElements(createAds(AD_COUNT));
