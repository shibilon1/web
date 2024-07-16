// Define your cart object
var cart = {};

// Function to update the cart display with item names adjusted for spaces
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    for (const item in cart) {
        // Display name with spaces for better readability
        const displayName = getDisplayName(item);

        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${cart[item].image}" alt="${displayName}">
            <span>${displayName}</span>
            <div class="cart-item-quantity-controls">
                <button onclick="changeCartItemQuantity('${item}', -1)">-</button>
                <span>${cart[item].quantity}</span>
                <button onclick="changeCartItemQuantity('${item}', 1)">+</button>
            </div>
            <span>$${(cart[item].price * cart[item].quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
        total += cart[item].price * cart[item].quantity;
    }

    // Update total in the cart
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Function to get display name with spaces
function getDisplayName(itemId) {
    switch (itemId) {
        case 'sesameNoodles':
            return 'Sesame Noodles';
        case 'grilledLimeSalmon':
            return 'Grilled Lime Salmon';
        case 'veganPokeBowl':
            return 'Vegan Poke Bowl';
        // Add cases for other menu items here as needed
        default:
            return itemId; // return itemId if no match found
    }
}

// Function to change the quantity of items in the cart
function changeCartItemQuantity(item, change) {
    if (cart[item].quantity + change > 0) {
        cart[item].quantity += change;
    } else {
        delete cart[item];
    }
    updateCart();
}

// Function to add items to the cart
function addToCart(itemName, itemPrice, itemImage, quantity) {
    if (!cart[itemName]) {
        cart[itemName] = {
            price: itemPrice,
            quantity: quantity,
            image: itemImage
        };
    } else {
        cart[itemName].quantity += quantity;
    }
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart = {};
    updateCart();
}

// Export functions if needed in future modules
export { updateCart, addToCart, clearCart };
