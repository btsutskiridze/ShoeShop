// burger menu icon img
var menu = document.getElementById("menu");
//ul element of navigation
var nav = document.getElementById("nav");
//burger menu exit (li element)
var exit = document.getElementById("exit");

//addEventListener to toogle class 'hide-mobile' to hide and show menu
menu.addEventListener("click", function (e) {
  nav.classList.toggle("hide-mobile");
  e.preventDefault();
});

//to exit menu
exit.addEventListener("click", function (e) {
  nav.classList.add("hide-mobile");
});
