// Get the menu elements
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Add click event to menu button
menuButton.addEventListener('click', () => {
    // Toggle both the menu button and navigation
    menuButton.classList.toggle('open');
    navigation.classList.toggle('open');

    // Update aria-expanded attribute for accessibility
    const isExpanded = navigation.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
});

// Reset when screen gets large
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        menuButton.classList.remove('open');
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});