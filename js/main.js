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

var getRandomLength = function (items) {
  return items[~~(items.length * Math.random())];
};

var PIN_IMG = document.querySelector('.map__pin > img');
var MAP_PINS = document.querySelector('.map__pins');
var AD_COUNT = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = getRandomCount(1, 5);
var OFFER_GUESTS = getRandomCount(1, 4);
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
      type: OFFER_TYPES[getRandomInt(OFFER_TYPES.length)],
      rooms: OFFER_ROOMS,
      guests: OFFER_GUESTS,
      checkin: OFFER_CHECKINS[getRandomInt(OFFER_CHECKINS.length)],
      features: OFFER_FEATURES[getRandomLength(OFFER_FEATURES.length)],
      description: OFFER_DESCRIPTION,
      photos: OFFER_PHOTOS[getRandomLength(OFFER_PHOTOS.length)]
    };
    adsObject.location = {
      x: getRandomCount(0, window.outerWidth),
      y: getRandomCount(130, 630)
    };
    ads[i] = adsObject;
  }
  return ads;
};

var renderElement = function (array) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    PIN_IMG.setAttribute('src', array[i].autor.avatar);
    PIN_IMG.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
  }
  MAP_PINS.appendChild(fragment);
};

renderElement(createAds(AD_COUNT));
