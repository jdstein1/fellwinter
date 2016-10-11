/* CAROUSEL */

var carousel = document.getElementsByClassName("carousel")[0], 
  carouselList = document.getElementsByClassName("carousel-list")[0], 
  carouselItems = document.getElementsByClassName("carousel-item"), 
  scrollControl = document.getElementById("scrollControl"), 
  carouselItemWidth = carousel.clientWidth, 
  carouselListWidth = carouselList.clientWidth;

console.log('carousel: ', carousel);
console.log('carouselItemWidth: ', carouselItemWidth);

console.log('carouselList: ', carouselList);
console.log('carouselListWidth: ', carouselListWidth);

console.log('carouselItems: ', carouselItems);


/* AUTOMATICALLY SCROLL CAROUSEL */

var intervalID, 
  scrollingFlag = false;

var autoScroll = function () {
  console.log('START autoScroll');
  intervalID = window.setInterval(doScroll, 1000);
};

function doScroll() {
  console.log('START doScroll: '+carousel.scrollLeft);
  scrollingFlag = true;
  if (carousel.scrollLeft >= (carouselListWidth-carouselItemWidth)) {
    carousel.scrollLeft = 0;
  } else {
    carousel.scrollLeft += carouselItemWidth;
  }
}

function stopScroll() {
  console.log('START stopScroll');
  if (scrollingFlag === true) {
    scrollControl.innerHTML = "Resume";
    window.clearInterval(intervalID);
    scrollingFlag = false;
  } else {
    scrollControl.innerHTML = "Stop Again";
    autoScroll();
  }
}

// window.setTimeout(function() {
//     alert("Hello World!");
// }, 500);

