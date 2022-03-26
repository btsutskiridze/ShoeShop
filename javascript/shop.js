const menu = document.getElementById("menu"); // burger menu icon img

const nav = document.getElementById("nav"); //ul element of navigation

const exit = document.getElementById("exit"); //burger menu exit (li element)

const mainBtns = document.querySelectorAll(".main-navigations"); //main navigations a element

const shoes = document.querySelectorAll(".product"); //to access each shoes container

const shopPath = document.getElementById("shop-path"); //location path above products

const dropdownChildren = document.querySelectorAll(".dropdown>li>a"); //dropdown menu elements

const shoesSizes = document.querySelectorAll("shoes-sizes-div"); //whole all shoes and price filter container

let showSizesArray = []; //Where the filtered sizes get stored

let categoryItemsCopy = [...categoryItems]; //copy data from products.js file

const selectOption = document.querySelector("#select-options"); //select element

//addEventListener to toogle class 'hide-mobile' to hide and show menu
menu.addEventListener("click", function (e) {
  nav.classList.toggle("hide-mobile");
  e.preventDefault();
});

//to exit menu and add class 'hide-mobile'
exit.addEventListener("click", function (e) {
  nav.classList.add("hide-mobile");
});

// using jquery for mobile responsivity
//to open main navigations's  dropdown elements
$(".main-navigations").click(function () {
  //when one main navigation button opens its dropdown elements
  // other main navigation button's dropdowns will be hidden
  const dropdownEl = $(".main-navigations").not(this).siblings(".dropdown");
  dropdownEl.removeClass("display-dropdown");
  //to open clicked one
  $(this).siblings(".dropdown").toggleClass("display-dropdown");
});

//exit burgermenu icon onclick will reset all dropdown elements
exit.addEventListener("click", function (e) {
  document.querySelectorAll(".dropdown").forEach((item) => {
    item.classList.remove("display-dropdown");
  });
});

//shuffle array so items wil be displayed randomly
shuffle(categoryItemsCopy);

$(document).ready(function () {
  showItems(categoryItemsCopy); //Display all items with no filter applied

  $(".shoes-sizes-input").click(function () {
    //When a checkbox is clicked
    let sizeClicked = $(this).attr("data-size"); //The certain size checkbox clicked

    if ($(this).is(":checked")) {
      showSizesArray.push(sizeClicked); //Was not checked so add to filter array
      showItemsFiltered(); //Show items grid with filters
    } else {
      //Unchecked so remove from the array
      showSizesArray = showSizesArray.filter(function (elem) {
        return elem !== sizeClicked;
      });
      showItemsFiltered(); //Show items grid with new filters
    }

    if (!$("input[type=checkbox]").is(":checked")) {
      //No checkboxes are checked
      showSizesArray = []; //Clear size filter array
      showItems(categoryItemsCopy); //Show all items with NO filters applied
    }
  });
});

//================
//global functions
//================

//function to randomize array elemets
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

//function to reset checkbox when called
function reloadCheckboxes() {
  $('input[type="checkbox"]').each(function () {
    $(this).prop("checked", false);
  });
}

//function to display array of objects
function showItems(items) {
  //Default grid to show all items on page load in
  $("#display-shoes-div").empty();

  if (items.length < 1) {
    //if no item were found
    const warning = `<img id="nothing-found" src="./images/nothing-found-2.png" alt="nothing found">`;
    $("#display-shoes-div").append(warning);
  }
  for (let i = 0; i < items.length; i++) {
    let itemContent = `<article class="product" data-shoeGender="${items[i].gender}" 
    data-available-sizes =" ${items[i].size}">
    <img
      src="${items[i].image}"
      class="product-img img"
      alt=""
      
    />
    <footer>
      <h5 class="product-name">${items[i].title}</h5>
      <h6 class="product-category"> ${items[i].type} Shoes </h6> 
      <span class="product-price">${items[i].price}$</span>
    </footer>
  </article>`;
    //appending products;
    $("#display-shoes-div").append(itemContent);
  }
}

