var body = document.getElementsByTagName("body")[0], 
    app = document.getElementById("app"), 
    header = document.getElementById("header"),
    nav = document.getElementById("nav"),
    navSub = document.getElementsByClassName("nav-sub"),
    navDepartments = document.getElementById("nav-departments"),
    overlay = document.getElementById("overlay"),
    main = document.getElementById("main"),
    mainContent = main.getElementsByClassName("content")[0],
    search = document.getElementById("search"),
    buttonSearchGo = document.getElementById("button-go"),
    footer = document.getElementById("footer"),
    headerMenu = document.getElementById("header-menu"),
    headerSearch = document.getElementById("header-search"),
    inputSearch = document.getElementById("input-search"),
    searchClose = document.getElementById("search-close"),
    searchClear = document.getElementById("search-clear"),
    searchAutocomplete = document.getElementById("search-autocomplete"), 
    searchHistory = document.getElementById("search-history"), 
    timeout = null;

headerMenu.addEventListener('click', function () {
  console.log('CLICK MENU BUTTON');
  toggleMenu();
});

navDepartments.addEventListener('click', function () {
  console.log('CLICK SHOP DEPARTMENTS BUTTON');
  toggleSubMenu();
});

overlay.addEventListener('click', function () {
  console.log('CLICK OVERLAY');
  toggleMenu();
});

headerSearch.addEventListener('click', function () {
  console.log('CLICK SEARCH BUTTON');
  toggleSearch();
});

inputSearch.addEventListener('focus', function () {
  console.log('TYPING IN SEARCH INPUT');
  searchAutocomplete.classList.remove("open");
  searchHistory.classList.add("open");

});

inputSearch.addEventListener('keyup', function () {
  console.log('TYPING IN SEARCH INPUT');
  toggleSearchCloseClear();
});

searchClose.addEventListener('click', function () {
  console.log('CLICK SEARCH CLOSE LINK');
  toggleSearch();
});

searchClear.addEventListener('click', function () {
  console.log('CLICK SEARCH CLEAR LINK');
  inputSearch.value = null;
  toggleSearchCloseClear();
});

buttonSearchGo.addEventListener('click', function () {
  console.log('CLICK SEARCH GO BUTTON');
});

var toggleSearchCloseClear = function () {
  if (inputSearch.value) {
    searchClear.classList.add("open");
    searchClose.classList.remove("open");
    searchAutocomplete.classList.add("open");
    searchHistory.classList.remove("open");
  } else {
    searchClear.classList.remove("open");
    searchClose.classList.add("open");
    searchAutocomplete.classList.remove("open");
    searchHistory.classList.add("open");
  }
};

var toggleMenu = function () {
  nav.classList.toggle("open");
  overlay.classList.toggle("open");
  body.classList.toggle("noscroll")
};

var toggleSubMenu = function () {
  navSub[0].classList.toggle("open");
};

var toggleSearch = function () {
  search.classList.toggle("open");
  searchAutocomplete.classList.remove("open");
  searchHistory.classList.remove("open");
};

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
// fire callback on page load, and X ms after end of onscroll event
var bodyScroll2 = function () {
  console.log('START bodyScroll2');
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(tell, 100)
};

// http://stackoverflow.com/a/11890228/1329637
// 
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
  console.info('START scrollEvents.forEach: ', event);
  // console.log('++ event: ', event);
  window.addEventListener(event, function(e) {
    // console.log('++++ e: ', e.type);
    bodyScroll2();
    // bodyScroll3();
  }, { passive: true });
});

function tell() {
  console.log('start TELL');

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

// add new paragraph
var addPara = function (number) { 
  for (var i = 0; i < number; i++) {
    console.log('START addPara');
    var newPara = document.createElement('p');
    var newLorem = document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis temporibus aspernatur incidunt. Totam assumenda vel officiis debitis molestiae et, voluptatem voluptates, soluta dolorem labore. Repellat suscipit, beatae sapiente non consequuntur?');
    newPara.appendChild(newLorem);
    mainContent.appendChild(newPara); 
  }
};
addPara(20);

// replace welcome text
document.getElementsByTagName('h1')[0].textContent = "Hello World!";