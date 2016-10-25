/* MENU FUNCTIONS */

var menuHasMenu = document.getElementsByClassName("has-menu");

console.log('menuHasMenu: ', menuHasMenu);

function toggleSubMenu () {
  console.log('TOGGLE SUB MENU: ', event.target);
  // ???.classList.toggle("open");
}

function dummyClick (event) {
  console.log('DUMMY CLICK: ', event.target);
  // if (!event) var event = window.event;
  event.cancelBubble = true;
  if (event.stopPropagation) event.stopPropagation();    
  // ???.classList.toggle("open");
}

// attach "closeAll" func to all modal close icons via click event listener.
for (var i = 0; i < menuHasMenu.length; i++) {
  console.log('menuHasMenu['+i+']: ', menuHasMenu[i]);
  myMenuItem = menuHasMenu[i];
  myMenuItemAnchor = myMenuItem.getElementsByTagName('a')[0];
  // console.log('myMenuItem.getElementsByTagName(\'a\')[0]: ', myMenuItem.getElementsByTagName('a')[0]);
  myMenuItem.onlcick = toggleSubMenu;
  myMenuItemAnchor.onclick = dummyClick;
}

