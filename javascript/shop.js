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

// function to randomize array elemets
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

let showSizesArray = []; //Where the filtered sizes get stored
let categoryItemsCopy = [...categoryItems];
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

function showItems(items) {
  //Default grid to show all items on page load in

  $("#display-shoes-div").empty();
  const warning = `<h6>Sorry, no products matched your search</h6>`;
  if (items.length < 1) {
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
    $("#display-shoes-div").append(itemContent);
  }
}

function showItemsFiltered() {
  //Default grid to show all items on page load in
  $("#display-shoes-div").empty();
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
  const warning = `<h6>Sorry, no products matched your search</h6>`;
  if (count < 1) {
    $("#display-shoes-div").append(warning);
  }
}

const mainBtns = document.querySelectorAll(".main-navigations");
const shoes = document.querySelectorAll(".product");
const shopPath = document.getElementById("shop-path");
const dropdownChildren = document.querySelectorAll(".dropdown>li>a");
const shoesSizes = document.querySelectorAll("shoes-sizes-div");

function reloadCheckboxes() {
  $('input[type="checkbox"]').each(function () {
    $(this).prop("checked", false);
  });
}
$(window).on("load", reloadCheckboxes());

dropdownChildren.forEach((item) => {
  item.addEventListener("click", function (e) {
    reloadCheckboxes();
    categoryItemsCopy = [...categoryItems];
    const el = e.target;
    const genderEl =
      el.parentElement.parentElement.parentElement.firstElementChild;
    const filteredByType = categoryItemsCopy.filter((v) => {
      if (genderEl.dataset.gender === "all" && v.type === el.dataset.filter) {
        shopPath.innerHTML = `<h5>all / ${el.dataset.filter}</h5>`;
        return v;
      } else if (
        v.gender === genderEl.dataset.gender &&
        v.type === el.dataset.filter
      ) {
        shopPath.innerHTML = `<h5> all / ${genderEl.dataset.gender} / ${el.dataset.filter}</h5>`;
        return v;
      } else if (
        v.gender === genderEl.dataset.gender &&
        v.type !== el.dataset.filter
      ) {
        shopPath.innerHTML = `<h5> all / ${genderEl.dataset.gender} / ${el.dataset.filter}</h5>`;
      }
    });
    categoryItemsCopy = filteredByType;
    showItems(categoryItemsCopy);
  });
});

mainBtns.forEach((item) => {
  item.addEventListener("click", function (e) {
    categoryItemsCopy = [...categoryItems];
    reloadCheckboxes();
    const el = e.target;
    const filteredByGender = categoryItemsCopy.filter(function (shoe) {
      if (el.dataset.gender === "all") {
        shopPath.innerHTML = `<h5>all /</h5>`;
        return shoe;
      } else if (shoe.gender === el.dataset.gender) {
        shopPath.innerHTML = `<h5> all / ${el.textContent}</h5>`;
        return shoe;
      }
    });
    categoryItemsCopy = filteredByGender;
    shuffle(categoryItemsCopy);
    showItems(categoryItemsCopy);
  });
});

const selectOption = document.querySelector("#select-options");
const filterOpt1 = document.querySelector("#sort-option-1");
const filterOpt2 = document.querySelector("#sort-option-2");

selectOption.addEventListener("change", function () {
  reloadCheckboxes();
  if (selectOption.value === "featured") {
    shuffle(categoryItemsCopy);
    showItems(categoryItemsCopy);
  }
  if (selectOption.value === "low-to-high") {
    categoryItemsCopy.sort(function (a, b) {
      return a.price - b.price;
    });
    showItems(categoryItemsCopy);
  } else if (selectOption.value === "high-to-low") {
    categoryItemsCopy.sort(function (a, b) {
      return b.price - a.price;
    });
    showItems(categoryItemsCopy);
  }
});

// $("#load-more").click(function () {
//   if (itemsQuantity < categoryItemsCopy.length) {
//     itemsQuantity += 4;
//     // $(this).textContent = "no";
//     // console.log("no");
//   } else {
//     document.getElementById("load-more").innerHTML = "All Products Displayed";
//   }
//   showItems(categoryItemsCopy);
// });
