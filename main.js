document.addEventListener('DOMContentLoaded', () => {
    console.log('SYS.OP. NORMAL - Nothing Design System Initialized.');

    /* ==========================================================================
       Live Clock
       ========================================================================== */
    const clockElement = document.getElementById('live-clock');
    function updateClock() {
        if (!clockElement) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

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
       Dot-Matrix Widget Generation
       ========================================================================== */
    const dotContainer = document.getElementById('dot-matrix-container');
    if (dotContainer) {
        const totalDots = 60; // Adjust as needed to fill the space visually
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'matrix-dot';
            dotContainer.appendChild(dot);
        }

        // Randomly animate some dots to create a live system feel
        const dots = dotContainer.querySelectorAll('.matrix-dot');
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * dots.length);
            const dot = dots[randomIndex];
            dot.classList.toggle('active');
            
            // Turn it back off shortly
            setTimeout(() => {
                dot.classList.remove('active');
            }, Math.random() * 1500 + 500);
        }, 300);
    }

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
