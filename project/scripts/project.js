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

    // Lazy-load images: set native loading attribute for supported browsers
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        // don't override an explicit decision in the markup
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Optional: for browsers without native lazy support, use IntersectionObserver to swap data-src
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // if data-src present, swap it
                    const dataSrc = img.getAttribute('data-src');
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px' });

        document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
    }

    // Compute header height and set CSS variable so layouts account for sticky header
    function updateHeaderOffset() {
        const header = document.querySelector('header');
        if (!header) return;
        const height = Math.ceil(header.getBoundingClientRect().height);
        // add a small buffer so content isn't flush against the header
        const buffer = 12;
        document.documentElement.style.setProperty('--header-offset', `${height + buffer}px`);
    }

    // initialize and update on resize (throttled)
    updateHeaderOffset();
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateHeaderOffset();
        }, 120);
    });
});
