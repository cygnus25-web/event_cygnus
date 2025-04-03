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
