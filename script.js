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
