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

    let cartItems =
        document.getElementById("cart-items");

    let total =
        document.getElementById("total");

    let cartCount =
        document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let totalPrice = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {

        totalPrice +=
            item.price * item.quantity;

        totalItems +=
            item.quantity;


        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div>

                <button
                onclick="changeQuantity(
                ${index}, -1
                )">

                −

                </button>


                <span>

                ${item.quantity}

                </span>


                <button
                onclick="changeQuantity(
                ${index}, 1
                )">

                +

                </button>


                <button
                class="remove"

                onclick="removeItem(
                ${index}
                )">

                Remove

                </button>

            </div>

        </div>

        `;
    });


    total.innerText =
        totalPrice;

    cartCount.innerText =
        totalItems;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// Increase or decrease quantity

function changeQuantity(
    index,
    value
) {

    cart[index].quantity += value;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );
    }


    updateCart();
}


// Remove item

function removeItem(index) {

    cart.splice(
        index,
        1
    );

    updateCart();
}


// Open cart

document
.getElementById("cart-btn")
.addEventListener(
    "click",
    function () {

        document
        .getElementById("cart")
        .classList
        .add("active");

    }
);


// Close cart

document
.getElementById("close-cart")
.addEventListener(
    "click",
    function () {

        document
        .getElementById("cart")
        .classList
        .remove("active");

    }
);


// Search products

document
.getElementById("search")
.addEventListener(
    "keyup",
    function () {

        let value =
        this.value
        .toLowerCase();


        let products =
        document
        .querySelectorAll(
            ".product"
        );


        products.forEach(
            product => {

                let name =
                product
                .querySelector("h3")
                .innerText
                .toLowerCase();


                if (
                    name.includes(value)
                ) {

                    product.style
                    .display = "block";

                } else {

                    product.style
                    .display = "none";

                }

            }
        );

    }
);


// Show saved cart

updateCart();