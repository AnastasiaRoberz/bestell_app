//#region CARD TEMPLATES
const dishCardTemplate = (
  currentDish,
  formattedPrice,
  btnClass,
  btnText,
  isDisabled,
) => /*html*/ `
  <article class="card" id="card-dish${currentDish.dishID}">
    <img
      class="dish-img"
      src="./assets/pngs/dishes/${currentDish.fileName}"
      alt=""
    />
    <div class="dish">
      <h3>${currentDish.name}</h3>
      <p class="dish-description">${currentDish.description}</p>
    </div>
    <div class="order">
      <p class="price">${formattedPrice}</p>
      <button class="add-to-basket ${btnClass}" id="add-to-basket${currentDish.dishID}" onclick="addToBasket('${currentDish.dishID}', this)" ${isDisabled}>${btnText}</button>
    </div>
  </article>
`;

const categoryTemplate = (currentCategory, dishes) => /*html*/ `
  <div class="category">
    <div class="category-header">
      <div class="category-header-content">
        <img
          class="category-logo"
          id="category-logo"
          src="./assets/icons/${currentCategory.iconFileName}"
          alt="Icon eines Burgers"
        />
        <h2 id="category-name">${currentCategory.category}</h2>
      </div>
    </div>
    <div class="cards-wrapper">${dishes}</div>
  </div>
`;
//#endregion

//#region BASKET TEMPLATES
const basketContentTemplate = (basketCards, basketTable) => /*html*/ `
  <div class="basket-cards" id="basket-cards-wrapper">${basketCards}</div>
  <div class="confirm-order" id="basket-total-table">${basketTable}</div>
`;

const basketCardTemplate = (dish, basketDish, formattedPrice) => /*html*/ `
  <div class="basket-card">
    <div class="basket-dish">
      <p class="dish-name">${dish.name}
      </p>
      <svg class="icon-delete" onclick="deleteFromBasket('${basketDish.dishID}')">
        <use href="./assets/icons/icons.svg#icon-delete"></use>
      </svg>
    </div>
    <div class="basket-info">
      <div class="basket-amount">
        <svg class="change-amount" id="btn-sub-${dish.dishID}" onclick="changeAmount('${dish.dishID}', 'sub', this)">
          <use href="./assets/icons/icons.svg#icon-sub"></use>
        </svg>
        <p class="amount-value" id="amount-${dish.dishID}">${basketDish.amount}</p>
        <svg class="change-amount" onclick="changeAmount('${dish.dishID}', 'add', this)">
          <use href="./assets/icons/icons.svg#icon-add"></use>
        </svg>
      </div>
      <p id="basket-card-price-${dish.dishID}">${formattedPrice}</p>
    </div>
  </div>
`;

const basketConfirmOrderTemplate = (subtotal, total, formattedFee) => /*html*/ `
  <table class="costs">
    <tr>
      <th>Subtotal</th>
      <td id="basket-subtotal">${subtotal}</td>
    </tr>
    <tr>
      <th>Delivery fee</th>
      <td>${formattedFee}</td>
    </tr>
    <tr class="total">
      <th>Total</th>
      <td id="basket-total">${total}</td>
    </tr>
  </table>
  <button class="btn-buy" id="btn-buy">Buy now (${total})</button>
`;
//#endregion

//#region ASSETS TEMPLATES
const addedBtnContent = (amount) => /*html*/ `Added ${amount}`;
//#endregion
