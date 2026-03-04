/* ============================================
   BipanaCafe — Interactive JavaScript
   Features: Preloader, Scroll Effects, Navbar,
   Animated Counters, Menu Filter, Form, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ————————————————————————————
  // 1. Preloader — hide after page loads
  // ————————————————————————————
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 800);
  });

  // ————————————————————————————
  // 2. Initialize Lucide Icons
  // ————————————————————————————
  if (window.lucide) {
    lucide.createIcons();
  }

  // ————————————————————————————
  // 3. Navbar — scroll-based style change
  // ————————————————————————————
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ————————————————————————————
  // 4. Mobile Hamburger Toggle
  // ————————————————————————————
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ————————————————————————————
  // 5. Active Nav Link on Scroll
  // ————————————————————————————
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => a.classList.remove('active'));
        const active = navLinks.querySelector(`a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  // ————————————————————————————
  // 6. Scroll Reveal Animations
  // ————————————————————————————
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function handleReveal() {
    const trigger = window.innerHeight * 0.88;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleReveal);
  handleReveal(); // run once on load

  // ————————————————————————————
  // 7. Animated Counters (About Section)
  // ————————————————————————————
  const counters    = document.querySelectorAll('.stat-number');
  let   counted     = false;

  function animateCounters() {
    if (counted) return;

    const statsSection = document.querySelector('.stats-row');
    if (!statsSection) return;

    const top = statsSection.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.9) return;

    counted = true;

    counters.forEach(counter => {
      const target   = +counter.getAttribute('data-target');
      const duration = 2000;  // ms
      const steps    = 60;
      const stepTime = duration / steps;
      let   current  = 0;
      const inc      = target / steps;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current) + '+';
        }
      }, stepTime);
    });
  }

  window.addEventListener('scroll', animateCounters);

  // ————————————————————————————
  // 8. Menu Category Filter
  // ————————————————————————————
  const catBtns   = document.querySelectorAll('.cat-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          // Re-trigger the reveal animation
          setTimeout(() => card.classList.add('active'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ————————————————————————————
  // 9. Contact Form Handler
  // ————————————————————————————
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather values
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }

    // Simple success feedback
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00c851, #00d4ff)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });

  // ————————————————————————————
  // 10. Back to Top Button
  // ————————————————————————————
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ————————————————————————————
  // 11. Parallax-like effect on Hero
  // ————————————————————————————
  const heroBg = document.querySelector('.hero-bg');

  window.addEventListener('scroll', () => {
    if (heroBg) {
      const speed = window.scrollY * 0.3;
      heroBg.style.transform = `translateY(${speed}px) scale(${1 + window.scrollY * 0.0002})`;
    }
  });

});
