// Function to create electrical components in the background
function createComponents() {
    const components = ['resistor', 'capacitor', 'inductor', 'transistor', 'diode', 'microchip', 'relay', 'led', 'battery'];
    for (let i = 0; i < 8; i++) {
        let comp = document.createElement("div");
        comp.classList.add("component");
        comp.style.top = Math.random() * 100 + "vh";
        comp.style.left = Math.random() * 100 + "vw";
        comp.style.animation = `float ${5 + Math.random() * 5}s infinite ease-in-out alternate`;
        
        // Set random component background
        const componentType = components[Math.floor(Math.random() * components.length)];
        comp.style.backgroundImage = `url('https://upload.wikimedia.org/wikipedia/commons/${getComponentUrl(componentType)}')`;
        
        document.body.appendChild(comp);
    }
}

function getComponentUrl(component) {
    const urls = {
        'resistor': '8/89/Resistor_symbol.svg',
        'capacitor': '2/2f/Capacitor_symbol.svg',
        'inductor': '7/7a/Inductor_symbol.svg',
        'transistor': '1/18/NPN_BJT_symbol.svg',
        'diode': '4/42/Diode_symbol.svg',
        'microchip': 'e/e1/Microchip.svg',
        'relay': '5/53/Relay_symbol.svg',
        'led': '3/37/LED_symbol.svg',
        'battery': 'd/d3/Battery_symbol.svg'
    };
    return urls[component] || urls['resistor'];
}

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('April 24, 2025 09:30:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    
    if (timeLeft < 0) {
        clearInterval(countdownTimer);
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
}

// Function to populate events list
function populateEvents() {
    const technicalList = document.getElementById('technical-events');
    const nonTechnicalList = document.getElementById('non-technical-events');
    
    // Clear existing list items
    technicalList.innerHTML = '';
    nonTechnicalList.innerHTML = '';
    
    // Add technical events
    data.events.technical.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        technicalList.appendChild(li);
    });
    
    // Add non-technical events
    data.events.nonTechnical.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        nonTechnicalList.appendChild(li);
    });
}

// Function to populate organizers
// Continuing from where the code was cut off in populateOrganizers function
function populateOrganizers() {
    const organizersContainer = document.getElementById('organizers-container');
    organizersContainer.innerHTML = '';
    
    data.organizers.forEach(organizer => {
        const organizerCard = document.createElement('div');
        organizerCard.classList.add('organizer-card');
        
        const name = document.createElement('div');
        name.classList.add('organizer-name');
        name.textContent = organizer.name;
        
        const role = document.createElement('div');
        role.classList.add('organizer-role');
        role.textContent = organizer.role;
        
        organizerCard.appendChild(name);
        organizerCard.appendChild(role);
        organizersContainer.appendChild(organizerCard);
    });
}

// Function to populate sponsors
function populateSponsors() {
    const sponsorsContainer = document.getElementById('sponsors-container');
    sponsorsContainer.innerHTML = '';
    
    data.sponsors.forEach(sponsor => {
        const img = document.createElement('img');
        img.classList.add('sponsor-logo');
        img.src = sponsor.logo;
        img.alt = sponsor.name;
        
        sponsorsContainer.appendChild(img);
    });
}

// Function to populate event checkboxes in registration form
function populateEventCheckboxes() {
    const checkboxContainer = document.getElementById('event-checkboxes');
    checkboxContainer.innerHTML = '';
    
    // Add technical events
    data.events.technical.forEach(event => {
        const checkboxItem = document.createElement('div');
        checkboxItem.classList.add('checkbox-item');
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `event-${event.replace(/\s+/g, '-').toLowerCase()}`;
        input.name = 'events';
        input.value = event;
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = event;
        
        checkboxItem.appendChild(input);
        checkboxItem.appendChild(label);
        checkboxContainer.appendChild(checkboxItem);
    });
    
    // Add non-technical events
    data.events.nonTechnical.forEach(event => {
        const checkboxItem = document.createElement('div');
        checkboxItem.classList.add('checkbox-item');
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `event-${event.replace(/\s+/g, '-').toLowerCase()}`;
        input.name = 'events';
        input.value = event;
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = event;
        
        checkboxItem.appendChild(input);
        checkboxItem.appendChild(label);
        checkboxContainer.appendChild(checkboxItem);
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const college = document.getElementById('college').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;
    
    // Get selected events
    const selectedEvents = [];
    document.querySelectorAll('input[name="events"]:checked').forEach(checkbox => {
        selectedEvents.push(checkbox.value);
    });
    
    // Validate form data
    if (!name || !email || !college || !department || !phone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (selectedEvents.length === 0) {
        alert('Please select at least one event.');
        return;
    }
    
    // Normally would submit data to server here
    alert('Registration submitted successfully! We will contact you with further details.');
    document.getElementById('registration-form').reset();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize the web application
function initApp() {
    // Create background components
    createComponents();
    
    // Start countdown timer
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // Populate data
    populateEvents();
    populateOrganizers();
    populateSponsors();
    populateEventCheckboxes();
    
    // Set up event listeners
    document.getElementById('registration-form').addEventListener('submit', handleFormSubmit);
    
    // Set up smooth scrolling
    setupSmoothScrolling();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);