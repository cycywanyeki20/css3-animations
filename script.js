// ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES =====

// Global variables
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Product data - demonstrating data structure
const products = [
    { id: 1, name: "Ankara Dress", price: 89.99, category: "women", image: "👗" },
    { id: 2, name: "Kente Shirt", price: 59.99, category: "men", image: "👔" },
    { id: 3, name: "Maasai Beads", price: 29.99, category: "accessories", image: "📿" },
    { id: 4, name: "Modern Boubou", price: 79.99, category: "women", image: "🥻" },
    { id: 5, name: "African Print Pants", price: 49.99, category: "men", image: "👖" },
    { id: 6, name: "Wooden Bracelet", price: 19.99, category: "accessories", image: "💍" }
];

// Function demonstrating parameters and return values
function calculateTotalPrice(items) {
    // Local scope variable
    let total = 0;
    
    // Using array method with callback function
    items.forEach(item => {
        total += item.price * item.quantity;
    });
    
    return total; // Return value
}

// Function with default parameters
function formatCurrency(amount, currency = '$') {
    return `${currency}${amount.toFixed(2)}`;
}

// Function demonstrating object manipulation
function createCartItem(product, quantity = 1) {
    // Return a new object with additional properties
    return {
        ...product, // Spread operator
        quantity: quantity,
        total: product.price * quantity
    };
}

// Reusable animation function
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeProducts();
    initializeFashionShow();
    initializeContactForm();
    initializeCart();
    initializeScrollAnimations();
}

// Loading screen functionality
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            // Add mobile menu functionality here
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Products functionality
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Display all products initially
    displayProducts(products);
    
    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function displayProducts(productsArray) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsArray.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
        
        // Animate cards with delay
        setTimeout(() => {
            productCard.classList.add('animate');
        }, index * 100);
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${formatCurrency(product.price)}</div>
            <button class="add-to-cart" data-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add click event for add to cart
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product));
    
    return card;
}

function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            // Re-trigger animation
            card.classList.remove('animate');
            setTimeout(() => card.classList.add('animate'), 50);
        } else {
            card.style.display = 'none';
        }
    });
}

// Fashion show functionality
function initializeFashionShow() {
    const outfitButtons = document.querySelectorAll('.outfit-btn');
    const resetButton = document.getElementById('resetOutfit');
    const outfitDisplay = document.getElementById('outfitDisplay');
    
    outfitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const outfit = button.getAttribute('data-outfit');
            if (outfit) {
                changeOutfit(outfit);
            }
        });
    });
    
    resetButton.addEventListener('click', () => {
        resetOutfit();
    });
}

function changeOutfit(outfitType) {
    const outfitDisplay = document.getElementById('outfitDisplay');
    const outfits = {
        dress: { emoji: '👗', color: '#d4af37' },
        shirt: { emoji: '👔', color: '#2c5530' },
        accessories: { emoji: '💎', color: '#e74c3c' }
    };
    
    const outfit = outfits[outfitType];
    if (outfit) {
        // Add CSS animation class
        outfitDisplay.style.animation = 'none';
        setTimeout(() => {
            outfitDisplay.innerHTML = outfit.emoji;
            outfitDisplay.style.background = `linear-gradient(45deg, ${outfit.color}, ${lightenColor(outfit.color, 20)})`;
            outfitDisplay.style.animation = 'pulse 0.5s ease';
        }, 50);
    }
}

function resetOutfit() {
    const outfitDisplay = document.getElementById('outfitDisplay');
    outfitDisplay.innerHTML = '👤';
    outfitDisplay.style.background = 'linear-gradient(45deg, #e8e8e8, #f5f5f5)';
    outfitDisplay.style.animation = 'spin 0.5s ease';
}

// Utility function to lighten colors
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Cart functionality
function initializeCart() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartModal = document.getElementById('cartModal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartDisplay();
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    checkoutBtn.addEventListener('click', () => {
        checkout();
    });
    
    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

function addToCart(product) {
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
    } else {
        cart.push(createCartItem(product, 1));
    }
    
    updateCartCount();
    showAddToCartAnimation();
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // Add animation
    cartCountElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 300);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotalElement = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    cartTotal = calculateTotalPrice(cart);
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            
            const removeBtn = cartItem.querySelector('.remove-item');
            removeBtn.addEventListener('click', () => removeFromCart(item.id));
            
            cartItems.appendChild(cartItem);
        });
    }
    
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simulate checkout process
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    
    // Show success animation
    showCheckoutAnimation();
    
    // Reset cart
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

function showAddToCartAnimation() {
    // Create floating animation element
    const animation = document.createElement('div');
    animation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: floatToCart 1s ease-in-out forwards;
        z-index: 1000;
    `;
    
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
    }, 1000);
}

function showCheckoutAnimation() {
    const animation = document.createElement('div');
    animation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(212, 175, 55, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
        animation: fadeInOut 2s ease-in-out forwards;
    `;
    animation.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed!</h2>
            <p>Thank you for your purchase</p>
        </div>
    `;
    
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
    }, 2000);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        if (validateForm(formData)) {
            submitContactForm(formData);
        }
    });
}

function validateForm(formData) {
    // Simple validation
    if (!formData.name.trim()) {
        showFormError('Please enter your name');
        return false;
    }
    
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
        showFormError('Please enter a valid email');
        return false;
    }
    
    if (!formData.message.trim()) {
        showFormError('Please enter your message');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    errorElement.textContent = message;
    
    document.body.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => errorElement.remove(), 300);
    }, 3000);
}

function submitContactForm(formData) {
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    const successElement = document.createElement('div');
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    successElement.textContent = 'Message sent successfully!';
    
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => successElement.remove(), 300);
    }, 3000);
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters in about section
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateValue(counter, 0, target, 2000);
    });
}

// Add CSS animations to style tag
const style = document.createElement('style');
style.textContent = `
    @keyframes floatToCart {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + 100px), calc(-50% - 100px)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);