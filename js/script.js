// Define your menu items with JavaScript identifiers (no spaces)
var menuQuantities = {
    sesameNoodles: 0,
    grilledLimeSalmon: 0,
    veganPokeBowl: 0,
    blackberryDumplings: 0,
    mushroomPierogi: 0,
    gyoza: 0,
    vanillaStrawberryIcedTea: 0,
    grilledPeachRosemaryProsecco: 0,
    icedGreenTea: 0,
    creamOfMushroomSoup: 0,
    wontonSoup: 0,
    tomYumSoup: 0,
    roastedPorkTenderloin: 0,
    steakRedWineSauce: 0,
    filetMignonShrimpLobsterCreamSauce: 0,
    caramelBrownieCheesecake: 0,
    blackForestCheesecake: 0,
    mintChipCheesecakeMousse: 0,
    fettuccineAlfredoShrimp: 0,
    chickenPasta: 0,
    creamyCajunShrimpPasta: 0,
    veganGreekSalad: 0,
    grilledCornSalad: 0,
    cornSaladMangoHalloumi: 0,
    recetteCocktailFruitea: 0,
    sonomaCutrer: 0,
    luigiBosca: 0,
    lemonMeringueCocktail: 0,
    kissMeQuickCocktail: 0,
    sparklingRoseCocktail: 0
};

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
function addToCart(itemName, itemPrice, itemImage) {
    const quantity = menuQuantities[itemName];
    if (quantity > 0) {
        if (!cart[itemName]) {
            cart[itemName] = {
                price: itemPrice,
                quantity: quantity,
                image: itemImage
            };
        } else {
            cart[itemName].quantity += quantity;
        }
        menuQuantities[itemName] = 0;
        document.getElementById(`${itemName}-menu-quantity`).textContent = '0';
        updateCart();
        
        // Toggle cart visibility
        const cartElement = document.getElementById('cart');
        if (cartElement.style.display === 'none') {
            cartElement.style.display = 'block';
        }
    }
}

// Function to update menu item quantities
function changeMenuItemQuantity(item, change) {
    if (menuQuantities[item] + change >= 0) {
        menuQuantities[item] += change;
        document.getElementById(`${item}-menu-quantity`).textContent = menuQuantities[item];
    }
}

// Function to toggle the display of the cart
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

// Function to open the checkout popup
function checkout() {
    document.getElementById('checkout-popup').style.display = 'flex';
}

// Function to close the checkout popup
function closeCheckoutPopup() {
    document.getElementById('checkout-popup').style.display = 'none';
}

// Function to toggle display of delivery fields based on order type
function toggleDeliveryFields() {
    const deliveryFields = document.getElementById('delivery-fields');
    const deliveryRadio = document.querySelector('input[name="order-type"]:checked');
    deliveryFields.style.display = deliveryRadio.value === 'delivery' ? 'block' : 'none';
}

// Function to place the order
function placeOrder() {
    alert('Order placed successfully!');
    cart = {};
    updateCart();
    closeCheckoutPopup();
}

// Initial update of cart display
updateCart();
