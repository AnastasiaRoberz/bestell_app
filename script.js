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
  let categoriesContent = "";
  for (const category of menu) {
    const dishes = renderDishCard(category);
    categoriesContent += categoryTemplate(category, dishes);
  }
  menuRef.innerHTML = categoriesContent;
}

function renderDishCard(category) {
  let dishes = "";
  for (const dish of category.dishes) {
    const formattedPrice = formatPrice(dish.price);
    const basketItem = getBasketDishById(dish.dishID);
    let btnText = "Add to basket";
    let btnClass = "";
    let isDisabled = "";
    if (basketItem) {
      btnText = "Added " + basketItem.amount;
      btnClass = "added";
      isDisabled = "disabled";
    }
    dishes += dishCardTemplate(
      dish,
      formattedPrice,
      btnClass,
      btnText,
      isDisabled,
    );
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
  }
}

function renderAllBasketCards() {
  const basketCardsWrapper = document.getElementById("basket-cards-wrapper");
  for (const basketDish of basket) {
    basketCardsWrapper.innerHTML += renderBasketCard(basketDish);
    renderAmount(basketDish);
  }
}

const renderBasketCard = (basketDish) =>
  basketCardTemplate(getDishById(basketDish.dishID));
//#endregion

//#region USER INTERACTIONS
function addToBasket(dishID, btnRef) {
  const basketItem = getBasketDishById(dishID);
  const dish = getDishById(dishID);
  const basketCardWrapper = document.getElementById("basket-cards-wrapper");

  if (basketItem) {
    basketItem.amount++;
    renderAmount(dish);
  } else {
    basket.push({ "dishID": dishID, "amount": 1 });

    if (basket.length === 1) {
      renderBasket();
    } else {
      basketCardWrapper.innerHTML += renderBasketCard(
        basket[basket.length - 1],
      );
      updateBasketTotals();
    }

    btnRef.innerText = addedBtnContent(1);
    btnRef.classList.add("added");
    btnRef.disabled = true;
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

  saveToLocalStorage();
  renderAllBasketCards();
  renderTotals();
}

function changeAmount(dishID, type) {
  const basketItem = getBasketDishById(dishID);
  const dish = getDishById(dishID);

  type === "add" ? basketItem.amount++ : basketItem.amount--;

  renderAmount(basketItem);
  if (type === "sub" && basketItem.amount === 0) deleteFromBasket(dishID);
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
  openDialog();
}
//#endregion

init();
