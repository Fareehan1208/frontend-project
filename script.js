console.log("Welcome to Lunara! ")

let cart = [];

const allAddButtons = document.querySelectorAll(".add-to-cart");

const cartCountEl = document.querySelector("#cart-count");

const cartPanel = document.querySelector("#cart-panel");

const overlay = document.querySelector("#cart-overlay");

const closeCartBtn = document.querySelector("#close-cart");

const cartItemsContainer = document.querySelector("#cart-items-container");

const cartTotalEl = document.querySelector("#cart-total");

document.querySelector(".nav-bar div:last-child").addEventListener("click", function() {
    cartPanel.classList.add("open");
    overlay.style.display = "block";
});

function closeCart() {
    cartPanel.classList.remove("open");
    overlay.style.display = "none";
}
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);


for (let i=0; i < allAddButtons.length; i++){

allAddButtons[i].addEventListener("click",
    function(){
        
        const clickedButton = allAddButtons[i];

        const productCard = clickedButton.closest(".card");


        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);

        const existingItem = cart.find(function(item) {
            return item.id === id;
        });

        if (existingItem) {
            existingItem.qty = existingItem.qty + 1;
        } else {
            cart.push({ id: id, name: name, price: price, qty: 1 });
        }
        
        renderCart(); 
    });
}
function renderCart() {
    cartItemsContainer.innerHTML = ""; 
    let totalPrice = 0;
    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        totalPrice = totalPrice + (item.price * item.qty);
        totalItems = totalItems + item.qty;

        cartItemsContainer.innerHTML += `
            <div class="cart-item-row">
                <div>
                    <strong>${item.name}</strong><br>
                    <span>#${item.price.toFixed(2)}</span>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
    }

    cartCountEl.textContent = totalItems;
    cartTotalEl.textContent = "#" + totalPrice.toFixed(2);
}
window.changeQty = function(id, amount) {
    const item = cart.find(function(item) {
        return item.id === id;
    });
    
    item.qty = item.qty + amount;

    if (item.qty === 0) {
        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }
    renderCart(); 
}
