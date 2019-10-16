'use strict';

// Функция генерирования числа от min до max
var getRandomCount = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция получения рандомного числа
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Создаем массив фотографий
var createPhotoArr = function (min, max) {
  var photos = [];
  for (var i = 0; i < getRandomCount(min, max); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
};

var ENTER_KEYCODE = 13;
var MAP_PINS = document.querySelector('.map__pins');
var AD_COUNT = 8;
var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
var OFFER_TITLES = ['Отель Prince', 'Отель APA Asakusa Taharamachi Ekimae', 'Отель APA Hotel Shinagawa Sengakuji Eki-Mae'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Находится рядом с железнодорожным вокзалом Синагава, от которого можно за 25 минут доехать до аэропорта Ханэда.', 'Удобно расположен всего в 1 минуте ходьбы от станции метро Tawaramachi', 'расположен в 2 минутах ходьбы от станции метро Sengakuji', 'расположен в оживленном квартале Кабуки-тё, в 6 минутах ходьбы от железнодорожной станции Shinjuku'];
var OFFER_PHOTOS = createPhotoArr(1, 3);

// Создаем объект данных объявлений
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
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomCount(1, 5),
      guests: getRandomCount(1, 4),
      checkin: getRandomElement(OFFER_CHECKINS),
      checkout: getRandomElement(OFFER_CHECKOUTS),
      features: getRandomElement(OFFER_FEATURES),
      description: getRandomElement(OFFER_DESCRIPTIONS),
      photos: OFFER_PHOTOS
    };
    adsObject.location = {
      x: getRandomCount(0, window.outerWidth),
      y: getRandomCount(130, 630)
    };
    ads[i] = adsObject;
  }
  return ads;
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
var renderAds = function (elem) {
  var adPlace = document.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var element = template.cloneNode(true);
  renderAd(element, elem);
  fragment.appendChild(element);

  adPlace.appendChild(fragment);
};

// var closePopupHandler = function (pinCard, btnClose) {
//   btnClose.addEventListener('click', function () {
//     pinCard.classList.remove('map__card');
//     console.log('test')
//   });
// };

// Функция вызова карточки по клику пина
var pinClickHandler = function (pin, card) {
  pin.addEventListener('click', function () {
    renderAds(card);
  });
};

// Функция отрисовки пинов
var renderPins = function (array) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  // var pinCard = document.querySelectorAll('.map__card');
  // var btnClose = document.querySelectorAll('.popup__close');

  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
    var pinImg = element.querySelector('img');
    pinImg.setAttribute('src', array[i].author.avatar);
    pinImg.setAttribute('alt', array[i].offer.title);
    fragment.appendChild(element);
    pinClickHandler(element, array[i]); // Вызов функции pinClickHandler
    // closePopupHandler(pinCard, btnClose);
  }
  MAP_PINS.appendChild(fragment);
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

// Передаем в функцию createAds количество элементов
var ads = createAds(AD_COUNT);

var sectionForm = document.querySelector('.notice');
var sectionFieldset = sectionForm.querySelectorAll('fieldset');

// Функция деактивации формы
var checkDisabled = function () {
  for (var i = 0; i < sectionFieldset.length; i++) {
    sectionFieldset[i].setAttribute('disabled', 'disabled');
  }
};

checkDisabled();

// Функция активации формы
var removeDisabled = function () {
  for (var i = 0; i < sectionFieldset.length; i++) {
    sectionFieldset[i].removeAttribute('disabled', 'disabled');
  }
};

var activatePin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');

// Функция открытия страницы
var openPage = function () {
  map.classList.remove('map--faded');
};

// Функция получения координат главного пина
var getPinCoords = function () {
  var mainPinCoords = activatePin.getBoundingClientRect().x + ' ' + activatePin.getBoundingClientRect().y;

  addressInput.value = mainPinCoords;
};

// Функция активации страницы
var pageActivate = function () {
  openPage();
  form.classList.remove('ad-form--disabled');

  renderPins(ads);
  getPinCoords();
};

activatePin.addEventListener('mousedown', function () {
  pageActivate();
  removeDisabled();
});

activatePin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPage();
    pageActivate();
    removeDisabled();
  }
});

var roomsCount = document.querySelector('#room_number');
var placesCount = document.querySelector('#capacity');
var placeNotForGuests = placesCount.querySelectorAll('option')[3];
var capacityOptions = placesCount.options;

// Функция деактивации селекта количества гостей
var disableAllCapacityOptions = function () {
  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].setAttribute('disabled', 'disabled');
  }
};

disableAllCapacityOptions();

// Функция проверки соответствия комнта и гостей
var changeOption = function () {
  for (var i = 0; i <= roomsCount.value - 1; i++) {
    if (roomsCount.value < 100) {
      capacityOptions[i].removeAttribute('disabled', 'disabled');
    } else if (roomsCount.value === 100 || i > 3) {
      placeNotForGuests.removeAttribute('disabled', 'disabled');
    }
  }
};

roomsCount.addEventListener('change', disableAllCapacityOptions);
roomsCount.addEventListener('change', changeOption);
