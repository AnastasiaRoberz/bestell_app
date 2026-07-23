//#region CARD TEMPLATES
function dishCardTemplate(currentDish, formattedPrice) {
  return /*html*/ `
    <article class="card">
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
        <button class="add-to-basket" id="add-to-basket${currentDish.dishID}" onclick="addToBasket('${currentDish.dishID}', this)">Add to basket</button>
      </div>
    </article>
  `;
}

function categoryTemplate(currentCategory, dishes) {
  return /*html*/ `
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
}
//#endregion

//#region BASKET TEMPLATES
function basketContentTemplate(basketCards, basketTable) {
  return /*html*/ `
    <div class="basket-cards">${basketCards}</div>
    <div class="confirm-order">${basketTable}</div>
  `;
}

function basketCardTemplate(dish, basketDish, formattedPrice) {
  return /*html*/ `
    <div class="basket-card">
      <div class="basket-dish">
        <p class="dish-name">${basketDish.amount}x ${dish.name}
        </p>
        <svg class="icon-delete" onclick="deleteFromBasket('${basketDish.dishID}')">
          <use href="./assets/icons/icons.svg#icon-delete"></use>
        </svg>
      </div>
      <div class="basket-info">
        <div class="basket-amount">
          <svg class="change-amount" id="btn-sub-${dish.dishID}" onclick="changeAmount(${basketDish.dishID}, 'sub')">
            <use href="./assets/icons/icons.svg#icon-sub"></use>
          </svg>
          <span class="amount-value" id="">${basketDish.amount}</span>
          <svg class="change-amount" onclick="changeAmount(${basketDish.dishID}, 'add')">
            <use href="./assets/icons/icons.svg#icon-add"></use>
          </svg>
        </div>
        <p>${formattedPrice}</p>
      </div>
    </div>
  `;
}

function basketConfirmOrderTemplate(subtotal, total, formattedFee) {
  return /*html*/ `
    <table class="costs">
      <tr>
        <th>Subtotal</th>
        <td>${subtotal}</td>
      </tr>
      <tr>
        <th>Delivery fee</th>
        <td>${formattedFee}</td>
      </tr>
      <tr class="total">
        <th>Total</th>
        <td>${total}</td>
      </tr>
    </table>
    <button class="btn-buy">Buy now (${total})</button>
  `;
}
//#endregion

//#region ASSETS TEMPLATES
function addedBtnContent(amount) {
  return /*html*/ `Added ${amount}`;
}
//#endregion
