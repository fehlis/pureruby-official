document.addEventListener('DOMContentLoaded', () => {
    const themeStyle = document.getElementById('theme-style');
    const originalThemeButton = document.getElementById('theme-original');
    const retroThemeButton = document.getElementById('theme-retro');

    // Lightbox Elements
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Select all gallery image links and the about image link
    const allImageLinks = document.querySelectorAll('.gallery-card a, .about-image-link');

    let currentGalleryImages = []; // Stores URLs of images in the current gallery
    let currentImageIndex = 0;    // Stores the index of the currently displayed image

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

    // Function to show an image in the lightbox
    const showImage = (index) => {
        if (currentGalleryImages.length === 0) return;

        // Loop around if reaching the ends
        if (index < 0) {
            currentImageIndex = currentGalleryImages.length - 1;
        } else if (index >= currentGalleryImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }

        lightboxImage.src = currentGalleryImages[currentImageIndex];
        // Optionally update alt text here if alt texts were stored with image src
    };

    // Lightbox functionality for generic galleries and about image
    allImageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent opening image in new tab

            // Check if the clicked link is from the About Me section
            if (link.classList.contains('about-image-link')) {
                currentGalleryImages = [link.href];
                currentImageIndex = 0;
                // Hide nav buttons for single image
                if (lightboxPrev) lightboxPrev.style.display = 'none';
                if (lightboxNext) lightboxNext.style.display = 'none';
            } else {
                // Original logic for gallery sections
                const parentGallery = link.closest('.gallery-section');
                if (parentGallery) {
                    const imagesInThisGallery = Array.from(parentGallery.querySelectorAll('.gallery-card a'));
                    currentGalleryImages = imagesInThisGallery.map(imgLink => imgLink.href);
                    currentImageIndex = imagesInThisGallery.findIndex(imgLink => imgLink === link);
                    // Show nav buttons for galleries
                    if (lightboxPrev) lightboxPrev.style.display = 'block'; // Assuming default display is block/inline-block
                    if (lightboxNext) lightboxNext.style.display = 'block'; // Assuming default display is block/inline-block
                } else {
                    // Fallback
                    currentGalleryImages = [link.href];
                    currentImageIndex = 0;
                    if (lightboxPrev) lightboxPrev.style.display = 'none';
                    if (lightboxNext) lightboxNext.style.display = 'none';
                }
            }

            showImage(currentImageIndex); // Show the clicked image
            lightboxOverlay.style.display = 'flex'; // Show the lightbox
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none'; // Hide the lightbox
        if (lightboxPrev) lightboxPrev.style.display = 'block'; // Reset nav buttons display
        if (lightboxNext) lightboxNext.style.display = 'block'; // Reset nav buttons display
    });

    // Add click event listeners for previous/next buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent closing lightbox when clicking buttons
            showImage(currentImageIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent closing lightbox when clicking buttons
            showImage(currentImageIndex + 1);
        });
    }

    // Close lightbox when clicking outside the image or on escape key
    lightboxOverlay.addEventListener('click', (event) => {
        if (event.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
            if (lightboxPrev) lightboxPrev.style.display = 'block'; // Reset nav buttons display
            if (lightboxNext) lightboxNext.style.display = 'block'; // Reset nav buttons display
        }
    });

    document.addEventListener('keydown', (event) => {
        if (lightboxOverlay.style.display === 'flex') { // Only if lightbox is open
            if (event.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            } else if (event.key === 'Escape') {
                lightboxOverlay.style.display = 'none';
                if (lightboxPrev) lightboxPrev.style.display = 'block'; // Reset nav buttons display
                if (lightboxNext) lightboxNext.style.display = 'block'; // Reset nav buttons display
            }
        }
    });
});