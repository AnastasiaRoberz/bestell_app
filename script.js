//#region GLOBAL VARIABLES
const menuRef = document.getElementById("menu-wrapper");
const basketRef = document.getElementById("basket");
const basketContentRef = document.getElementById("basket-content");
let basket = [];
const deliveryFee = 4.99;

//#endregion

function init() {
  getFromLocalStorage();
  renderCategories();
  renderBasket();
}

//#region RENDER CATEGORIES
function renderCategories() {
  let categoriesContent = "";
  for (const currentCategory of menu) {
    const dishes = renderDishCard(currentCategory);
    categoriesContent += categoryTemplate(currentCategory, dishes);
  }
  menuRef.innerHTML = categoriesContent;
}

function renderDishCard(currentCategory) {
  let dishes = "";
  for (const currentDish of currentCategory.dishes) {
    const formattedPrice = formatPrice(currentDish.price);
    dishes += dishCardTemplate(currentDish, formattedPrice);
  }
  return dishes;
}
//#endregion

//#region RENDER BASKET
function renderBasket() {
  if (basket.length === 0) {
    basketRef.classList.replace("basket-opened", "basket");
    return;
  }
  console.log(basket.length);

  basketRef.classList.replace("basket", "basket-opened");
  let basketCards = renderBasketCards();
  let basketTable = basketConfirmOrderTemplate(
    formatPrice(calcBasketSubtotal()),
    calcBasketTotal(),
    formatPrice(deliveryFee),
  );
  basketContentRef.innerHTML = basketContentTemplate(basketCards, basketTable);
}

function renderBasketCards() {
  let basketCards = "";
  for (const basketDish of basket) {
    const dish = getDishById(basketDish.dishID);
    basketCards += basketCardTemplate(
      dish,
      basketDish,
      formatPrice(dish.price),
    );
  }
  return basketCards;
}

//#endregion

//#region USER INTERACTIONS
function addToBasket(dishID, btnRef) {
  let amount = 1;
  basket.push({ "dishID": dishID, "amount": amount });
  saveToLocalStorage();
  renderBasket();
  btnRef.innerText = addedBtnContent(amount);
  btnRef.classList.add("added");
}

function deleteFromBasket(dishID) {
  const cardBtnRef = document.getElementById(`add-to-basket${dishID}`);
  const index = basket.findIndex((item) => item.dishID === dishID);
  basket.splice(index, 1);
  saveToLocalStorage();
  renderBasket();
  cardBtnRef.innerText = "Add to basket";
  cardBtnRef.classList.remove("added");
}

function changeAmount(dishID, type) {
  const index = basket.findIndex((item) => item.dishID === dishID);
  const subBtnRef = document.getElementById(`btn-sub-${dishID}`);

  if (type === "sub") {
    basket[index].amount--;
    if (basket[index].amount <= 1) subBtnRef.classList.add("disable");
  } else if (type === "add") {
    basket[index].amount++;
    subBtnRef.classList.remove("disable");
  }
}
//#endregion

init();
