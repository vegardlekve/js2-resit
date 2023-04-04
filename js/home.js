import iceCreams from "./data/ice-creams.js";

const iceCreamsContainer = document.querySelector(".ice-creams");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart(iceCream) {
    const index = cart.findIndex((item) => item.id === iceCream.id);
    if (index === -1) {
        cart.push(iceCream);
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderIceCreams();
}

function renderIceCreams() {
    iceCreamsContainer.innerHTML = "";
    iceCreams.forEach((iceCream) => {
        const iceCreamInCart = cart.some((item) => item.id === iceCream.id);
        const button = document.createElement("button");
        button.classList.add("cart-button");
        button.classList.toggle("added", iceCreamInCart);
        button.addEventListener("click", () => {
            updateCart(iceCream);
        });

        const iceCreamDiv = document.createElement("div");
        iceCreamDiv.classList.add("ice-cream");
        iceCreamDiv.style.border = `3px solid ${iceCream.colour}`;
        iceCreamDiv.innerHTML = `
      <h2 style="color: ${iceCream.colour};">${iceCream.name}</h2>
      <h5>${iceCream.flavours.join(", ")}</h5>
      <p class="price">${iceCream.price}</p>
    `;
        iceCreamDiv.appendChild(button);
        iceCreamsContainer.appendChild(iceCreamDiv);
    });
}

renderIceCreams();
