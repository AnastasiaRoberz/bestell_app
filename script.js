//#region GLOBAL VARIABLES
const menuRef = document.getElementById("menu-wrapper");
const basketRef = document.getElementById("basket-content");
const dialogRef = document.getElementById("confirm-order-dialog");
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
  for (const category of menu) {
    const dishes = renderDishCard(category);
    menuRef.innerHTML += categoryTemplate(category, dishes);
  }
}

function renderDishCard(category) {
  let dishes = "";
  for (const dish of category.dishes) {
    const formattedPrice = formatPrice(dish.price);
    const basketItem = getBasketDishById(dish.dishID);
    const btn = getBtnParameters(basketItem);

    dishes += dishCardTemplate(dish, formattedPrice, btn.cssClass, btn.text, btn.disabled);
  }
  return dishes;
}
//#endregion

//#region RENDER BASKET
function renderBasket() {
  if (basket.length === 0) {
    basketRef.innerHTML = basketEmptyTemplate();
  } else {
    basketRef.innerHTML = basketContentTemplate();
    renderAllBasketCards();
    renderTotals();
    renderBasketAmount();
  }
}

function renderAllBasketCards() {
  const basketCardsWrapper = document.getElementById("basket-cards-wrapper");
  basketCardsWrapper.innerHTML = "";
  for (const basketDish of basket) {
    basketCardsWrapper.innerHTML += renderBasketCard(basketDish);
    renderAmount(basketDish);
  }
}

const renderBasketCard = (basketDish) => basketCardTemplate(getDishById(basketDish.dishID));
//#endregion

//#region USER INTERACTIONS
function showBasket() {
  const mobileBasketRef = document.getElementById("basket-wrapper");
  mobileBasketRef.classList.toggle("opened");
}

function addToBasket(dishID, btnRef) {
  const basketItem = getBasketDishById(dishID);

  if (basketItem) {
    basketItem.amount++;
    renderAmount(basketItem);
  } else {
    handleNewBasketItem(dishID, btnRef);
  }
  renderTotals();
  saveToLocalStorage();
}

function deleteFromBasket(dishID) {
  const cardBtnRef = document.getElementById(`add-to-basket${dishID}`);
  const index = basket.findIndex((item) => item.dishID === dishID);

  if (index !== -1) basket.splice(index, 1);

  cardBtnRef.innerText = "Add to basket";
  cardBtnRef.classList.remove("added");
  cardBtnRef.disabled = false;

  renderBasket();
  saveToLocalStorage();
}

function changeAmount(dishID, type) {
  const basketItem = getBasketDishById(dishID);
  const dish = getDishById(dishID);

  type === "add" ? basketItem.amount++ : basketItem.amount--;

  renderAmount(basketItem);
  if (type === "sub" && basketItem.amount === 0) deleteFromBasket(dishID);
  renderBasketAmount;
  renderTotals();
  saveToLocalStorage();
}

function confirmOrder() {
  for (const basketDish of basket) {
    const btnRef = document.getElementById(`add-to-basket${basketDish.dishID}`);
    btnRef.innerText = "Add to basket";
    btnRef.disabled = false;
    btnRef.classList.remove("added");
  }
  deleteAllFromBasket();
  saveToLocalStorage();
  renderBasket();
  renderBasketAmount();
  showBasket();
  openDialog();
}
//#endregion

init();
