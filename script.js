let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

// Add product to cart

function addToCart(name, price) {
    let product = cart.find(
        item => item.name === name
    );

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("total");
    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        // Create cart item safely
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        let details = document.createElement("div");

        let name = document.createElement("h4");
        name.textContent = item.name;

        let price = document.createElement("p");
        price.textContent = `₹${item.price}`;

        details.append(name, price);

        let controls = document.createElement("div");

        let decreaseButton = document.createElement("button");
        decreaseButton.textContent = "−";
        decreaseButton.type = "button";
        decreaseButton.addEventListener("click", () => {
            changeQuantity(index, -1);
        });

        let quantity = document.createElement("span");
        quantity.textContent = ` ${item.quantity} `;

        let increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.type = "button";
        increaseButton.addEventListener("click", () => {
            changeQuantity(index, 1);
        });

        let removeButton = document.createElement("button");
        removeButton.className = "remove";
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.addEventListener("click", () => {
            removeItem(index);
        });

        controls.append(
            decreaseButton,
            quantity,
            increaseButton,
            removeButton
        );

        cartItem.append(details, controls);
        cartItems.appendChild(cartItem);
    });

    total.textContent = totalPrice;
    cartCount.textContent = totalItems;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase or decrease quantity

function changeQuantity(index, value) {
    if (!cart[index]) return;

    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Remove item

function removeItem(index) {
    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);
    updateCart();
}

// Open cart

document.getElementById("cart-btn").addEventListener("click", function () {
    document.getElementById("cart").classList.add("active");
});

// Close cart

document.getElementById("close-cart").addEventListener("click", function () {
    document.getElementById("cart").classList.remove("active");
});

// Search products

document.getElementById("search").addEventListener("input", function () {
    let value = this.value.toLowerCase().trim();

    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let name = product.querySelector("h3").textContent.toLowerCase();

        product.style.display = name.includes(value) ? "" : "none";
    });
});

// Checkout

document.querySelector(".checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    let totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let orderDetails = cart.map(
        item => `${item.name} × ${item.quantity}`
    ).join("\n");

    alert(
        "Order Summary\n\n" +
        orderDetails +
        "\n\nTotal Items: " + totalItems +
        "\nTotal Amount: ₹" + totalPrice +
        "\n\nThank you for shopping with ShopEasy!"
    );

    // Clear cart after demo checkout
    cart = [];
    updateCart();

    document.getElementById("cart").classList.remove("active");
});

// Show saved cart when the page loads

updateCart();
