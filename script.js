document.addEventListener('DOMContentLoaded', () => {

    // ─── THEME TOGGLE ───────────────────────────────────────────────────────
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;

    // Load from local storage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // ─── SCROLL REVEALS ─────────────────────────────────────────────────────
    const cinEls = document.querySelectorAll('.cin-fade');
    const cinObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                cinObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    cinEls.forEach(el => cinObs.observe(el));

    // ─── NAV ────────────────────────────────────────────────────────────────
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const burger = document.getElementById('burger-menu');

    // Burger Toggle
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });
    }

    // Close menu on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger?.classList.remove('active');
            navLinksList?.classList.remove('active');
        });
    });

    // Active link on scroll
    const linkObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => linkObs.observe(s));

    // ─── SMOOTH SCROLL ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── CONTACT FORM ───────────────────────────────────────────────────────
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#22c55e';
            btn.style.color = '#fff';
            setTimeout(() => { 
                btn.innerHTML = orig; 
                btn.style.background = ''; 
                btn.style.color = '';
                form.reset(); 
            }, 3000);
        });
    }

});
