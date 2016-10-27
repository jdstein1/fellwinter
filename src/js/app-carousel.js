/* CAROUSEL FUNCTIONS */

/* @license */

var carousel = document.getElementsByClassName("carousel")[0], 
  carouselList = document.getElementsByClassName("carousel-list")[0], 
  carouselListItems = document.getElementsByClassName("carousel-item"), 
  carouselNav = document.getElementsByClassName("carousel-nav")[0], 
  carouselNavDots = document.getElementsByClassName("carousel-dot"), 
  scrollControl1 = document.getElementById("scrollControl1"), 
  scrollControl2 = document.getElementById("scrollControl2"), 
  carouselIndex = 0;
  carouselLength = carouselListItems.length;

// console.log('carousel: ', carousel);
// console.log('carouselItemWidth: ', carouselItemWidth);
// console.log('carouselLength: ', carouselLength);

// console.log('carouselList: ', carouselList);
// console.log('carouselListWidth: ', carouselListWidth);

// console.log('carouselListItems: ', carouselListItems);

/* AUTOMATICALLY SCROLL CAROUSEL */

var intervalID, 
  scrollingFlag = false;

function autoScroll () {
  // console.log('START autoScroll');
  carouselNavDots[0].classList.add("active");
  // set up an interval
  intervalID = window.setInterval(doScroll, 2000);
}

// start automatically scrolling
function doScroll() {
  // console.log('START doScroll: '+carousel.scrollLeft);
  // set flag to true to indicate autoscrolling has started.
  scrollingFlag = true;
  for (var i = 0; i < carouselNavDots.length; i++) {
    carouselNavDots[i].classList.remove("active");
  }
  // check if left offset is greater than or equal to width of whole 
  // carousel minus width of one item...
  if (carousel.scrollLeft >= (carouselListWidth-carouselItemWidth)) {
    // scroll to the first item (left offset 0)
    carousel.scrollLeft = 0;
    carouselIndex = 0;
  } else {
    // scroll to next one by adding item width to left offset
    carousel.scrollLeft += carouselItemWidth;
    carouselIndex++;
  }
  carouselNavDots[carouselIndex].classList.add("active");
}

// rause/resume automatically scrolling
function scrollControl() {
  // console.log('START scrollControl');
  if (scrollingFlag === true) {
    // alter text of control button.
    scrollControl1.disabled = true;
    scrollControl2.disabled = false;
    window.clearInterval(intervalID);
    // set flag to false to indicate autoscrolling has stopped.
    scrollingFlag = false;
  } else {
    // alter text of control button.
    scrollControl1.disabled = false;
    scrollControl2.disabled = true;
    // get the autoscroll interval going again.
    scrollingFlag = true;
    autoScroll();
  }
}

// window.setTimeout(function() {
//     alert("Hello World!");
// }, 500);

/* MANUALLY SCROLL CAROUSEL */

/* HANDLE WINDOW RESIZING */

function resizeWindow () { 
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  carouselItemWidth = carousel.clientWidth;
  carouselListWidth = carouselList.clientWidth;
  // carousel.scrollLeft = 0;
}
resizeWindow();
window.onresize = resizeWindow;
