/* SCROLL SPY FUNCTIONS */

var timer = 0, oldPosition = window.scrollY, newPosition = window.scrollY, scrollEnabled = true, scrollEvents = [
    'scroll',
    // 'touchmove' // including 'touchmove' just creates an event i don't need to use at the end of the scroll maneuver.
  ];

/*
http://stackoverflow.com/questions/4929051/attaching-handlers-to-window-scroll-event
 */

// http://ejohn.org/blog/learning-from-twitter/
// fire callback every X ms when in onscroll event
// var bodyScroll1 = window.setInterval(tell, 100);

// http://ejohn.org/blog/learning-from-twitter/#comment-391945
// fire callback (tell) on page load, and X ms after end of onscroll event
var bodyScroll2 = function () {
  console.log('START bodyScroll2');
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(tell, 250);
};

// http://stackoverflow.com/a/11890228/1329637
// fire callback (tell) on page load, and every X ms during onscroll event
var bodyScroll3 = function () {
  console.log('START bodyScroll3');
  if (!scrollEnabled) {
    return;
  }
  scrollEnabled = false;
  console.log('-- i am scrolling');
  return setTimeout((function() {
    scrollEnabled = true;
    console.log('---- scroll enabled now');
    tell();
  }), 250);
};

// iterate over multiple scroll events
scrollEvents.forEach(function(event){
  console.log('START scrollEvents.forEach: ', event);
  // console.log('++ event: ', event);
  window.addEventListener(event, function(e) {
    // console.log('++++ e: ', e.type);
    bodyScroll2();
    // bodyScroll3();
  }, { passive: true });
});

function tell() {
  console.group('START tell');

  console.log('oldPosition: ', oldPosition);
  newPosition = window.scrollY;
  console.log('newPosition: ', newPosition);

  // should be same as window.scrollY
  console.log('body.scrollTop: ', body.scrollTop);

  // the difference between old position and new position.
  var delta = (newPosition - oldPosition);

  console.log('delta: ', delta);
  if (delta === 0) {
    console.log('window DID NOT scroll');
  } else if (delta > 0) {
    console.log('window scrolled DOWN');
  } else {
    console.log('window scrolled UP');
  }
  // set a new oldPosition for next run of funciton
  oldPosition = newPosition;
  console.groupEnd();
}

var newNow = 0;
var oldNow = Date.now();
// console.log('oldNow', oldNow);

function start(el) {
  console.log('START start: '+el.id);
  newNow = Date.now();
  // if (newNow === 0) {
  //   console.log('zero');
  //   newNow = Date.now();
  // } else {
  //   console.log('not zero');
  // }
  // setTimeout( function () {
    console.log('-- position: '+el.offsetTop);
    // console.log('timeout: '+now.getMilliseconds());
    // console.log('-- newNow', newNow);
    // console.log('-- oldNow', oldNow);
    console.log('-- timeout: '+( newNow - oldNow ));
  // }, 1000);
  oldNow = newNow;
}
// start(body);
// setTimeout(start(body),250);

// add scroll event listeners to elements...
/* Reference:
http://stackoverflow.com/questions/8796988/binding-multiple-events-to-a-listener-without-jquery
 */
// window.addEventListener('touchmove', setTimeout(start(body),250), { passive: true });
// window.addEventListener('scroll', setTimeout(start(body),250), { passive: true });
// app.addEventListener('touchmove scroll', setTimeout(start(app),250), { passive: true });
// main.addEventListener('touchmove scroll', setTimeout(start(main),250), { passive: true });
