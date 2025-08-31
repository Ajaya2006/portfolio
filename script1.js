
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const cartToggle = document.getElementById('cart-toggle');
    const cartSection = document.getElementById('cart');
    const checkoutSection = document.getElementById('checkout-section');
    const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categorySelect = document.getElementById('category-select');

    let products = [];
    let cart = JSON.parse(localStorage.getItem('trendyMartCart')) || [];

    // Simulated product data
    async function fetchProducts() {
        products = [
            { id: 1, name: 'Wireless Earbuds', price: 59.99, category: 'electronics', image: 'images/earbuds.jpg' },
            { id: 2, name: 'Leather Jacket', price: 129.99, category: 'fashion', image: 'images/jacket.jpg' },
            { id: 3, name: 'Smart LED Bulb', price: 19.99, category: 'home', image: 'images/led-bulb.jpg' },
            { id: 4, name: 'Running Shoes', price: 89.99, category: 'fashion', image: 'images/shoes.jpg' },
            { id: 5, name: 'Bluetooth Keyboard', price: 39.99, category: 'electronics', image: 'images/keyboard.jpg' },
            { id: 6, name: 'Throw Pillow', price: 24.99, category: 'home', image: 'images/pillow.jpg' }
        ];
        displayProducts(products);
    }

    // Display products with animation
    function displayProducts(productsToDisplay) {
        productList.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'fade-in');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn primary-btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
        addEventListenersToCartButtons();
        animateElements();
    }

    // Animate elements with fade-in effect
    function animateElements() {
        const elements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(element => observer.observe(element));
    }

    // Add to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart();
            updateCart();
        }
    }

    // Update cart display
    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="fade-in">Your cart is empty.</li>';
            checkoutSection.classList.remove('visible');
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('fade-in');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <span>${item.name}</span>
                        <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <div class="cart-item-controls">
                        <button class="remove-from-cart" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                cartItemsList.appendChild(cartItem);
                total += item.price * item.quantity;
                itemCount += item.quantity;
            });
            checkoutSection.classList.add('visible');
        }
        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = itemCount;
        addEventListenersToRemoveButtons();
        animateElements();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('trendyMartCart', JSON.stringify(cart));
    }

    // Add event listeners to cart buttons
    function addEventListenersToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Add event listeners to remove buttons
    function addEventListenersToRemoveButtons() {
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                cart = cart.filter(item => item.id !== productId);
                saveCart();
                updateCart();
            });
        });
    }

    // Toggle cart sidebar and checkout section
    cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        cartSection.classList.toggle('open');
        if (cartSection.classList.contains('open') && cart.length > 0) {
            checkoutSection.classList.add('visible');
        } else {
            checkoutSection.classList.remove('visible');
        }
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSection.contains(e.target) && !cartToggle.contains(e.target) && cartSection.classList.contains('open')) {
            cartSection.classList.remove('open');
            checkoutSection.classList.remove('visible');
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            if (anchor.id !== 'cart-toggle') {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    // Category filter
    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    });

    // Checkout button in checkout section
    proceedCheckoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout (demo).');
        } else {
            alert('Your cart is empty.');
        }
    });

    // Initialize
    fetchProducts();
    updateCart();
});
