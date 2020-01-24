'use strict';
var bodyPage = document.querySelector('body');

var sectionContact = bodyPage.querySelector('.contact');
if (sectionContact) {
  var formInputPhone = sectionContact.querySelector('#user-phone');
}

var sectionPrime = bodyPage.querySelector('.prime');
if (sectionPrime) {
  var btnPrimeBuySubscription = sectionPrime.querySelector('.btn--buy');
}

var sectionSubscription = bodyPage.querySelector('.subscription');

// прокрутка к блоку абонементы

btnPrimeBuySubscription.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (sectionSubscription) {
    sectionSubscription.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});

// маска телефона

window.addEventListener('DOMContentLoaded', function () {
  formInputPhone.addEventListener('input', window.vendor.maskPhone, false);
  formInputPhone.addEventListener('focus', window.vendor.maskPhone, false);
  formInputPhone.addEventListener('blur', window.vendor.maskPhone, false);
});

// Код слайдера

var multiItemSlider = (function () {

  return function (selector, counter) {

    var mainElement = document.querySelector(selector); // основный элемент блока
    var sliderWrapper = mainElement.querySelector('.slider-wrapper'); // обертка для .slider-item
    var sliderItems = mainElement.querySelectorAll('.slider-item'); // элементы (.slider-item)
    var sliderControls = mainElement.querySelectorAll('.slider-control'); // элементы управления
    var wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width); // ширина обёртки
    var itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    var positionLeftItem = 0; // позиция левого активного элемента
    var transform = 0; // значение транфсофрмации .slider_wrapper
    var step = itemWidth / wrapperWidth * 100; // величина шага (для трансформации)
    var items = []; // массив элементов
    var slideCounter = counter; // количество прокручиваемых слайдов

    // наполнение массива _items
    for (var i = 0; i < sliderItems.length; i++) {
      items.push({
        item: sliderItems[i],
        position: i,
        transform: 0
      });
    }

    var position = {
      getItemMin: function () {
        var indexItem = 0;

        for (var j = 0; j < items.length; j++) {
          if (items[j].position < items[indexItem].position) {
            indexItem = j;
          }
        }
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;

        for (var j = 0; j < items.length; j++) {
          if (items[j].position > items[indexItem].position) {
            indexItem = j;
          }
        }
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    };

    var transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform -= step;
      }
      if (direction === 'left') {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (e) {
      if (e.target.classList.contains('slider-control')) {
        e.preventDefault();
        if (slideCounter) {
          var direction = e.target.classList.contains('slider-control-right') ? 'right' : 'left';
          for (var b = 0; b < slideCounter; b++) {
            transformItem(direction);
          }
        }
      }
    };

    // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
    var setUpListeners = function () {
      for (var a = 0; a < sliderControls.length; a++) {
        sliderControls[a].addEventListener('click', controlClick);
      }
    };

    // инициализация
    setUpListeners();
    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    };

  };
}());

multiItemSlider('#slider-trainer', 4);
multiItemSlider('#slider-recall', 1);
