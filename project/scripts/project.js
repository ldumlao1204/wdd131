document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector("#primary-navigation");

    // Highlight active nav link based on current page
    function setActiveNavLink() {
        if (!nav) return;
        const links = Array.from(nav.querySelectorAll('a'));
        // Determine current page file name (ignore query/hash), fallback to index.html
        let currentPath = window.location.pathname || '';
        // In some local file setups pathname may be a full path; keep last segment
        let currentFile = currentPath.split('/').pop() || '';
        if (!currentFile || currentFile === '') currentFile = 'index.html';
        currentFile = currentFile.toLowerCase();

        links.forEach(a => {
            // Use the link's href resolved against the document location to normalize
            let linkUrl;
            try {
                linkUrl = new URL(a.getAttribute('href'), window.location.href);
            } catch (e) {
                // fallback: use raw href
                linkUrl = { pathname: a.getAttribute('href') };
            }
            const linkFile = (linkUrl.pathname || '').split('/').pop() || 'index.html';
            const linkNorm = linkFile.toLowerCase();

            if (linkNorm === currentFile) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            } else {
                a.classList.remove('active');
                a.removeAttribute('aria-current');
            }
        });
    }

    // run once on load and when history changes
    setActiveNavLink();
    window.addEventListener('popstate', setActiveNavLink);

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

    // Form Handling and localStorage

    // 1. SELECT THE FORM (DOM Manipulation)
    const contactForm = document.getElementById('contact-form');

    // Check if the form element exists (Conditional Branching)
    if (contactForm) {

        // 2. FORM SUBMISSION HANDLER (JavaScript Function)
        contactForm.addEventListener('submit', function (event) {
            // Collect the data and save to localStorage, then allow the form to submit

            // Get all form elements
            const formElements = Array.from(contactForm.elements);

            const formData = formElements.reduce((data, element) => {
                if (!element.name) return data;

                if (element.type === 'radio') {
                    if (element.checked) data[element.name] = element.value;
                } else if (element.type === 'checkbox') {
                    data[element.name] = element.checked;
                } else if (element.type !== 'submit' && element.type !== 'button') {
                    data[element.name] = element.value;
                }
                return data;
            }, {});

            // Save the form data to localStorage so thank-you page can use it
            try {
                localStorage.setItem('hw_user_data', JSON.stringify(formData));
                console.info('Contact form data saved to localStorage.');
            } catch (err) {
                console.warn('Could not save form data to localStorage:', err);
            }

        });
    }
    // Check if we are on the thank-you page (Conditional Branching)
    if (document.body.classList.contains('thank-you-page')) {

        // 1. RETRIEVE DATA FROM LOCAL STORAGE (JavaScript localStorage)
        const storedData = localStorage.getItem('hw_user_data');
        const userData = storedData ? JSON.parse(storedData) : null;
        const messageElement = document.getElementById('welcome-message');

        if (userData && messageElement) {

            let purposeLabel = 'your message';
            if (userData.purpose === 'membership') {
                purposeLabel = 'your Membership Question';
            } else if (userData.purpose === 'suggestion') {
                purposeLabel = 'your Website Suggestion';
            } else if (userData.purpose === 'general') {
                purposeLabel = 'your General Inquiry';
            }

            const first = userData.firstName || userData['first-name'] || '';
            const personalizedMessage = `✅ Thank you, ${first}! We have received ${purposeLabel}.`;
            messageElement.textContent = personalizedMessage;
            localStorage.removeItem('hw_user_data');
        }
    }

});
