/**
 * CAROUSEL FUNCTIONS
 * 
 * issues:
 * * [x] resizing carousel smaller causes:
 *     * [x] hang on last slide
 *     * [x] active dot disappears
 *     * [x] carouselIndex keeps incrementing!
 *  * [x] resizing carousel bigger after resizing smaller 
 *     * [x] fixes issue above
 *  * [x] resizing carousel bigger 
 *     * [x] no problems
 *  * [_] no swiping
 *  
 */

/**
 * @license
 */

// cache dom elements
var carousel = document.querySelector(".carousel"),
  carouselList = document.querySelector(".carousel-list"),
  carouselListItems = Array.from(document.querySelectorAll(".carousel-item")),
  carouselNav = document.querySelector(".carousel-nav"),
  scrollControl1 = document.querySelector("#scrollControl1"),
  scrollControl2 = document.querySelector("#scrollControl2");

console.log('carousel: ', carousel);
console.log('carouselList: ', carouselList);
console.log('carouselListItems: ', carouselListItems);
console.log('carouselNav: ', carouselNav);
console.log('scrollControl1: ', scrollControl1);
console.log('scrollControl2: ', scrollControl2);

// misc vars
var carouselIndex = 0,
  intervalID,
  scrollingFlag = false,
  carouselItemW = window.innerWidth,
  carouselLength = carouselListItems.length,
  carouselListW = (carouselItemW * carouselLength);

carouselItemW = window.innerWidth;
// console.log('carouselItemW: ', carouselItemW);
carousel.style.width = carouselItemW+'px';

carouselListW = (carouselItemW * carouselLength);
// console.log('carouselListW: ', carouselListW);
carouselList.style.width = carouselListW+'px';

/** 
 * MAKE NAV DOTS
 */

// create dom elements
carouselNavDot = document.createElement('li');
carouselNavDot.classList.add('carousel-dot');

// create nav dots.
for (var i = 0; i < carouselLength; i++) {
  // set width of carousel item:
  carouselListItems[i].style.width = carouselItemW+'px';
  // clone nav dot
  var newDot = carouselNavDot.cloneNode();
  newDot.innerHTML = "&middot;";
  // attach to nav dot list
  carouselNav.appendChild(newDot);
}
carouselNavDots = Array.from(document.querySelectorAll(".carousel-dot"));
carouselNavDots[0].classList.add("active");

/**
 * scrollInterval
 * SCROLLING INTERVAL
 * @return {[type]} [description]
 */

function scrollInterval () {
  // console.log('START scrollInterval');
  // set up an interval
  intervalID = window.setInterval(doScroll, 2000);
}
scrollInterval(); // start scrolling on page load.

/**
 * doScroll
 * AUTOMATIC SCROLLING
 * @return {[type]} [description]
 */

function doScroll() {
  // console.group('START doScroll');

  // console.log('timerElapsed: ', timerElapsed);
  timerReset();

  // console.log('carousel.scrollLeft: ', carousel.scrollLeft);
  // console.log('carouselItemW: ', carouselItemW);
  // console.log('carouselListW: ', carouselListW);

  /* set flag to true to indicate autoscrolling has started */
  scrollingFlag = true;
  scrollControl1.disabled = false;
  scrollControl2.disabled = true;

  /* deactivate all nav dots */
  for (var i = 0; i < carouselLength; i++) {
    carouselNavDots[i].classList.remove("active");
  }

  /* if left offset is greater than or equal to width of whole 
  carousel minus width of one item */
  if (carousel.scrollLeft >= ((carouselItemW * carouselLength) - carouselItemW)) {
    // scroll to the first item (left offset 0)
    carousel.scrollLeft = 0;
    carouselIndex = 0;
    // activate first nav dot
    // console.log('carouselIndex: ', carouselIndex);
    carouselNavDots[carouselIndex].classList.add("active");
  } else {
    // scroll to next one by adding item width to left offset
    // carousel.scrollLeft += carouselItemW;
    if ((carouselIndex+1) < carouselLength) {
      carousel.scrollLeft = (carouselIndex+1) * carouselItemW;
      carouselIndex++;
    } else {
      carousel.scrollLeft = 0;
      carouselIndex = 0;
    }
    // console.log('carouselIndex: ', carouselIndex);
    // console.log('carouselNavDots[carouselIndex].classList: ', carouselNavDots[carouselIndex].classList);
    // activate correct nav dot
    carouselNavDots[carouselIndex].classList.add("active");
  }
  // console.log('carouselIndex: ', carouselIndex);
  // console.groupEnd();
}

/* pause/resume automatic scrolling */
function scrollControl() {
  // console.log('START scrollControl: ', scrollingFlag);
  if (scrollingFlag === true) {
    if (timerBox) {
      timerControl();
    }

    // alter text of control button.
    scrollControl1.disabled = true;
    scrollControl2.disabled = false;

    // set flag to false to indicate autoscrolling has stopped.
    scrollingFlag = false;

    window.clearInterval(intervalID);

  } else {
    if (timerBox) {
      timerReset();
    }

    // alter text of control button.
    scrollControl1.disabled = false;
    scrollControl2.disabled = true;

    // get the autoscroll interval going again.
    scrollingFlag = true;

    scrollInterval();

  }
}

/**
 * @license
 * MANUALLY SCROLL CAROUSEL */

/**
 * @license
 * HANDLE WINDOW RESIZING */

function resizeWindow () { 
  // console.group('START resizeWindow');

  // stop auto scrolling to recalculate widths...
  window.clearInterval(intervalID);

  carouselItemW = window.innerWidth;
  // console.log('carouselItemW: ', carouselItemW);
  carousel.style.width = carouselItemW+'px';

  carouselListW = (carouselItemW * carouselLength);
  // console.log('carouselListW: ', carouselListW);
  carouselList.style.width = carouselListW+'px';

  // console.log('carouselIndex: ', carouselIndex);
  carousel.scrollLeft = (carouselIndex) * carouselItemW;

  for (var i = 0; i < carouselLength; i++) {
    // set width of carousel item:
    carouselListItems[i].style.width = carouselItemW+'px';
  }

  // console.groupEnd();

  // restart auto scrolling with recalculated widths if not paused...
  if (scrollingFlag === true) {
    scrollInterval();
  }

}
window.onresize = resizeWindow;
