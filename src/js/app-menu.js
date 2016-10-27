/* MENU FUNCTIONS */

var menuHasMenu = document.getElementsByClassName("has-menu");

console.log('menuHasMenu: ', menuHasMenu);

function toggleSubMenu () {
  console.log('TOGGLE SUB MENU: ', event.target);
  // console.log('event.target.nextSibling: ', event.target.nextSibling);
  // console.log('event.target.parentNode.getElementsByTagName(\'ul\')[0]: ', event.target.parentNode.getElementsByTagName('ul')[0]);
  // console.log('event.target.parentNode: ', event.target.parentNode);
  // console.log('event.target.parentElement: ', event.target.parentElement);
  var mySubMenu = event.target.parentNode.getElementsByTagName('ul')[0];
  mySubMenu.classList.toggle("open");
}

function dummyClick () {
  console.log('DUMMY CLICK: ', event.target);
  // if (!event) var event = window.event;
  event.cancelBubble = true;
  if (event.stopPropagation) event.stopPropagation();    
  // ???.classList.toggle("open");
}

// attach dummy click to LI element & real click to A element.
for (var i = 0; i < menuHasMenu.length; i++) {
  console.log('menuHasMenu['+i+']: ', menuHasMenu[i]);
  myMenuItem = menuHasMenu[i];
  myMenuItemAnchor = myMenuItem.getElementsByTagName('a')[0];
  // console.log('myMenuItem.getElementsByTagName(\'a\')[0]: ', myMenuItem.getElementsByTagName('a')[0]);

  // click assignment version 1
  myMenuItem.onclick = dummyClick;
  myMenuItemAnchor.onclick = toggleSubMenu;

  // click assignment version 2
  // not good...
  // myMenuItem.onclick = toggleSubMenu;
  // myMenuItemAnchor.onclick = dummyClick;
}

