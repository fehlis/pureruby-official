document.addEventListener('DOMContentLoaded', () => {
    const themeStyle = document.getElementById('theme-style');
    const originalThemeButton = document.getElementById('theme-original');
    const retroThemeButton = document.getElementById('theme-retro');

    // Lightbox Elements
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const bunnyImageLinks = document.querySelectorAll('.bunny-card a');


    // Function to set a theme
    const setTheme = (theme) => {
        // Construct the new stylesheet path
        const newHref = `style-${theme}.css`;

        // Only change if the href is different to avoid unnecessary re-rendering
        if (themeStyle.getAttribute('href') !== newHref) {
            themeStyle.setAttribute('href', newHref);
        }
        
        // Save the user's preference
        localStorage.setItem('selectedTheme', theme);
    };

    // Add click event listeners to buttons
    if (originalThemeButton) {
        originalThemeButton.addEventListener('click', () => setTheme('original'));
    }
    if (retroThemeButton) {
        retroThemeButton.addEventListener('click', () => setTheme('retro'));
    }

    // Apply the saved theme on page load, or default to 'original'
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('original'); // Default theme
    }

    // Lightbox functionality
    bunnyImageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent opening image in new tab
            lightboxImage.src = link.href; // Set the image source
            lightboxOverlay.style.display = 'flex'; // Show the lightbox
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none'; // Hide the lightbox
    });

    // Close lightbox when clicking outside the image
    lightboxOverlay.addEventListener('click', (event) => {
        if (event.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });
});