//function to display elements filtered by size
function showItemsFiltered() {
  //Default grid to show all items on page load in
  $("#display-shoes-div").empty();

  //using count for counting found items
  let count = 0;
  for (let i = 0; i < categoryItemsCopy.length; i++) {
    //Go through the items but only show items that have size from showSizesArray
    if (showSizesArray.some((v) => categoryItemsCopy[i].size.includes(v))) {
      let itemContent = `<article class="product" data-shoeGender="${categoryItemsCopy[i].gender}" 
      data-available-sizes =" ${categoryItemsCopy[i].size}">
      <img
        src="${categoryItemsCopy[i].image}"
        class="product-img img"
        alt=""
        
      />
      <footer>
        <h5 class="product-name">${categoryItemsCopy[i].title}</h5>
        <h6 class="product-category"> ${categoryItemsCopy[i].type} Shoes </h6> 
        <span class="product-price">${categoryItemsCopy[i].price}$</span>
      </footer>
    </article>`;
      $("#display-shoes-div").append(itemContent); //Display in grid
      count++;
    }
  }
  if (count < 1) {
    const warning = `<img id="nothing-found" src="./images/nothing-found-2.png" alt="nothing found">`;
    $("#display-shoes-div").append(warning);
  }
}

//refreshing checkbox on reload
$(window).on("load", reloadCheckboxes());

//====================
//buttons modification
//====================

//filtering products by each navigation button click
mainBtns.forEach((item) => {
  item.addEventListener("click", function (e) {
    categoryItemsCopy = [...categoryItems]; //reset products array
    reloadCheckboxes(); //refresh checkboxes
    const el = e.target;

    //filtering products array by gender category
    categoryItemsCopy = categoryItemsCopy.filter((sh) => {
      if (el.dataset.gender === "all") {
        //if data-gender equals 'all'
        shopPath.innerHTML = `<h5>all /</h5>`; //modifying location path
        return sh;
      } else if (sh.gender === el.dataset.gender) {
        // if products array objects gender is same as data-gender of navigation link
        shopPath.innerHTML = `<h5> all / ${el.textContent}</h5>`; //modifying location path
        return sh;
      }
    });
    // categoryItemsCopy = filteredByGender;
    shuffle(categoryItemsCopy); //shuffle array
    showItems(categoryItemsCopy); //display array
  });
});

//filtering products by each dropdown navigation button click
dropdownChildren.forEach((item) => {
  item.addEventListener("click", function (e) {
    categoryItemsCopy = [...categoryItems]; //reset products array
    reloadCheckboxes(); //refresh checkboxes
    const el = e.target;
    const genderEl = //accessing gender link from dropdown children element to use for comparison
      el.parentElement.parentElement.parentElement.firstElementChild;

    //filtering products array by gender category
    categoryItemsCopy = categoryItemsCopy.filter((sh) => {
      //below checking which main navigation button was clicked
      //and comparing dropdown elements data-filter to array object's (sh) type
      if (genderEl.dataset.gender === "all" && sh.type === el.dataset.filter) {
        shopPath.innerHTML = `<h5>all / ${el.dataset.filter}</h5>`;
        return sh;
      } else if (
        sh.gender === genderEl.dataset.gender &&
        sh.type === el.dataset.filter
      ) {
        shopPath.innerHTML = `<h5> all / ${genderEl.dataset.gender} / ${el.dataset.filter}</h5>`;
        return sh;
      } else if (
        sh.gender === genderEl.dataset.gender &&
        sh.type !== el.dataset.filter
      ) {
        shopPath.innerHTML = `<h5> all / ${genderEl.dataset.gender} / ${el.dataset.filter}</h5>`;
      }
    });
    showItems(categoryItemsCopy); //display array
  });
});

//modifying products array depending option selected
selectOption.addEventListener("change", function () {
  reloadCheckboxes();
  if (selectOption.value === "featured") {
    //if selected option is featured
    shuffle(categoryItemsCopy); //just shufflig array
    showItems(categoryItemsCopy); //and displaing
  }
  if (selectOption.value === "low-to-high") {
    categoryItemsCopy.sort(function (a, b) {
      //sorting by price low to high
      return a.price - b.price;
    });
    showItems(categoryItemsCopy); //displaying
  } else if (selectOption.value === "high-to-low") {
    //sorting by price high to low
    categoryItemsCopy.sort(function (a, b) {
      return b.price - a.price;
    });
    showItems(categoryItemsCopy); //displaying
  }
});
