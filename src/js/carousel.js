/* CAROUSEL */

var carousel = document.getElementsByClassName("carousel")[0], 
  carouselList = document.getElementsByClassName("carousel-list")[0], 
  carouselListItems = document.getElementsByClassName("carousel-item"), 
  carouselNav = document.getElementsByClassName("carousel-nav")[0], 
  carouselNavDots = document.getElementsByClassName("carousel-dot"), 
  scrollControl = document.getElementById("scrollControl"), 
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

var autoScroll = function () {
  // console.log('START autoScroll');
  carouselNavDots[0].classList.add("active");
  // set up an interval
  intervalID = window.setInterval(doScroll, 2000);
};

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

// stop automatically scrolling
function stopScroll() {
  // console.log('START stopScroll');
  if (scrollingFlag === true) {
    // alter text of control button.
    scrollControl.innerHTML = "Resume";
    window.clearInterval(intervalID);
    // set flag to false to indicate autoscrolling has stopped.
    scrollingFlag = false;
  } else {
    // alter text of control button.
    scrollControl.innerHTML = "Stop Again";
    // get the autoscroll interval going again.
    autoScroll();
  }
}

// window.setTimeout(function() {
//     alert("Hello World!");
// }, 500);

/* MANUALLY SCROLL CAROUSEL */

/* HANDLE WINDOW RESIZING */

var resizeWindow = function () { 
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  carouselItemWidth = carousel.clientWidth;
  carouselListWidth = carouselList.clientWidth;
  // carousel.scrollLeft = 0;
};
resizeWindow();
window.onresize = resizeWindow;
