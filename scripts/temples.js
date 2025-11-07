// Hamburger Menu Toggle Functionality
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

// Toggle menu open/closed when hamburger is clicked
menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');

    // Change hamburger icon to X when open
    if (navMenu.classList.contains('open')) {
        menuButton.textContent = '✕';
    } else {
        menuButton.textContent = '☰';
    }
});

// Optional: Close menu when a navigation link is clicked (better UX)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navMenu.classList.remove('open');
            menuButton.textContent = '☰';
        }
    });
});