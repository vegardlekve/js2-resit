const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartContainer = document.querySelector(".cart");
    cartContainer.innerHTML = "";

    const totalItems = document.querySelector(".total b");
    totalItems.textContent = cart.length;

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const { name, price, colour } = item;
        totalPrice += price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const itemName = document.createElement("h5");
        itemName.textContent = name;
        itemName.style.color = colour;
        cartItem.appendChild(itemName);

        const itemPrice = document.createElement("h5");
        itemPrice.textContent = price + " kr";
        cartItem.appendChild(itemPrice);

        const removeButton = document.createElement("button");
        removeButton.classList.add("cart-delete-button");
        removeButton.addEventListener("click", () => {
            const confirmDelete = confirm(
                "Are you sure you want to delete this ice cream?"
            );
            if (confirmDelete) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        });
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
    });

    const totalPriceContainer = document.querySelector(".total-price b");
    totalPriceContainer.textContent = totalPrice;
}

renderCart();

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear your cart?");
    if (confirmClear) {
        cart.length = 0;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
});
