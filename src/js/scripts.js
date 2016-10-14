var body = document.getElementsByTagName("body")[0], 
    app = document.getElementById("app"), 
    header = document.getElementById("header"),
    menu = document.getElementById("menu"),
    menuRoot = document.getElementsByClassName("menu--root"),
    menuSub = document.getElementsByClassName("menu--sub"),
    menuCategories = document.getElementById("menu_root--categories"),
    overlay = document.getElementById("overlay"),
    main = document.getElementById("main"),
    lorem = document.getElementsByClassName("lorem")[0],
    modalClose = document.getElementsByClassName("modal--close"),
    moduleSearch = document.getElementById("search"),
    moduleAccount = document.getElementById("account"),
    moduleCart = document.getElementById("cart"),
    buttonSearchGo = document.getElementById("button--search_go"),
    footer = document.getElementById("footer"),
    menuIcon = document.getElementById("header--menu"),
    searchIcon = document.getElementById("header--search"),
    accountIcon = document.getElementById("header--account"),
    cartIcon = document.getElementById("header--cart"),
    inputSearch = document.getElementById("input-search"),
    searchClose = document.getElementById("search-close"),
    searchClear = document.getElementById("search-clear"),
    searchAutocomplete = document.getElementById("search-autocomplete"), 
    searchHistory = document.getElementById("search-history"), 
    timeout = null;

menuIcon.addEventListener('click', function () {
  console.log('CLICK MENU ICON');
  toggleMenu();
});

menuCategories.addEventListener('click', function () {
  console.log('CLICK SHOP DEPARTMENTS BUTTON');
  toggleSubMenu();
});

overlay.addEventListener('click', function () {
  console.log('CLICK OVERLAY');
  closeAll();
});

// modalClose.addEventListener('click', function () {
//   console.log('CLICK MODAL CLOSE');
//   closeAll();
// });

// attach "closeAll" func to all modal close icons via click event listener.
for (var i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener('click', function () {
    console.log('CLICK MODAL CLOSE');
    closeAll();
  });
};

// attach 
searchIcon.addEventListener('click', function () {
  console.log('CLICK SEARCH ICON');
  toggleSearch();
});

accountIcon.addEventListener('click', function () {
  console.log('CLICK ACCOUNT ICON');
  toggleAccount();
});

cartIcon.addEventListener('click', function () {
  console.log('CLICK CART ICON');
  toggleCart();
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

var closeAll = function () {
  console.log('CLOSE ALL');
  // close menu, account, cart
  var array = [menu, account, cart];
  for (var i = 0; i < array.length; i++) {
    
    // if (array[i].classList.contains("open")) {
      // console.log(array[i].id);
      var elId = "header--"+array[i].id;
      // console.log(document.getElementById(elId));
      document.getElementById(elId).classList.remove("active");
      array[i].classList.remove("open");
    // }
  }
  overlay.classList.remove("open");
  body.classList.remove("noscroll")
};

var toggleMenu = function () {
  console.log('TOGGLE MENU');
  closeAll();
  // if (menu.classList.contains("open")) {
  //   console.log('menu is open');
  // } else {
  //   console.log('menu is closed');
  // }
  menuIcon.classList.toggle("active");
  menu.classList.toggle("open");
  overlay.classList.toggle("open");
  body.classList.toggle("noscroll")
};

var toggleSubMenu = function () {
  console.log('TOGGLE SUBMENU');
  menuSub[0].classList.toggle("open");
};

var toggleSearch = function () {
  console.log('TOGGLE SEARCH');
  closeAll();
  searchIcon.classList.toggle("active");
  moduleSearch.classList.toggle("open");
  searchAutocomplete.classList.remove("open");
  searchHistory.classList.remove("open");
};
toggleSearch();

var toggleAccount = function () {
  console.log('TOGGLE ACCOUNT');
  // closeAll();
  accountIcon.classList.toggle("active");
  overlay.classList.toggle("open");
  moduleAccount.classList.toggle("open");
  body.classList.toggle("noscroll")
};

var toggleCart = function () {
  console.log('TOGGLE CART');
  // closeAll();
  cartIcon.classList.toggle("active");
  overlay.classList.toggle("open");
  moduleCart.classList.toggle("open");
  body.classList.toggle("noscroll")
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

// add new paragraph
var addPara = function (number) { 
  for (var i = 0; i < number; i++) {
    console.log('START addPara');
    var newPara = document.createElement('p');
    var newLorem = document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis temporibus aspernatur incidunt. Totam assumenda vel officiis debitis molestiae et, voluptatem voluptates, soluta dolorem labore. Repellat suscipit, beatae sapiente non consequuntur?');
    newPara.appendChild(newLorem);
    lorem.appendChild(newPara);
  }
};
addPara(20);

// replace welcome text
document.getElementsByTagName('h1')[0].textContent = "Hello World!";
