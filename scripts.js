// Sample menu data
const menuData = {
    breakfast: [
        { name: "Masala Dosa", price: 10, imgSrc: "MasalaDosa.jpg" },
        { name: "Idli Sambar", price: 8, imgSrc: "Idli.jpg" },
        { name: "Poha", price: 6, imgSrc: "Poha.jpg" },
        { name: "Vada Pav", price: 4, imgSrc: "VadaPav.jpeg" },
        { name: "Sabudana Vada", price: 7, imgSrc: "Sabudana.jpg" },
        { name: "Upma", price: 8, imgSrc: "Upma.jpg" },
        { name: "Cheese Dosa", price: 12, imgSrc: "Cheese.jpg" },
        { name: "Aloo Paratha", price: 8, imgSrc: "Prantha.jpg" }
    ],
    curries: [
        { name: "Paneer Butter Masala", price: 18, imgSrc: "ButterMasala.jpg" },
        { name: "Chole", price: 14, imgSrc: "Chole.jpeg" },
        { name: "Rajma", price: 14, imgSrc: "Rajma.jpeg" },
        { name: "Palak Paneer", price: 20, imgSrc: "Palak.jpeg" },
        { name: "Kadhi Pakora", price: 12, imgSrc: "Kadhi.jpeg" },
        { name: "Bhindi Masala", price: 10, imgSrc: "Bhindi.jpeg" },
        { name: "Matar Paneer", price: 20, imgSrc: "Matar.jpeg" },
        { name: "Aloo Gobi", price: 12, imgSrc: "Gobi.jpeg" }
    ],
    breads: [
        { name: "Garlic Naan", price: 5, imgSrc: "b1.jpeg" },
        { name: "Tandoori Roti", price: 2, imgSrc: "b2.jpg" },
        { name: "Cheese Naan", price: 5, imgSrc: "b3.jpg" },
        { name: "Plane Naan", price: 3, imgSrc: "b4.jpeg" },
        { name: "Lacha Parantha", price: 3, imgSrc: "b5.jpeg" },
        { name: "Missi Roti", price: 3, imgSrc: "b6.jpeg" },
        { name: "Rumali Roti", price: 2, imgSrc: "b7.jpeg" },
        { name: "Chappati", price: 1, imgSrc: "b8.jpeg" }
    ],
    rice: [
        { name: "Veg Biryani", price: 15, imgSrc: "r1.jpeg" },
        { name: "Jeera Rice", price: 8, imgSrc: "r2.jpeg" },
        { name: "Masala Khichdi", price: 7, imgSrc: "r3.jpeg" },
        { name: "Veg Pulao", price: 8, imgSrc: "r4.jpeg" },
        { name: "Panner Pulao", price: 14, imgSrc: "r5.jpeg" },
        { name: "Plain Rice", price: 5, imgSrc: "r6.jpeg" },
        { name: "Biriyani Rice", price: 8, imgSrc: "r7.jpeg" },
        { name: "Masala Rice", price: 7, imgSrc: "r8.jpeg" }
    ],
    desserts: [
        { name: "Rasgulla", price: 8, imgSrc: "d1.jpg" },
        { name: "Jalebi", price: 6, imgSrc: "d2.jpeg" },
        { name: "Gajar Halwa", price: 7, imgSrc: "d3.jpeg" },
        { name: "Fruit Custard", price: 4, imgSrc: "d4.jpg" },
        { name: " Kheer", price: 5, imgSrc: "d5.jpg" },
        { name: "Shahi Tukda", price: 7, imgSrc: "d6.jpg" },
        { name: "Kulfi", price: 4, imgSrc: "d7.jpeg" },
        { name: "Gulab Jamun", price: 8, imgSrc: "d8.jpeg" }
    ]
};

// Function to initialize the menu
function initializeMenu(category) {
    const menuItemsContainer = document.querySelector('.menu-items');
    menuItemsContainer.innerHTML = '';

    const items = menuData[category];
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="decrement-btn">-</button>
                <input type="number" class="quantity-input" value="0" min="0">
                <button class="increment-btn">+</button>
            </div>
        `;

        const decrementBtn = menuItem.querySelector('.decrement-btn');
        const incrementBtn = menuItem.querySelector('.increment-btn');
        const quantityInput = menuItem.querySelector('.quantity-input');

        decrementBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 0) {
                quantityInput.value = currentValue - 1;
                updateTotal();
            }
        });

        incrementBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updateTotal();
        });

        menuItemsContainer.appendChild(menuItem);
    });
}

// Function to update total price
function updateTotal() {
    const menuItems = document.querySelectorAll('.menu-item');
    let total = 0;

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
        total += quantity * price;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to show order summary
function showOrderSummary() {
    const summaryItemsContainer = document.querySelector('.summary-items');
    summaryItemsContainer.innerHTML = '';

    const menuItems = document.querySelectorAll('.menu-item');
    let total = 0;

    menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        if (quantity > 0) {
            const name = item.querySelector('h3').textContent;
            const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
            total += quantity * price;

            const summaryItem = document.createElement('div');
            summaryItem.classList.add('summary-item');
            summaryItem.innerHTML = `
                <h3>${name}</h3>
                <p>Quantity: ${quantity}</p>
                <p>Price: $${(quantity * price).toFixed(2)}</p>
            `;

            summaryItemsContainer.appendChild(summaryItem);
        }
    });

    document.getElementById('summary-total').textContent = total.toFixed(2);
}

// Event listeners for menu buttons
document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.menu-btn.active').classList.remove('active');
        button.classList.add('active');
        initializeMenu(button.getAttribute('data-menu'));
    });
});

// Event listener for checkout button
document.querySelector('.checkout-btn').addEventListener('click', () => {
    showOrderSummary();
    document.querySelector('.menu-section').style.display = 'none';
    document.querySelector('.order-summary').style.display = 'block';
});

// Event listener for pay button
document.querySelector('.pay-btn').addEventListener('click', () => {
    alert('Thank you for your order!');
    // Reset the menu and summary
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.value = 0;
    });
    updateTotal();
    document.querySelector('.menu-section').style.display = 'block';
    document.querySelector('.order-summary').style.display = 'none';
});

// Initialize the menu with the first category
initializeMenu('breakfast');


