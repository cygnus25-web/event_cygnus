document.addEventListener('DOMContentLoaded', function() {
    // Show loading animation
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingElement);
    
    // Header scroll and menu functionality
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
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
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const event = urlParams.get('event');
    let eventTitle = '';
    let eventRules = [];
    let coordinators = [];
    let posterPath = ""; // Default poster path will be set based on event
    
    // Function to create SVG placeholder for poster
    function createPlaceholderSVG(title) {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
                <rect width="800" height="600" fill="#2b2317"/>
                <text x="400" y="200" font-family="Arial" font-size="40" text-anchor="middle" fill="#ffc107">
                    ${title}
                </text>
                <text x="400" y="300" font-family="Arial" font-size="30" text-anchor="middle" fill="#f5f5f5">
                    CYGNUS'25
                </text>
                <text x="400" y="350" font-family="Arial" font-size="24" text-anchor="middle" fill="#e09900">
                    Poster Image Unavailable
                </text>
            </svg>
        `)}`;
    }
    
    // Function to create HTML placeholder for poster
    function createPlaceholderHTML(title) {
        return `
            <div class="poster-placeholder">
                <i class="fas fa-image"></i>
                <h3>${title}</h3>
                <p>Poster image not available</p>
            </div>
        `;
    }

    // Function to smooth scroll to an element
 // Function to smooth scroll to an element
function smoothScrollTo(element) {
    const yOffset = -120; // Increase header height + padding
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
}
    // Define event data
    switch (event) {
        case 'paper':
            eventTitle = 'Paper Presentation';
            posterPath = "img/jahanger.png";
            eventRules = [
                "Teams limited to 3 participants maximum.",
                "Papers must address one of the specified themes (Electric Vehicles, Power Electronics, Renewable Energy, IoT Applications, etc.).",
                "Abstract must not exceed 250 words.",
                "The paper should be in IEEE format.",
                "Full paper length restricted to 15 pages maximum.",
                "Participants are shortlisted based on quality, innovation, and novelty of research.",
                "Each team will have 7-10 minutes for presentation followed by a dedicated Q&A session.",
                "Participants must submit their papers by the specified deadline.",
                "Judges' decisions will be final.",
                "Font style for text: Times New Roman, Font size: 12 points",
                "Font size for headings: 16 points, Sub-headings: 14 points",
                "Margin of 1 inch from all sides",
                "First page should include the paper title at the top",
                "Submit complete paper in IEEE format and presentation in PPT/PPTX format",
                "Plagiarism/direct copying from the internet is strictly prohibited"
            ];
            coordinators = [
                {name: "Dr. SHUAIB", designation: "Faculty Coordinator", contact: "", email: ""},
                {name: "Dr. BELWIN", designation: "Faculty Coordinator", contact: "", email: ""},
                {name: "Dr. Zahira", designation: "Faculty Coordinator", contact: "", email: ""},
                {name: "RAHUL A", designation: "Student Coordinator", contact: "8148130319", email: ""},
                {name: "MAHESH V", designation: "Student Coordinator", contact: "9363041479", email: ""}
            ];
            break;
        case 'project':
            eventTitle = 'Project Presentation';
            posterPath = "img/project_presentation.png"; 
            eventRules = [
                "Teams can have 2-4 members.",
                "Projects must be demonstrated in working condition with all required components.",
                "Each team will have a 10-minute presentation slot (7 minutes for demonstration and 3 minutes for Q&A).",
                "Teams must submit both digital and printed copy of the project abstract before the event.",
                "Basic resources like power supplies will be provided, but specialized equipment must be arranged by participants.",
                "Projects may be interdisciplinary but must incorporate significant electrical/electronic concepts.",
                "Teams will be evaluated on innovation, functionality, presentation quality and real-world applicability.",
                "Judges' decisions will be final."
            ];
            coordinators = [
                {name: "NATARAJAN K", designation: "Student Coordinator", contact: "7548869492", email: ""},
                {name: "YUVARAJ G", designation: "Student Coordinator", contact: "9344172886", email: ""}
            ];
            break;
        case 'circuit':
            eventTitle = 'CircuitXplorer';
            posterPath = "img/circuitxplorer.png"; 
            eventRules = [
                "Teams consist of 2 members from the same college.",
                "Multiple teams per college permitted.",
                "Pre-registration required, limited spot registrations available.",
                "Round 1: Preliminary written round with objective-type questions covering electrical fundamentals.",
                "Top 6-8 scoring teams advance to finals.",
                "Round 2: Finals (stage round) with multiple segments including technical questions, component identification, circuit analysis, and rapid fire.",
                "Optional buzzer round for additional points.",
                "Electronic devices strictly prohibited during all rounds.",
                "30-60 seconds allowed per question; buzzer teams must answer immediately.",
                "Scoring: +10 points for correct answers, no negative marking (or optional -5 for incorrect answers).",
                "Tie-breakers used when necessary.",
                "Quiz master's decisions are final and binding.",
                "Cheating or misconduct results in immediate disqualification."
            ];
            coordinators = [
                {name: "MUKESH RAJ G", designation: "Student Coordinator", contact: "9384629805", email: ""}
            ];
            break;
        case 'ampere':
            eventTitle = 'Ampere Arena';
            posterPath = "img/ampere_arena.png"; 
            eventRules = [
                "Teams consist of exactly 3 members who must remain unchanged throughout the competition.",
                "Absent team members cannot be replaced during any round.",
                "Round 1: 'Shiritori Sparks' (Word Chain) - Teams create a word chain using electrical terms.",
                "Teams have 7 seconds per turn to provide a non-repeated term.",
                "Teams missing 2 turns are eliminated.",
                "Round 2: 'Watt-A-Sketch' (Pictionary) - Teams draw randomly selected electrical terms in 30 seconds.",
                "Guessing team earns 10 points for correct guess; drawing team earns 5 points.",
                "Incorrect guesses deduct 5 points; maximum 3 wrong guesses per round.",
                "Round 3: 'Ohm My Quiz' (Buzzer Round) - Buzzer-style questions on electrical engineering topics.",
                "First team to buzz must answer within 5 seconds.",
                "Correct answers: +10 points; incorrect answers: -5 points.",
                "The team with the highest cumulative points across all stages wins the competition."
            ];
            coordinators = [
                {name: "HAFIZ ABDULLA K P", designation: "Student Coordinator", contact: "9447781289", email: ""},
                {name: "THAMIZHARASAN T", designation: "Student Coordinator", contact: "9344647278", email: ""},
                {name: "KUMLESH RAM", designation: "Student Coordinator", contact: "7540069764", email: ""}
            ];
            break;
        case 'tesla':
            eventTitle = 'Tesla vs Edison (Debate)';
            posterPath = "img/tesla_edison.png"; 
            eventRules = [
                "Individual registration only.",
                "Team assignment by coordinators during event.",
                "On-spot topics with 3-5 minutes preparation time.",
                "3-5 minutes presentation time per participant.",
                "Warning bell at last 10 seconds.",
                "Time limit violations result in negative points.",
                "Evaluation based on content, confidence, presentation skills & arguments.",
                "No interrupting other speakers.",
                "No shouting or talking loudly.",
                "No using false facts."
            ];
            coordinators = [
                {name: "MOHAMED ASLAM M", designation: "Student Coordinator", contact: "6379279657", email: ""},
                {name: "NAVEETH SHARIFF N", designation: "Student Coordinator", contact: "7810016662", email: ""},
                {name: "MOHAMMED S", designation: "Student Coordinator", contact: "9994362501", email: ""}
            ];
            break;
        case 'biryani':
            eventTitle = 'Watt A Biryani';
            posterPath = "img/biryani.png"; 
            eventRules = [
                "Each team must consist of exactly 4 members.",
                "The entry fee for each person is RS 200.",
                "Entry fees must be paid in full at the time of registration.",
                "Fees are non-refundable and non-transferable.",
                "Teams must register online through the official event website.",
                "Registration is confirmed only upon receipt of the full entry fee.",
                "Teams must arrive at the venue at least 30 minutes before the start time.",
                "Judged based on whoever completes the food first.",
                "All participants must conduct themselves in a respectful and sportsmanlike manner."
            ];
            coordinators = [
                {name: "EZHUMALAI S", designation: "Student Coordinator", contact: "8939460191", email: ""},
                {name: "PAVAN KUMAR R", designation: "Student Coordinator", contact: "9361802496", email: ""},
                {name: "MOHAMMED AMMAR A", designation: "Student Coordinator", contact: "7305239214", email: ""},
                {name: "SHAKTHI SAI KRISHNA K", designation: "Student Coordinator", contact: "9003064079", email: ""}
            ];
            break;
        case 'talent':
            eventTitle = 'Flux Your Talent';
            posterPath = "img/talent.png"; 
            eventRules = [
                "The events include singing, dancing, stand-up comedy, photography and face painting.",
                "Performance duration: 2 to 5 minutes.",
                "Participants may perform solo/group for the talent hunt.",
                "Registration is on a first-come, first-served basis as slots are limited.",
                "The event is open to students from all colleges.",
                "Participants should bring their own props and equipment for their performance.",
                "Any performance containing violent or vulgar content will lead to disqualification.",
                "The judges' decision will be final."
            ];
            coordinators = [
                {name: "GAYATHRI S", designation: "Singing Coordinator", contact: "9003022742", email: ""},
                {name: "VISAGA VARSHINI S", designation: "Dancing Coordinator", contact: "8668025561", email: ""},
                {name: "SHOAIB A", designation: "Stand-up Comedy Coordinator", contact: "7826851748", email: ""},
                {name: "PREM KUMAR", designation: "Photography Coordinator", contact: "7010609487", email: ""},
                {name: "RUNITH KUMAR", designation: "Photography Coordinator", contact: "8778688979", email: ""},
                {name: "AYESHA SITHIKA M", designation: "Face Painting Coordinator", contact: "6382171906", email: ""}
            ];
            break;
        case 'mehendi':
            eventTitle = 'Mehendi';
            posterPath = "img/mehendi.png"; 
            eventRules = [
                "Open to all registered participants (per teams 2 member).",
                "Time limit: Participants will have 1 hour to complete their mehendi design.",
                "Theme selection: Bridal Elegance, Floral Fantasy, or Arabic Grace.",
                "Partner requirement: Participants must bring a partner on whom they will apply mehendi.",
                "Design area: Mehendi should be applied on one hand (front side, from palm to wrist).",
                "Materials: Participants should bring their own mehendi cones as no materials will be provided.",
                "Originality: Designs must be hand-drawn—no pre-drawn outlines or tracing.",
                "Neatness & creativity: Judges will evaluate designs based on cleanliness, creativity, and adherence to the theme.",
                "No add-ons: The use of stickers, glitter, tattoos, or decorative items is not allowed.",
                "Clean & tidy: Participants must keep their workspace neat and ensure their design does not smudge.",
                "Judging criteria: The judges' decision will be final and based on creativity, clarity, and adherence to the chosen theme."
            ];
            coordinators = [
                {name: "AFRIN FATHIMA H", designation: "Student Coordinator", contact: "7358201768", email: ""}
            ];
            break;
        default:
            eventTitle = 'Event Details';
            posterPath = "img/default_event.png";
            eventRules = ["Details not available."];
            coordinators = [
                {name: "Contact Event Organizers", designation: "", contact: "", email: ""}
            ];
    }

    // Update page title
    document.getElementById('event-title').innerText = eventTitle;
    document.title = eventTitle + " - CYGNUS'25";
    
    // Set poster image with enhanced fallback mechanism
    const posterImg = document.getElementById('event-poster-img');
    const posterContainer = document.getElementById('event-poster-container');
    
    // Preload image to check if it exists
    const imagePreloader = new Image();
    imagePreloader.src = posterPath;
    
    imagePreloader.onload = function() {
        // Image exists, set it
        posterImg.src = posterPath;
        posterImg.alt = eventTitle + " Poster";
        
        // Add lazy loading for better performance
        posterImg.setAttribute('loading', 'lazy');
    };
    
   imagePreloader.onerror = function() {
        console.log("Image failed to load: " + posterPath);
        
        // Try with default image if that was not the initial path
        if (posterPath !== "img/default_event.png") {
            posterPath = "img/default_event.png";
            posterImg.src = posterPath;
            posterImg.alt = eventTitle + " Poster";
        } else {
            // Both paths failed, use SVG placeholder
            posterImg.style.display = "none";
            
            // Create a placeholder div with styling
            const placeholderDiv = document.createElement('div');
            placeholderDiv.className = 'poster-placeholder';
            placeholderDiv.innerHTML = `
                <i class="fas fa-image"></i>
                <h3>${eventTitle}</h3>
                <p>CYGNUS'25</p>
                <p>Poster image not available</p>
            `;
            
            posterContainer.appendChild(placeholderDiv);
        }
    };
    
    // Populate rules list
    const rulesList = document.getElementById('rules-list');
    eventRules.forEach(rule => {
        const li = document.createElement('li');
        li.innerText = rule;
        rulesList.appendChild(li);
    });
    
    // Populate coordinators
    const coordinatorCards = document.getElementById('coordinator-cards');
    coordinators.forEach((coordinator, index) => {
        const card = document.createElement('div');
        card.className = 'coordinator-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        let html = `<h4>${coordinator.name}</h4>`;
        
        if (coordinator.designation) {
            html += `<p><i class="fas fa-user-tie"></i> ${coordinator.designation}</p>`;
        }
        
        if (coordinator.contact) {
            html += `<p><i class="fas fa-phone"></i> ${coordinator.contact}</p>`;
        }
        
        if (coordinator.email) {
            html += `<p><i class="fas fa-envelope"></i> ${coordinator.email}</p>`;
        }
        
        card.innerHTML = html;
        coordinatorCards.appendChild(card);
    });
    
    // Add navigation functionality
    document.getElementById('nav-rules').addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo(document.getElementById('rules-section'));
    });
    
    document.getElementById('nav-coordinators').addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo(document.getElementById('coordinators-section'));
    });
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingElement.classList.add('hide');
            setTimeout(function() {
                loadingElement.remove();
            }, 500);
        }, 1000);
    });
    
    // Handle background video
    const videoContainer = document.querySelector('.video-container');
    const backgroundVideo = document.querySelector('.background-video');
    
    backgroundVideo.addEventListener('error', function() {
        console.log("Video failed to load");
        document.body.classList.add('video-fallback');
    });
    
    // Add vintage effect elements
    const vintageElements = `
        <div class="noise-texture"></div>
        <div class="vignette"></div>
        <div class="scratches"></div>
        <div class="film-grain"></div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', vintageElements);
});
