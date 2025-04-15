document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const formContainer = document.getElementById('formContainer');
  const tallyFormContainer = document.getElementById('tallyFormContainer');
  const confirmationSection = document.getElementById('confirmation');
  const backToFormButton = document.getElementById('backToForm');
  const backToPreviousButton = document.getElementById('backToPrevious');

  // Initialize Tally form with the provided embed code
  function initializeTallyForm() {
    // Create Tally embed script
    const tallyEmbedScript = document.createElement('script');
    tallyEmbedScript.innerHTML = `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
    `;
    document.body.appendChild(tallyEmbedScript);
    
    // Create and insert the iframe element
    tallyFormContainer.innerHTML = `
      <iframe data-tally-src="https://tally.so/embed/3NOP80?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              width="100%" 
              frameborder="0" 
              marginheight="0" 
              marginwidth="0" 
              title="Event Registration">
      </iframe>
    `;
  }
  
  // Initialize the form
  initializeTallyForm();

  // Back to previous page button
  if (backToPreviousButton) {
    backToPreviousButton.addEventListener('click', function() {
      window.location.href = "main.html"; // Change to the appropriate page
      // Alternatively use: window.history.back();
    });
  }

  // Listen for message from Tally iframe when form is submitted
  window.addEventListener('message', function(event) {
    // Check if the message is from Tally
    if (event.origin.includes('tally.so')) {
      try {
        const data = event.data;
        
        // Handle resize messages from Tally
        if (data && data.type === 'tally:resize') {
          // Get the iframe
          const iframe = document.querySelector('iframe[data-tally-src]');
          if (iframe) {
            // Add some padding to the height to ensure it's fully visible
            const newHeight = data.height + 20; 
            iframe.style.height = `${newHeight}px`;
          }
        }
        
        // Handle form submission
        if (data && (data.type === 'tally:form:submit' || data.type === 'tally:form:submitted')) {
          showConfirmation();
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  });

  // Function to show confirmation screen
  function showConfirmation() {
    formContainer.style.display = 'none';
    confirmationSection.style.display = 'block';
    
    // Scroll to top of confirmation section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Back to form button
  if (backToFormButton) {
    backToFormButton.addEventListener('click', function() {
      confirmationSection.style.display = 'none';
      formContainer.style.display = 'block';
      
      // Re-initialize the form to reset it
      tallyFormContainer.innerHTML = '';
      initializeTallyForm();
    });
  }
  
  // Add film grain effect that changes position randomly
  function updateFilmGrain() {
    const grain = document.querySelector('.film-grain');
    if (grain) {
      const x = Math.floor(Math.random() * 3) - 1;
      const y = Math.floor(Math.random() * 3) - 1;
      grain.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  
  // Occasionally flicker elements
  function occasionalFlicker() {
    if (Math.random() > 0.95) {
      const container = document.querySelector('.registration-container');
      if (container) {
        container.style.opacity = '0.8';
        setTimeout(() => {
          container.style.opacity = '1';
        }, 50);
      }
    }
  }
  
  // Apply vintage video effects
  setInterval(updateFilmGrain, 50);
  setInterval(occasionalFlicker, 500);
  
  // Video fallback - if video fails to load, add a class to body
  const video = document.querySelector('.background-video');
  if (video) {
    video.addEventListener('error', function() {
      document.body.classList.add('video-fallback');
    });
  }
  
  // MutationObserver to detect when Tally iframe is added to the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Check if iframe has been added
        const iframe = document.querySelector('iframe[data-tally-src]');
        if (iframe && !iframe.src) {
          // If iframe exists but src hasn't been set, set it manually
          iframe.src = iframe.getAttribute('data-tally-src');
        }
      }
    });
  });
  
  // Start observing the form container for changes
  observer.observe(tallyFormContainer, { childList: true, subtree: true });
});