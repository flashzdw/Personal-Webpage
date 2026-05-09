document.addEventListener('DOMContentLoaded', () => {
    console.log('SYS.OP. NORMAL - Nothing Design System Initialized.');

    /* ==========================================================================
       Theme Toggle (Dark / Light)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('theme-dark', 'theme-light');
        body.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('theme', 'theme-light');
        } else {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('theme', 'theme-dark');
        }
    });

    /* ==========================================================================
       Language Toggle (ZH / EN)
       ========================================================================== */
    const langToggleBtn = document.getElementById('lang-toggle');
    
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        body.classList.remove('lang-zh', 'lang-en');
        body.classList.add(savedLang);
    } else {
        // Default is ZH as set in HTML
        body.classList.add('lang-zh');
    }

    langToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-zh')) {
            body.classList.remove('lang-zh');
            body.classList.add('lang-en');
            localStorage.setItem('lang', 'lang-en');
            document.documentElement.lang = 'en';
        } else {
            body.classList.remove('lang-en');
            body.classList.add('lang-zh');
            localStorage.setItem('lang', 'lang-zh');
            document.documentElement.lang = 'zh-CN';
        }
    });

    /* ==========================================================================
       Progress Bar Width Setup
       ========================================================================== */
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) {
            fill.style.width = width;
        }
    });

    /* ==========================================================================
       Mechanical Reveal Animation (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.mechanical-reveal');

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
