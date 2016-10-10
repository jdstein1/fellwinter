/* CAROUSEL */

var carousel = document.getElementsByClassName("carousel")[0], 
  carouselList = document.getElementsByClassName("carousel-list")[0], 
  carouselItems = document.getElementsByClassName("carousel-item"), 
  carouselItemWidth = carousel.clientWidth;

console.log('carousel: ', carousel);
console.log('carousel: ', carousel.clientWidth);

console.log('carouselList: ', carouselList);
console.log('carouselList: ', carouselList.clientWidth);

console.log('carouselItems: ', carouselItems);
console.log('carouselItems: ', carouselItems[0].clientWidth);

/* AUTOMATICALLY SCROLL CAROUSEL */
var autoscroll = function () {
  console.log('START autoscroll');
};