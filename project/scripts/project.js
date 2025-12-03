document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector("#primary-navigation");

    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile nav when resizing to desktop widths
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            nav.classList.remove('open');
            menuButton.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});
