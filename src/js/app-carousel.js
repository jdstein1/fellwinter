/**
 * CAROUSEL FUNCTIONS
 *
 * issues:
 * * (-) resizing carousel smaller causes:
 *     * (-) hang on last slide
 *     * (-) active dot disappears
 *     * (+) carouselIndex keeps incrementing!
 *     * (=) FIXED!!!!!
 * * (-) resizing carousel bigger 
 *     * (=) no problems
 * * (-) resizing carousel bigger after resizing smaller 
 *     * (=) fixes issue above
 */

/* @license */

// cache dom elements
var carousel = document.getElementsByClassName("carousel")[0], 
  carouselList = document.getElementsByClassName("carousel-list")[0], 
  carouselListItems = document.getElementsByClassName("carousel-item"), 
  carouselNav = document.getElementsByClassName("carousel-nav")[0], 
  carouselNavDots = document.getElementsByClassName("carousel-dot"), 
  scrollControl1 = document.getElementById("scrollControl1"), 
  scrollControl2 = document.getElementById("scrollControl2");

// misc vars
var carouselIndex = 0, 
  intervalID, 
  scrollingFlag = false, 
  carouselItemW = carousel.clientWidth, 
  carouselListW = carouselList.clientWidth, 
  carouselLength = carouselListItems.length;

// create dom elements
var carouselNavDot = document.createElement('li');
carouselNavDot.classList.add('carousel-dot');


// create nav dots.
for (var i = 0; i < carouselLength; i++) {
  // clone nav dot
  var newDot = carouselNavDot.cloneNode();
  newDot.innerHTML = "&middot;";
  // attach to nav dot list
  carouselNav.appendChild(newDot);
}
carouselNavDots[0].classList.add("active");

/* AUTOMATICALLY SCROLL CAROUSEL */
function autoScroll () {
  // console.log('START autoScroll');
  // set up an interval
  intervalID = window.setInterval(doScroll, 2000);
}

// start automatically scrolling
function doScroll() {
  console.group('START doScroll');
  console.log('carousel.scrollLeft: ', carousel.scrollLeft);
  console.log('carouselItemW: ', carouselItemW);
  console.log('carouselListW: ', carouselListW);

  // set flag to true to indicate autoscrolling has started.
  scrollingFlag = true;
  scrollControl1.disabled = false;
  scrollControl2.disabled = true;

  for (var i = 0; i < carouselLength; i++) {
    // deactivate all nav dots
    carouselNavDots[i].classList.remove("active");
  }

  // check if left offset is greater than or equal to width of whole 
  // carousel minus width of one item...
  if (carousel.scrollLeft >= ((carouselItemW * carouselLength) - carouselItemW)) {
    // scroll to the first item (left offset 0)
    carousel.scrollLeft = 0;
    carouselIndex = 0;
    // activate first nav dot
    console.log('carouselIndex: ', carouselIndex);
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
    console.log('carouselIndex: ', carouselIndex);
    // console.log('carouselNavDots[carouselIndex].classList: ', carouselNavDots[carouselIndex].classList);
    // activate correct nav dot
    carouselNavDots[carouselIndex].classList.add("active");
  }
  // console.log('carouselIndex: ', carouselIndex);
  console.groupEnd();
}

// rause/resume automatic scrolling
function scrollControl() {
  console.log('START scrollControl: ', scrollingFlag);
  if (scrollingFlag === true) {

    // alter text of control button.
    scrollControl1.disabled = true;
    scrollControl2.disabled = false;

    // set flag to false to indicate autoscrolling has stopped.
    scrollingFlag = false;

    window.clearInterval(intervalID);

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
  console.group('START resizeWindow');
  // windowHeight = window.innerHeight;
  // console.log('windowHeight: ', windowHeight);
  // windowWidth = window.innerWidth;
  // console.log('windowWidth: ', windowWidth);
  carouselItemW = carousel.clientWidth;
  console.log('carouselItemW: ', carouselItemW);
  carouselListW = carouselList.clientWidth;
  console.log('carouselListW: ', carouselListW);
  // carousel.scrollLeft = 0;
  console.groupEnd();
  if (scrollingFlag === true) {
    // expression...
  } else {
    // expression...
  }
  // return carouselItemW;
  // window.clearInterval(intervalID);
  // scrollingFlag = false;
  // scrollControl();
}
// resizeWindow();
window.onresize = resizeWindow;
