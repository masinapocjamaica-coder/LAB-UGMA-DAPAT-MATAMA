
// Student Supplies Ordering System
// Step 3: Shopping Cart and Calculations

// Array to store selected products
let cart = [];

// Format prices in Philippine pesos
function formatPrice(amount) {
    return "₱" + amount.toFixed(2);
}

// Add a product to the shopping cart
function addToCart(name, price) {

    // Check if product already exists in the cart
    let existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        // Increase quantity if already in cart
        existingProduct.quantity++;
    } else {
        // Add a new product to the cart
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

// Increase or decrease product quantity
function changeQuantity(index, change) {

    cart[index].quantity += change;

    // Remove item if quantity reaches zero
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Remove a product from the cart
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// Display cart items and update calculations
function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let totalAmount = document.getElementById("total-amount");

    // Clear previous cart display
    cartItems.innerHTML = "";

    // Show message if cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p>Your cart is currently empty.</p>";

        totalAmount.textContent = formatPrice(0);
        return;
    }

    let total = 0;

    // Display every product in the cart
    cart.forEach((item, index) => {

        // Calculate subtotal
        let subtotal = item.price * item.quantity;

        // Add subtotal to total
        total += subtotal;

        // Create cart item container
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Unit Price: ${formatPrice(item.price)}</p>
                <p>Subtotal: ${formatPrice(subtotal)}</p>
            </div>

            <div class="cart-controls">
                <button type="button"
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button type="button"
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button type="button" class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // Display the updated total
    totalAmount.textContent = formatPrice(total);
}
