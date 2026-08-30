/* ═══════════════════════════════════════════════════
   Portfolio — Khaise
   Vanilla JS. No libraries. No build step.
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Nav scroll behavior ──
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // ── Mobile menu toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open');
    document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
      document.body.style.overflow = '';
    });
  });

  // ── Intersection Observer for reveal animations ──
  var observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Smooth scroll for anchor links (fallback for older browsers) ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Active nav link tracking ──
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav__link');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinksAll.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

})();
