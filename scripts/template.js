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
const basketEmptyTemplate = () => /*html*/ `
  <p class="basket-txt">Nothing here yet.<br>
  Go ahead and choose something delicious!</p>
  <svg class="icon-basket-empty">
    <use href="./assets/icons/icons.svg#icon-basket"></use>
  </svg>
`;

const basketContentTemplate = (basketCards, basketTable) => /*html*/ `
  <div class="basket-cards" id="basket-cards-wrapper">${basketCards}</div>
  <div class="confirm-order" id="basket-total-table">${basketTable}</div>
`;

const basketCardTemplate = (dish, basketDish, formattedPrice) => /*html*/ `
  <div class="basket-card">
    <div class="basket-dish">
      <p class="dish-name">${dish.name}
      </p>
      <button class="icon-delete btn-icon" onclick="deleteFromBasket('${basketDish.dishID}')">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
    <div class="basket-info">
      <div class="basket-amount">
        <button class="change-amount btn-icon" id="btn-sub-${dish.dishID}" onclick="changeAmount('${dish.dishID}', 'sub', this)">
          <i class="bi bi-dash-circle icon-outline"></i>
          <i class="bi bi-dash-circle-fill icon-filled"></i>
        </button>
        <p class="amount-value" id="amount-${dish.dishID}">${basketDish.amount}</p>
        <button class="change-amount btn-icon" onclick="changeAmount('${dish.dishID}', 'add', this)">
          <i class="bi bi-plus-circle icon-outline"></i>
          <i class="bi bi-plus-circle-fill icon-filled"></i>
        </button>
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
      <th class="delivery-fee">Delivery fee</th>
      <td class="delivery-fee">${formattedFee}</td>
    </tr>
    <tr class="total-row">
      <th class="total">Total</th>
      <td class="total" id="basket-total">${total}</td>
    </tr>
  </table>
  <button class="btn-buy" id="btn-buy" onclick="confirmOrder()">Buy now (${total})</button>
`;
//#endregion

//#region ASSETS TEMPLATES
const addedBtnContent = (amount) => /*html*/ `Added ${amount}`;
//#endregion
