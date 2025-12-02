/**
 * JavaScript for Ramesh Jewellers Website
 * File: assets/js/script.js
 * -----------------------------------------
 * Includes functionality for:
 * 1. Enhancing the Navbar on scroll.
 * 2. Custom text animation for the Bootstrap Carousel.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------
    // 1. NAV BAR SCROLL EFFECT
    // Adds a shadow/style to the fixed navbar after scrolling past the hero section.
    // -----------------------------------------
    
    const navbar = document.querySelector('.custom-navbar');
    const scrollThreshold = 100; // Distance in pixels to scroll before changing style

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            // Add a class to make the navbar look more prominent on scroll
            navbar.classList.add('scrolled');
        } else {
            // Remove the class when back at the top
            navbar.classList.remove('scrolled');
        }
    });

    // Optional CSS for this effect (Add to style.css)
    /*
    .custom-navbar.scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease-in-out;
    }
    */


    // -----------------------------------------
    // 2. ADVANCED CAROUSEL TEXT ANIMATION
    // Resets and triggers custom animations on slide change.
    // -----------------------------------------
    
    const heroCarousel = document.getElementById('graceCarousel');

    if (heroCarousel) {
        // Initialize the Bootstrap Carousel instance
        const carousel = new bootstrap.Carousel(heroCarousel);

        // Function to handle the animation for a specific slide
        const animateSlide = (activeSlide) => {
            // Get all animated elements within the current slide
            const animatedElements = activeSlide.querySelectorAll('.animate__animated');
            
            // Re-apply animations (This requires a CSS animation library like Animate.css, 
            // but we can simulate the effect by dynamically adding classes)

            animatedElements.forEach(el => {
                // Get the original animation classes (e.g., animate__fadeInDown)
                const animationClasses = el.dataset.animationClasses;

                // Remove and re-add animation classes to re-trigger
                el.classList.remove(...(animationClasses ? animationClasses.split(' ') : []));
                
                // Use a small timeout to ensure the browser registers the removal
                setTimeout(() => {
                    el.classList.add(...(animationClasses ? animationClasses.split(' ') : []));
                }, 50);
            });
        };
        
        // Setup initial state: Store animation classes in a data attribute
        const slides = heroCarousel.querySelectorAll('.carousel-item');
        slides.forEach(slide => {
            slide.querySelectorAll('[class*="animate__"]').forEach(el => {
                // Find all classes that start with 'animate__'
                const animationClasses = Array.from(el.classList).filter(cls => cls.startsWith('animate__')).join(' ');
                el.dataset.animationClasses = animationClasses;
            });
        });

        // Event listener for when a slide finishes transitioning
        heroCarousel.addEventListener('slide.bs.carousel', function (event) {
            // The relatedTarget is the element that is about to become active
            const incomingSlide = event.relatedTarget;
            
            // To ensure animation plays on the new slide
            animateSlide(incomingSlide);
        });

        // Trigger animation for the very first active slide on load
        const initialActiveSlide = heroCarousel.querySelector('.carousel-item.active');
        if (initialActiveSlide) {
            animateSlide(initialActiveSlide);
        }
    }


    // -----------------------------------------
    // 3. CART PAGE QUANTITY UPDATE SIMULATION
    // For the cart.html page: updates subtotal when quantity changes.
    // -----------------------------------------
    
    const cartItems = document.querySelectorAll('.cart-content tbody tr');

    if (cartItems.length > 0) {
        cartItems.forEach(row => {
            const priceCell = row.cells[1];
            const quantityInput = row.querySelector('input[type="number"]');
            const subtotalCell = row.cells[3];
            
            // Extract the numerical price (assuming format "₹XX,XXX")
            const priceText = priceCell.textContent.replace('₹', '').replace(/,/g, '');
            const unitPrice = parseFloat(priceText);

            const updateSubtotal = () => {
                const quantity = parseInt(quantityInput.value);
                const newSubtotal = unitPrice * quantity;
                
                // Format the subtotal back to Indian currency style
                subtotalCell.textContent = '₹' + newSubtotal.toLocaleString('en-IN');
                // You would need a function here to update the grand total display as well
            };

            quantityInput.addEventListener('change', updateSubtotal);
            quantityInput.addEventListener('keyup', updateSubtotal);
        });
    }

});