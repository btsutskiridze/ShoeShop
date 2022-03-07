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

// shoes part
let filteredProducts = [...products];

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
shuffle(filteredProducts);

const productsContainer = document.querySelector(".products-container");

const displayProducts = (shoeproducts) => {
  if (shoeproducts.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }

  productsContainer.innerHTML = shoeproducts
    .map((product) => {
      const { title, image, price, gender } = product;
      return `<article class="product" data-shoeGender="${gender}">
          <img
            src="${image}"
            class="product-img img"
            alt=""
            
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <h6 class="product-category"> ${gender}'s Shoe </h6> 
            <span class="product-price">${price}$</span>
          </footer>
        </article>`;
    })
    .join("");
};

displayProducts(filteredProducts);

const mainBtns = document.querySelectorAll(".main-navigations");
const shoes = document.querySelectorAll(".product");
const shopPath = document.getElementById("shop-path");
const dropdownChildren = document.querySelectorAll(".dropdown>li>a");

dropdownChildren.forEach((item) => {
  item.addEventListener("click", function (e) {
    filteredProducts = [...products];
    const el = e.target;
    const genderEl =
      el.parentElement.parentElement.parentElement.firstElementChild;
    const foundType = filteredProducts.filter((v) => {
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
    filteredProducts = foundType;
    displayProducts(filteredProducts);
  });
});

mainBtns.forEach((item) => {
  item.addEventListener("click", function (e) {
    filteredProducts = [...products];
    const el = e.target;
    const newArr = filteredProducts.filter(function (shoe) {
      if (el.dataset.gender === "all") {
        shopPath.innerHTML = `<h5>all /</h5>`;
        return shoe;
      } else if (shoe.gender === el.dataset.gender) {
        shopPath.innerHTML = `<h5> all / ${el.textContent}</h5>`;
        return shoe;
      }
    });
    filteredProducts = newArr;
    shuffle(filteredProducts);
    displayProducts(filteredProducts);
    console.log(filteredProducts);
  });
});

const filterOpt1 = document.getElementById("sort-option-1");
const filterOpt2 = document.getElementById("sort-option-2");

filterOpt1.addEventListener("click", function () {
  filteredProducts.sort(function (a, b) {
    return a.price - b.price;
  });
  displayProducts(filteredProducts);
});
filterOpt2.addEventListener("click", function () {
  filteredProducts.sort(function (a, b) {
    return b.price - a.price;
  });
  displayProducts(filteredProducts);
});
