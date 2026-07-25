//#region
const formatPrice = (value) =>
  value
    .toLocaleString("de-DE", { style: "currency", currency: "EUR" })
    .replace(/\s+/, "");

const getDishById = (dishID) => {
  for (const category of menu) {
    const found = category.dishes.find((dish) => dish.dishID === dishID);
    if (found) return found;
  }
  return null;
};

const getBasketDishById = (id) =>
  basket.find((item) => item.dishID === id) || null;
//#endregion

//#region CALC FUNCTIONS
function calcBasketSubtotal() {
  let subtotal = 0;
  for (const basketDish of basket) {
    const dish = getDishById(basketDish.dishID);
    if (dish) subtotal += dish.price * basketDish.amount;
  }
  return subtotal;
}

const calcBasketTotal = () => formatPrice(calcBasketSubtotal() + deliveryFee);

const deleteAllFromBasket = () => (basket = []);
//#endregion

//#region RENDER SINGLE VALUES
function renderAmount(dish) {
  const amount = getBasketDishById(dish.dishID)?.amount || 0;

  const amountRef = document.getElementById(`amount-${dish.dishID}`);
  const cardPriceRef = document.getElementById(
    `basket-card-price-${dish.dishID}`,
  );
  const cardBtnRef = document.getElementById(`add-to-basket${dish.dishID}`);

  if (amountRef) amountRef.innerText = amount;
  if (cardPriceRef) cardPriceRef.innerText = formatPrice(dish.price * amount);
  if (cardBtnRef) cardBtnRef.innerText = addedBtnContent(amount);
}

function updateBasketTotals() {
  const subtotalRef = document.getElementById("basket-subtotal");
  const totalRef = document.getElementById("basket-total");
  const buyBtnRef = document.getElementById("btn-buy");

  if (subtotalRef) subtotalRef.innerText = formatPrice(calcBasketSubtotal());
  if (totalRef) totalRef.innerText = calcBasketTotal();
  if (buyBtnRef) buyBtnRef.innerText = `Buy now (${calcBasketTotal()})`;
}
//#endregion

//#region DIALOG
function openDialog() {
  dialogRef.showModal();
  dialogRef.classList.add("opened");
}

function closeDialog() {
  dialogRef.close();
  dialogRef.classList.remove("opened");
}

function bubblingProtection(event) {
  event.stopPropagation();
}
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
