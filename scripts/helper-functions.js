//#region
const formatPrice = (value) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR" }).replace(/\s+/, "");

const getDishById = (basketDishID) => {
  for (const category of menu) {
    const found = category.dishes.find((dish) => dish.dishID === basketDishID);
    if (found) return found;
  }
  return null;
};

const getBasketDishById = (dishID) => basket.find((basketItem) => basketItem.dishID === dishID) || null;
//#endregion

//#region
const deleteAllFromBasket = () => {
  basket = [];
  saveToLocalStorage();
};

function getCategoryDetailClass(categoryName) {
  if (categoryName === "Burger") return "burger-details";
  if (categoryName === "Pizza") return "pizza-details";
  return "";
}

function getBtnParameters(basketItem) {
  if (!basketItem) return { text: "Add to basket", cssClass: "", disabled: "" };
  return { text: "Added " + basketItem.amount, cssClass: "added", disabled: "disabled" };
}
//#endregion

//#region RENDER SINGLE VALUES
const renderAmount = (basketDish) => {
  const dish = getDishById(basketDish.dishID);
  document.getElementById(`basket-amount-${basketDish.dishID}`).innerText = basketDish.amount;
  document.getElementById(`basket-card-price-${basketDish.dishID}`).innerText = formatPrice(dish.price * basketDish.amount);
  document.getElementById(`add-to-basket${dish.dishID}`).innerText = addedBtnContent(basketDish.amount);
  renderBasketAmount();
};

function renderBasketAmount() {
  const iconNav = document.getElementById("icon-nav-basket");
  const amountNav = document.getElementById("amount-nav-basket");
  let amount = 0;
  for (basketItem of basket) {
    amount += basketItem.amount;
  }
  if (amount > 0) {
    iconNav.style.fill = "var(--orange)";
    amountNav.classList.add("opened");
    amountNav.innerText = amount;
  } else if (amount === 0) {
    amountNav.style.display = "none";
    iconNav.style.fill = "white";
  }
}

function renderTotals() {
  let subtotal = 0;
  let total = 0;

  for (const basketDish of basket) {
    const dish = getDishById(basketDish.dishID);
    subtotal += dish.price * basketDish.amount;
  }

  document.getElementById("basket-subtotal").innerText = formatPrice(subtotal);
  document.getElementById("basket-total").innerText = formatPrice(
    subtotal + deliveryFee,
    (document.getElementById("delivery-fee").innerText = formatPrice(deliveryFee)),
  );
}

function handleNewBasketItem(dishID, btnRef) {
  basket.push({ "dishID": dishID, "amount": 1 });
  const basketCardWrapper = document.getElementById("basket-cards-wrapper");

  if (basket.length === 1) {
    renderBasket();
  } else {
    basketCardWrapper.innerHTML += renderBasketCard(basket[basket.length - 1]);
    renderAmount(basket[basket.length - 1]);
    renderBasketAmount();
  }
  btnRef.innerText = addedBtnContent(1);
  btnRef.classList.add("added");
  btnRef.disabled = true;
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
