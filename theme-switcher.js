document.addEventListener('DOMContentLoaded', () => {
    const themeStyle = document.getElementById('theme-style');
    const originalThemeButton = document.getElementById('theme-original');
    const retroThemeButton = document.getElementById('theme-retro');

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
});
