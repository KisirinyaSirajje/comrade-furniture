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


// Product Filtering and Sorting Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data with additional attributes for filtering
    const productData = [
        {
            id: 1,
            title: 'Luxury Sofa',
            price: 1200000,
            priceFormatted: 'UGX 1,200,000',
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c',
            category: 'Living Room',
            material: ['Fabric', 'Wood'],
            color: ['Brown', 'Gray'],
            rating: 4.5,
            featured: true,
            date: new Date('2023-01-15')
        },
        {
            id: 2,
            title: 'Wooden Coffee Table',
            price: 450000,
            priceFormatted: 'UGX 450,000',
            image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267',
            category: 'Living Room',
            material: ['Wood', 'Glass'],
            color: ['Brown'],
            rating: 5,
            featured: true,
            date: new Date('2023-02-20')
        },
        {
            id: 3,
            title: 'Dining Set',
            price: 850000,
            priceFormatted: 'UGX 850,000',
            image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
            category: 'Dining',
            material: ['Wood', 'Fabric'],
            color: ['Brown', 'White'],
            rating: 4,
            featured: false,
            date: new Date('2023-03-10')
        },
        {
            id: 4,
            title: 'Bookshelf',
            price: 380000,
            priceFormatted: 'UGX 380,000',
            image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
            category: 'Living Room',
            material: ['Wood'],
            color: ['Brown', 'Black'],
            rating: 3.5,
            featured: false,
            date: new Date('2023-01-05')
        },
        {
            id: 5,
            title: 'Bedroom Set',
            price: 1500000,
            priceFormatted: 'UGX 1,500,000',
            image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
            category: 'Bedroom',
            material: ['Wood', 'Fabric'],
            color: ['Brown', 'White'],
            rating: 5,
            featured: true,
            date: new Date('2023-04-15')
        },
        {
            id: 6,
            title: 'Office Chair',
            price: 320000,
            priceFormatted: 'UGX 320,000',
            image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd',
            category: 'Office',
            material: ['Metal', 'Fabric', 'Leather'],
            color: ['Black', 'Gray'],
            rating: 4,
            featured: false,
            date: new Date('2023-02-28')
        },
        {
            id: 7,
            title: 'Accent Chair',
            price: 280000,
            priceFormatted: 'UGX 280,000',
            image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72',
            category: 'Living Room',
            material: ['Fabric', 'Wood'],
            color: ['Gold', 'Gray'],
            rating: 3.5,
            featured: true,
            date: new Date('2023-03-25')
        },
        {
            id: 8,
            title: 'TV Stand',
            price: 420000,
            priceFormatted: 'UGX 420,000',
            image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4',
            category: 'Living Room',
            material: ['Wood', 'Glass'],
            color: ['Brown', 'Black'],
            rating: 4,
            featured: false,
            date: new Date('2023-01-30')
        }
    ];

    // Elements
    const productGrid = document.querySelector('.product-grid');
    const categoryLinks = document.querySelectorAll('.category-filter a');
    const priceSlider = document.querySelector('.price-slider');
    const materialCheckboxes = document.querySelectorAll('.checkbox-filter input');
    const colorOptions = document.querySelectorAll('.color-filter .color-option');
    const filterBtn = document.querySelector('.filter-btn');
    const sortSelect = document.getElementById('sort');
    const productsCount = document.querySelector('.products-count p');

    // Current filter state
    let filters = {
        category: 'All Products',
        priceRange: 1000000,
        materials: [],
        colors: []
    };

    // Current sort option
    let currentSort = 'featured';

    // Initialize
    if (productGrid) {
        // Set up category filter
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Update filter
                filters.category = this.textContent;
                
                // Apply filters
                applyFilters();
            });
        });

        // Set up price range filter
        if (priceSlider) {
            priceSlider.addEventListener('input', function() {
                filters.priceRange = parseInt(this.value);
                
                // Update displayed value
                const priceValues = document.querySelector('.price-values');
                if (priceValues) {
                    const maxPrice = priceValues.querySelector('span:last-child');
                    maxPrice.textContent = `UGX ${filters.priceRange.toLocaleString()}`;
                }
            });
        }

        // Set up material filter
        materialCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const material = this.parentElement.textContent.trim();
                
                if (this.checked) {
                    // Add material to filters if not already present
                    if (!filters.materials.includes(material)) {
                        filters.materials.push(material);
                    }
                } else {
                    // Remove material from filters
                    filters.materials = filters.materials.filter(m => m !== material);
                }
            });
        });

        // Set up color filter
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Toggle active class
                this.classList.toggle('active');
                
                // Determine color based on background color
                let color;
                const bgColor = this.style.backgroundColor.toLowerCase();
                
                if (bgColor === 'rgb(139, 69, 19)' || bgColor === '#8b4513') {
                    color = 'Brown';
                } else if (bgColor === 'rgb(0, 0, 0)' || bgColor === '#000') {
                    color = 'Black';
                } else if (bgColor === 'rgb(211, 211, 211)' || bgColor === '#d3d3d3') {
                    color = 'Gray';
                } else if (bgColor === 'rgb(255, 255, 255)' || bgColor === '#fff') {
                    color = 'White';
                } else if (bgColor === 'rgb(218, 165, 32)' || bgColor === '#daa520') {
                    color = 'Gold';
                }
                
                if (color) {
                    if (this.classList.contains('active')) {
                        // Add color to filters if not already present
                        if (!filters.colors.includes(color)) {
                            filters.colors.push(color);
                        }
                    } else {
                        // Remove color from filters
                        filters.colors = filters.colors.filter(c => c !== color);
                    }
                }
            });
        });

        // Apply filters button
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                applyFilters();
            });
        }

        // Set up sorting
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSort = this.value;
                applyFilters();
            });
        }

        // Initial display
        applyFilters();
    }

    // Function to apply filters and sort
    function applyFilters() {
        // Start with all products
        let filteredProducts = [...productData];
        
        // Apply category filter
        if (filters.category !== 'All Products') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === filters.category
            );
        }
        
        // Apply price filter
        filteredProducts = filteredProducts.filter(product => 
            product.price <= filters.priceRange
        );
        
        // Apply material filter
        if (filters.materials.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filters.materials.some(material => product.material.includes(material))
            );
        }
        
        // Apply color filter
        if (filters.colors.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filters.colors.some(color => product.color.includes(color))
            );
        }
        
        // Apply sorting
        switch (currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.date - a.date);
                break;
            case 'featured':
            default:
                filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }
        
        // Update product display
        renderProducts(filteredProducts);
        
        // Update product count
        if (productsCount) {
            productsCount.textContent = `Showing 1-${filteredProducts.length} of ${filteredProducts.length} products`;
        }
    }

    // Function to render products
    function renderProducts(products) {
        if (!productGrid) return;
        
        // Clear current products
        productGrid.innerHTML = '';
        
        // Add filtered products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Generate rating stars HTML
            const ratingStars = generateRatingStars(product.rating);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-overlay">
                        <a href="#" class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></a>
                        <a href="#" class="quick-view"><i class="fas fa-eye"></i></a>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <div class="rating">
                        ${ratingStars}
                    </div>
                    <p class="price">${product.priceFormatted}</p>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Reattach event listeners for quick view and add to cart
        attachProductEventListeners();
    }

    // Function to generate rating stars HTML
    function generateRatingStars(rating) {
        let starsHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHTML;
    }

    // Function to reattach event listeners to product buttons
    function attachProductEventListeners() {
        // Quick view buttons
        const quickViewButtons = document.querySelectorAll('.quick-view');
        if (quickViewButtons.length > 0 && typeof handleQuickView === 'function') {
            quickViewButtons.forEach(button => {
                button.addEventListener('click', handleQuickView);
            });
        }
        
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        if (addToCartButtons.length > 0) {
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get current cart count
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        const currentCount = parseInt(cartCount.textContent);
                        cartCount.textContent = currentCount + 1;
                    }
                    
                    // Show notification
                    if (typeof showNotification === 'function') {
                        showNotification('Product added to cart!');
                    }
                });
            });
        }
    }

    // Helper function for quick view (referenced in attachProductEventListeners)
    function handleQuickView(e) {
        e.preventDefault();
        
        // Get product ID from the closest product card
        const productCard = this.closest('.product-card');
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        const productId = addToCartBtn ? parseInt(addToCartBtn.getAttribute('data-id')) : null;
        
        if (productId) {
            // Find product data
            const product = productData.find(p => p.id === productId);
            
            if (product && window.showQuickView) {
                window.showQuickView(product);
            }
        }
    }

    // Make showQuickView function available globally
    window.showQuickView = function(product) {
        const quickViewModal = document.querySelector('.quick-view-modal');
        if (!quickViewModal) return;
        
        const modalImage = quickViewModal.querySelector('.product-quick-image img');
        const modalTitle = quickViewModal.querySelector('.product-title');
        const modalPrice = quickViewModal.querySelector('.product-price');
        const modalDescription = quickViewModal.querySelector('.product-description');
        const modalSku = quickViewModal.querySelector('.product-sku');
        const modalCategory = quickViewModal.querySelector('.product-category');
        
        if (modalImage) modalImage.src = product.image;
        if (modalImage) modalImage.alt = product.title;
        if (modalTitle) modalTitle.textContent = product.title;
        if (modalPrice) modalPrice.textContent = product.priceFormatted;
        if (modalDescription) modalDescription.textContent = product.description || 'Experience the perfect blend of style and comfort with this premium furniture piece. Crafted with high-quality materials and designed for modern living.';
        if (modalSku) modalSku.textContent = `PROD-${product.id.toString().padStart(3, '0')}`;
        if (modalCategory) modalCategory.textContent = product.category;
        
        // Set up rating stars based on product rating
        const ratingStars = quickViewModal.querySelectorAll('.product-rating i');
        const rating = product.rating;
        
        if (ratingStars.length > 0) {
            ratingStars.forEach((star, index) => {
                if (index < Math.floor(rating)) {
                    star.className = 'fas fa-star'; // Full star
                } else if (index < Math.ceil(rating) && rating % 1 !== 0) {
                    star.className = 'fas fa-star-half-alt'; // Half star
                } else {
                    star.className = 'far fa-star'; // Empty star
                }
            });
        }
        
        // Show modal
        quickViewModal.classList.add('active');
    };

    // Helper function for notifications
    window.showNotification = function(message) {
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
    };
});
