document.addEventListener('DOMContentLoaded', () => {
    console.log('Nothing Design personal website initialized.');

    const revealElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .about-text, .section-header, .project-card, .skill-group, .site-footer'
    );

    revealElements.forEach((el) => {
        el.classList.add('mechanical-reveal');
    });

    let staggerTimeout = null;
    let visibleQueue = [];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleQueue.push(entry.target);
                observer.unobserve(entry.target);
            }
        });

        if (visibleQueue.length > 0 && !staggerTimeout) {
            staggerTimeout = setTimeout(processQueue, 10);
        }
    }, observerOptions);

    function processQueue() {
        visibleQueue.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, index * 40); // 40ms step for mechanical tick
        });
        visibleQueue = [];
        staggerTimeout = null;
    }

    // Small delay before observing to allow initial styles to apply
    setTimeout(() => {
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }, 50);
});
