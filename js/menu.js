// Sample menu items data (you can fetch this from an API or database)
const menuItems = [
    { id: 'sesameNoodles', name: 'Sesame Noodles', description: 'Delicious Asian-style noodles with sesame sauce.', price: 8.99, image: 'menuimg/sesame-noodles.jpg' },
    { id: 'grilledLimeSalmon', name: 'Grilled Lime Salmon', description: 'Grilled salmon topped with avocado-mango salsa, served with coconut rice.', price: 12.99, image: 'menuimg/grilled-lime-salmon.jpg' },
    { id: 'veganPokeBowl', name: 'Vegan Poke Bowl', description: 'A bowl of fresh vegetables, tofu, and rice in a savory dressing.', price: 10.99, image: 'menuimg/vegan-poke-bowl.jpg' },
    // Add more menu items here as needed
];

// Function to dynamically generate menu items
function generateMenu() {
    const menuItemsContainer = document.getElementById('menuItems');

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.setAttribute('id', `menu-item-${item.id}`);

        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button onclick="changeMenuItemQuantity('${item.id}', -1)">-</button>
                <span id="${item.id}-menu-quantity">0</span>
                <button onclick="changeMenuItemQuantity('${item.id}', 1)">+</button>
            </div>
            <button onclick="addToCart('${item.id}', ${item.price}, '${item.image}')">Add to Cart</button>
        `;

        menuItemsContainer.appendChild(menuItem);
    });
}

// Function to add item to the cart
function addToCart(itemId, price, imageUrl) {
    const cartItem = {
        id: itemId,
        price: price,
        image: imageUrl
    };

    // Add the item to the cart (implementation in cart.js)
    addToCartItems(cartItem);

    // Update the cart total
    updateCartTotal();
}

// Function to change item quantity in the menu
function changeMenuItemQuantity(itemId, change) {
    const quantitySpan = document.getElementById(`${itemId}-menu-quantity`);
    let currentQuantity = parseInt(quantitySpan.textContent);

    // Ensure quantity doesn't go below 0
    if (currentQuantity + change >= 0) {
        currentQuantity += change;
        quantitySpan.textContent = currentQuantity;
    }
}

// Initialize the menu on page load
generateMenu();
