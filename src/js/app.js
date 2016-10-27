/* APP FUNCTIONS */

/* @license */

var body = document.getElementsByTagName("body")[0], 
    app = document.getElementById("app"), 
    header = document.getElementById("header"),
    menu = document.getElementById("menu"),
    menuRoot = document.getElementById("menu--root"),
    menuSub = document.getElementsByClassName("menu--sub"),
    menuCategories = document.getElementById("menu_root--categories"),
    menuHome = document.getElementById("menu_root--home"),
    menuAbout = document.getElementById("menu_root--about"),
    overlay = document.getElementById("overlay"),
    main = document.getElementById("main"),
    lorem = document.getElementsByClassName("lorem")[0],
    modalClose = document.getElementsByClassName("modal--close"),
    moduleSearch = document.getElementById("search"),
    moduleAccount = document.getElementById("account"),
    moduleCart = document.getElementById("cart"),
    buttonSearchGo = document.getElementById("button--search_go"),
    footer = document.getElementById("footer"),
    headerIconMenu = document.getElementById("header--menu"),
    headerIconSearch = document.getElementById("header--search"),
    headerIconAccount = document.getElementById("header--account"),
    headerIconCart = document.getElementById("header--cart"),
    inputSearch = document.getElementById("input-search"),
    searchClose = document.getElementById("search-close"),
    searchClear = document.getElementById("search-clear"),
    searchAutocomplete = document.getElementById("search-autocomplete"), 
    searchHistory = document.getElementById("search-history"), 
    timeout = null;

/**
 * CLICK HANDLERS 
 * attach click handlers to page elements (links/buttons/icons)
*/

/** HEADER click handlers */

headerIconMenu.addEventListener('click', function () {
  console.log('CLICK MENU ICON');
  toggleMenu();
});

headerIconSearch.addEventListener('click', function () {
  console.log('CLICK SEARCH ICON');
  toggleSearch();
});

headerIconAccount.addEventListener('click', function () {
  console.log('CLICK ACCOUNT ICON');
  toggleAccount();
});

headerIconCart.addEventListener('click', function () {
  console.log('CLICK CART ICON');
  toggleCart();
});

/** MENU click handlers */

menuHome.addEventListener('click', function () {
  console.log('CLICK HOME MENU LINK');
  showPage('home');
});

menuAbout.addEventListener('click', function () {
  console.log('CLICK ABOUT MENU LINK');
  showPage('about');
});

/** SEARCH BAR click handlers */

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

/**
 * CLICK ACTION FUNCTIONS
 */

function toggleSearchCloseClear () {
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
}

function closeAll () {
  console.group('START closeAll');
  // close menu, account, cart
  var array = [menu, account, cart];
  console.log('iterate array: ', array);
  for (var i = 0; i < array.length; i++) {
    // if (array[i].classList.contains("open")) {
      // console.log('closeAll id: ', array[i].id);
      var elId = "header--"+array[i].id;
      console.log('el: ', document.getElementById(elId));
      var el = document.getElementById(elId);
      el.classList.remove("active");
      console.log('array['+i+']: ', array[i]);
      array[i].classList.remove("open");
    // }
  }
  overlay.classList.remove("open");
  body.classList.remove("noscroll");
  console.groupEnd();
}

function toggleMenu () {
  console.log('START toggleMenu');
  closeAll();
  // if (menu.classList.contains("open")) {
  //   console.log('menu is open');
  // } else {
  //   console.log('menu is closed');
  // }
  headerIconMenu.classList.toggle("active");
  menu.classList.toggle("open");
  overlay.classList.toggle("open");
  body.classList.toggle("noscroll");
}

function toggleSearch () {
  console.log('START toggleSearch');
  closeAll();
  headerIconSearch.classList.toggle("active");
  moduleSearch.classList.toggle("open");
  searchAutocomplete.classList.remove("open");
  searchHistory.classList.remove("open");
}
toggleSearch();

function toggleAccount () {
  console.log('START toggleAccount');
  closeAll();
  headerIconAccount.classList.toggle("active");
  overlay.classList.toggle("open");
  moduleAccount.classList.toggle("open");
  body.classList.toggle("noscroll");
}

function toggleCart () {
  console.log('START toggleCart');
  closeAll();
  headerIconCart.classList.toggle("active");
  overlay.classList.toggle("open");
  moduleCart.classList.toggle("open");
  body.classList.toggle("noscroll");
}

/* LOAD PAGES VIA XHR */

function showPage(page) {
  // load HOME content...
  var xhr = new XMLHttpRequest();
  xhr.open('GET', page+'.html', true);
  xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      if (this.status !== 200) return; // or whatever error handling you want
      main.innerHTML = this.responseText;
  };
  xhr.send();
  closeAll();
}


// add new paragraph
function addPara (number) { 
  for (var i = 0; i < number; i++) {
    console.log('START addPara');
    var newPara = document.createElement('p');
    var newLorem = document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis temporibus aspernatur incidunt. Totam assumenda vel officiis debitis molestiae et, voluptatem voluptates, soluta dolorem labore. Repellat suscipit, beatae sapiente non consequuntur?');
    newPara.appendChild(newLorem);
    lorem.appendChild(newPara);
  }
}
addPara(20);

// replace welcome text
document.getElementsByTagName('h1')[0].textContent = "Hello World!";
