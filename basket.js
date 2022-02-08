"use strict";

const basketIcon = document.querySelector(".cartIconWrap span");
const basketValueEl1 = document.querySelector(".basketTotalValue");
const basketTotalEl1 = document.querySelector(".basketTotal");
const basketEl1 = document.querySelector(".basket");

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl1.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addBasket')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToBasket(id, name, price);
});

function addToBasket(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketIcon.textContent = getTotalBasket().toString();
    basketValueEl1.textContent = getPriceBasket().toFixed(2);
    ProductBasket(id);
}

function getTotalBasket() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getPriceBasket() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function ProductBasket(id) {
    const basketRowEl1 = basketEl1.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl1) {
        ProductNewBasket(id);
        return;
    }
    basketRowEl1.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl1.querySelector('.productTotal').textContent = basket[id].count * basket[id].price;
}

function ProductNewBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>${basket[productId].price}</div>
            <div>
                $<span class="productTotal">${basket[productId].price * basket[productId].count}</span>
            </div>
        </div>
        `;
    basketTotalEl1.insertAdjacentHTML('beforebegin', productRow);
}

