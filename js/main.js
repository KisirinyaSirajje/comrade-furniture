// Comrade Furniture - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Search Modal
    const searchIcon = document.querySelector('.search-icon');
    const searchModal = document.querySelector('.search-modal');
    const closeSearch = document.querySelector('.close-search');
    
    if (searchIcon && searchModal && closeSearch) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchModal.classList.add('active');
        });
        
        closeSearch.addEventListener('click', function() {
            searchModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    if (testimonials.length > 0 && dots.length > 0) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Add click event to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Countdown Timer
    const countdownElements = {
        days: document.querySelector('.countdown-days'),
        hours: document.querySelector('.countdown-hours'),
        minutes: document.querySelector('.countdown-minutes'),
        seconds: document.querySelector('.countdown-seconds')
    };
    
    function updateCountdown() {
        // Set the date we're counting down to (1 month from now)
        const countDownDate = new Date();
        countDownDate.setMonth(countDownDate.getMonth() + 1);
        
        // Get current time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update elements if they exist
        if (countdownElements.days) countdownElements.days.textContent = days;
        if (countdownElements.hours) countdownElements.hours.textContent = hours;
        if (countdownElements.minutes) countdownElements.minutes.textContent = minutes;
        if (countdownElements.seconds) countdownElements.seconds.textContent = seconds;
    }
    
    // Run countdown if elements exist
    if (countdownElements.days || countdownElements.hours || countdownElements.minutes || countdownElements.seconds) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Change icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            });
        });
    }
    
    // Quantity Selector in Cart
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    if (quantityBtns.length > 0) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                
                if (btn.classList.contains('plus')) {
                    value++;
                } else if (btn.classList.contains('minus') && value > 1) {
                    value--;
                }
                
                input.value = value;
                
                // Update cart total (simplified)
                updateCartItemTotal(btn);
            });
        });
    }
    
    function updateCartItemTotal(btn) {
        const cartItem = btn.closest('.cart-item');
        if (!cartItem) return;
        
        const priceElement = cartItem.querySelector('.price-col p');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const totalElement = cartItem.querySelector('.total-col p');
        
        if (priceElement && quantityInput && totalElement) {
            const price = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
            const quantity = parseInt(quantityInput.value);
            const total = price * quantity;
            
            totalElement.textContent = `UGX ${total.toLocaleString()}`;
            
            // Update cart summary (simplified)
            updateCartSummary();
        }
    }
    
    function updateCartSummary() {
        const totalElements = document.querySelectorAll('.cart-item .total-col p');
        const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
        const totalElement = document.querySelector('.summary-item.total span:last-child');
        
        if (totalElements.length > 0 && subtotalElement && totalElement) {
            let subtotal = 0;
            
            totalElements.forEach(element => {
                subtotal += parseInt(element.textContent.replace(/[^0-9]/g, ''));
            });
            
            const shipping = 30000; // Fixed shipping cost
            const total = subtotal + shipping;
            
            subtotalElement.textContent = `UGX ${subtotal.toLocaleString()}`;
            totalElement.textContent = `UGX ${total.toLocaleString()}`;
        }
    }
    
    // Remove item from cart
    const removeButtons = document.querySelectorAll('.remove-item');
    
    if (removeButtons.length > 0) {
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cartItem = button.closest('.cart-item');
                if (cartItem) {
                    cartItem.remove();
                    updateCartSummary();
                    
                    // Update cart count
                    const cartCount = document.querySelector('.cart-count');
                    const remainingItems = document.querySelectorAll('.cart-item').length;
                    if (cartCount) {
                        cartCount.textContent = remainingItems;
                    }
                    
                    // Update cart title
                    const cartTitle = document.querySelector('.cart-items h2');
                    if (cartTitle) {
                        cartTitle.textContent = `Your Cart (${remainingItems} items)`;
                    }
                }
            });
        });
    }
    
    // Product filter toggle for mobile
    const filterToggle = document.querySelector('.filter-toggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    
    if (filterToggle && filtersSidebar) {
        filterToggle.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get current cart count
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent);
                    cartCount.textContent = currentCount + 1;
                }
                
                // Show notification (optional)
                showNotification('Product added to cart!');
            });
        });
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});


