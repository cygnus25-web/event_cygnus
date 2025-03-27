document.addEventListener('DOMContentLoaded', () => {

    // Countdown Timer function
    function updateCountdown() {
        const eventDate = new Date('2025-04-22T00:00:00');
        const now = new Date();
        const difference = eventDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Check if countdown elements exist before updating
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Navigation Menu
    const navIcons = document.querySelectorAll('.nav-icon');

    navIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const href = icon.getAttribute('href');

            // Handle different navigation scenarios
            if (href.startsWith('index.html#')) {
                // If link contains a section anchor, redirect to index.html with the section
                window.location.href = href.replace('index.html', '') || 'index.html';
            } else if (href === 'register.html') {
                // If already on register page, prevent default
                if (window.location.pathname.includes('register.html')) {
                    e.preventDefault();
                } else {
                    window.location.href = 'register.html';
                }
            } else if (href === 'index.html') {
                // Redirect to index page
                window.location.href = 'index.html';
            }
        });
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Registration Button Redirect
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('cygnus-theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    if (themeSwitch) {
        themeSwitch.checked = savedTheme === 'light';
    }

    // Theme switch event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            body.classList.toggle('light-theme');

            // Save theme preference
            const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('cygnus-theme', theme);
        });
    }

    // Registration Form Validation
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic form validation
            const requiredFields = registrationForm.querySelectorAll('[required]');
            let isValid = true;
            let errorMessage = '';

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    errorMessage += `${field.name || field.id} is required.\n`;
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailField) {
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    errorMessage += 'Invalid email format.\n';
                } else {
                    emailField.classList.remove('error');
                }
            }

            // Phone number validation
            const phoneField = document.getElementById('phone');
            const phoneRegex = /^[0-9]{10}$/;
            if (phoneField) {
                if (!phoneRegex.test(phoneField.value)) {
                    isValid = false;
                    phoneField.classList.add('error');
                    errorMessage += 'Phone number must be 10 digits.\n';
                } else {
                    phoneField.classList.remove('error');
                }
            }

            // Department validation
            const departmentField = document.getElementById('department');
            if (departmentField) {
                if (departmentField.value === '') {
                    isValid = false;
                    departmentField.classList.add('error');
                    errorMessage += 'Department is required.\n';
                } else {
                    departmentField.classList.remove('error');
                }
            }

            // Year of Study validation
            const yearOfStudyField = document.getElementById('year-of-study');
            if (yearOfStudyField) {
                if (yearOfStudyField.value === '') {
                    isValid = false;
                    yearOfStudyField.classList.add('error');
                    errorMessage += 'Year of study is required.\n';
                } else {
                    yearOfStudyField.classList.remove('error');
                }
            }

            // College Name validation
            const collegeNameField = document.getElementById('college-name');
            if (collegeNameField) {
                if (!collegeNameField.value.trim()) {
                    isValid = false;
                    collegeNameField.classList.add('error');
                    errorMessage += 'College name is required.\n';
                } else {
                    collegeNameField.classList.remove('error');
                }
            }

            // Event selection validation
            const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
            const eventSelectionGroup = document.querySelector('.events-selection');

            if (eventSelectionGroup) {
                if (eventCheckboxes.length === 0) {
                    isValid = false;
                    eventSelectionGroup.classList.add('error');
                    errorMessage += 'Please select at least one event.\n';
                } else {
                    eventSelectionGroup.classList.remove('error');
                }
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Registration Successful! We will contact you soon.');
                registrationForm.reset();
            } else {
                alert('Please correct the following errors:\n\n' + errorMessage);
            }
        });
    }

    // Event Cards GIF Interaction
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        const gif = card.querySelector('.event-gif');

        // Explicitly set the animated and static GIF sources
        const staticSrc = gif.src;
        const animatedSrc = staticSrc.replace('-static.png', '.gif');

        // Preload animated GIF
        const animatedGif = new Image();
        animatedGif.src = animatedSrc;

        card.addEventListener('mouseenter', () => {
            // Attempt to change to animated GIF
            gif.src = animatedSrc;

            // Create and append the timing div
            const timingDiv = document.createElement('div');
            timingDiv.className = 'event-timing';
            timingDiv.textContent = `Timing: ${card.dataset.eventTiming}`;
            card.appendChild(timingDiv);

            // Show the read more button
            const readMoreBtn = card.querySelector('.event-details-btn');
            if (readMoreBtn) readMoreBtn.style.display = 'block';
        });

        card.addEventListener('mouseleave', () => {
            // Revert to static image
            gif.src = staticSrc;

            // Remove timing div
            const timingDiv = card.querySelector('.event-timing');
            if (timingDiv) {
                card.removeChild(timingDiv);
            }

            // Hide the read more button
            const readMoreBtn = card.querySelector('.event-details-btn');
            if (readMoreBtn) readMoreBtn.style.display = 'none';
        });

        // Modify the existing event details modal code in script.js
        const eventDetailsBtn = card.querySelector('.event-details-btn');

        if (eventDetailsBtn) {
            eventDetailsBtn.addEventListener('click', (event) => {
                event.stopPropagation();

                // Get the event value from the input checkbox in the registration form
                const eventValue = card.querySelector('h3').textContent
                    .toLowerCase()
                    .replace(/\s+/g, '_');

                // Redirect to event details page with event parameter
                window.location.href = `event-details.html?event=${eventValue}`;
            });
        }
    });
});