/* HEADER FUNCTIONS */

var menuHasMenu = document.getElementsByClassName("has-menu");

console.log('menuHasMenu: ', menuHasMenu);

var toggleSubMenu = function () {
  console.log('TOGGLE SUB MENU: ', event.target);
  // ???.classList.toggle("open");
};

// attach "closeAll" func to all modal close icons via click event listener.
for (var i = 0; i < menuHasMenu.length; i++) {
  console.log('menuHasMenu['+i+']: ', menuHasMenu[i].nextSibling);
  menuHasMenu[i].addEventListener('click', function () {
    // console.log('CLICK SUB MENU');
    toggleSubMenu();
  });
};

