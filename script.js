document.addEventListener('DOMContentLoaded', function() {
    // Form Validation (Existing Code)
    const form = document.querySelector('.registration-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const college = document.getElementById('college').value;
            const phone = document.getElementById('phone').value;

            // Basic validation
            if (!fullname || !email || !college || !phone) {
                alert('Please fill all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes
            alert('Registration submitted successfully!');
            // You would typically submit the form to a server here
        });
    }

    // Countdown Timer
    function updateCountdown() {
        const eventDate = new Date('2025-04-22T00:00:00').getTime();
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('timer').innerText =
                days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else {
            document.getElementById('timer').innerText = 'Event has started!';
        }
    }

    updateCountdown(); // Initial call
    setInterval(updateCountdown, 1000); // Update every second
});

// countdown style
document.addEventListener('DOMContentLoaded', function() {
    // Set your target date here
    const targetDate = new Date("apr 21, 2025 09:30:00").getTime();
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // If countdown is finished
        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('event-name-display').textContent = 'The Event Has Arrived!';
            return;
        }
        
        // Calculate time units
        const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
        
        // Update the display with animation
        updateDigit('days', days);
        updateDigit('hours', hours);
        updateDigit('minutes', minutes);
        updateDigit('seconds', seconds);
    }, 1000);
    
    // Function to update digits with a flip effect
    function updateDigit(id, newValue) {
        const element = document.getElementById(id);
        if (element.textContent !== newValue) {
            element.style.transition = 'transform 0.3s';
            element.style.transform = 'rotateX(90deg)';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'rotateX(0deg)';
            }, 150);
        }
    }
});

 // Immediately Invoked Function Expression to avoid global scope pollution
(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');
        
        // Make sure elements exist before adding event listeners
        if (!hamburger || !navMenu) {
            console.error('Navigation elements not found');
            return;
        }
        
        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Log to confirm function is being called
            console.log('Menu toggled');
        }
        
        // Add click event to hamburger menu
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Add a fallback touch event for mobile devices
        hamburger.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMenu();
        });
        
        // Header shrink on scroll
        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    });
})();

// crescent about animation
document.addEventListener("DOMContentLoaded", function() {
    // Variables for carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(n) {
        // Remove active class from all slides and dots
        carouselItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Set current slide index
        currentSlide = (n + carouselItems.length) % carouselItems.length;
        
        // Add active class to current slide and dot
        carouselItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Function to move to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to move to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for controls
    prevButton.addEventListener('click', function() {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    nextButton.addEventListener('click', function() {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });
    
    // Start the slideshow
    startSlideshow();
});

// gallary animation
document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach((carouselContainer) => {
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
        const dots = carouselContainer.querySelectorAll('.dot');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(n) {
            carouselItems.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + carouselItems.length) % carouselItems.length;

            carouselItems[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        prevButton.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideshow();
                startSlideshow();
            });
        });

        startSlideshow();
    });
});
