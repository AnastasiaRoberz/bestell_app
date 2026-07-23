//#region
function formatPrice(value) {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function getDishById(dishID) {
  for (const currentCategory of menu) {
    const foundDish = currentCategory.dishes.find(
      (dish) => dish.dishID === dishID,
    );
    if (foundDish) return foundDish;
  }
  return null;
}
//#endregion

//#region CALC FUNCTIONS
function calcBasketSubtotal() {
  let subtotal = 0;
  for (const basketDish of basket) {
    const dish = getDishById(basketDish.dishID);
    subtotal += dish.price * basketDish.amount;
  }
  return subtotal;
}

function calcBasketTotal() {
  return formatPrice(calcBasketSubtotal() + deliveryFee);
}
//#endregion

//#region RENDER SINGLE VALUES
function renderAmount(currentDish) {}

//#endregion

//#region STORAGE
function saveToLocalStorage() {
  localStorage.setItem("menu", JSON.stringify(menu));
  localStorage.setItem("currentBasket", JSON.stringify(basket));
}

function getFromLocalStorage() {
  let storageMenuArray = JSON.parse(localStorage.getItem("menu"));
  let storageBasketArray = JSON.parse(localStorage.getItem("currentBasket"));
  if (storageMenuArray) menu = storageMenuArray;
  if (storageBasketArray) basket = storageBasketArray;
}
//#endregion
