/* ═══════════════════════════════════════════════════
   DALRYMPLE SILICON VALLEY PROPERTIES
   main.js — Interactions, Data & Animations
════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────
   LISTINGS DATA
   → Update these with real properties as needed
────────────────────────────────────────────────── */
const listings = [
  {
    tag: 'Featured',
    address: '4821 Orchard Hill',
    city: 'Palo Alto, CA',
    price: '$4,850,000',
    beds: 5, baths: 4.5, sqft: '4,200',
    bgClass: 'bg-a',
    large: true,
    // image: 'images/listing-1.jpg'  ← uncomment and add image path when ready
  },
  {
    tag: 'New',
    address: '2970 Hillcrest Dr',
    city: 'Los Altos Hills, CA',
    price: '$6,200,000',
    beds: 6, baths: 5, sqft: '5,800',
    bgClass: 'bg-b',
    // image: 'images/listing-2.jpg'
  },
  {
    tag: 'Just Listed',
    address: '1103 Heritage Ln',
    city: 'Saratoga, CA',
    price: '$3,475,000',
    beds: 4, baths: 3.5, sqft: '3,100',
    bgClass: 'bg-c',
    // image: 'images/listing-3.jpg'
  },
  {
    tag: 'Price Reduced',
    address: '756 Magnolia Ave',
    city: 'Menlo Park, CA',
    price: '$2,995,000',
    beds: 4, baths: 3, sqft: '2,800',
    bgClass: 'bg-d',
    // image: 'images/listing-4.jpg'
  },
];

/* ─────────────────────────────────────────────────
   TESTIMONIALS DATA
   → Add/edit client testimonials here
────────────────────────────────────────────────── */
const testimonials = [
  {
    stars: 5,
    text: "Brianna's ability to understand what we were looking for was extraordinary. She found us a home that exceeded everything on our list — and negotiated a price we couldn't believe. Truly a cut above.",
    author: 'Michael & Sarah T.',
  },
  {
    stars: 5,
    text: "Albert's market knowledge is unmatched. We sold our Palo Alto home in four days, above asking. He made the entire process feel completely effortless. Best realtor team in the valley.",
    author: 'Jennifer K.',
  },
  {
    stars: 5,
    text: "Working with Brianna and Albert was the best decision we made in our home buying journey. Their integrity, speed, and attention to detail are unparalleled in this market.",
    author: 'David & Priya N.',
  },
];

/* ─────────────────────────────────────────────────
   RENDER LISTINGS
────────────────────────────────────────────────── */
function renderListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  grid.innerHTML = listings.map((l) => {
    const bgStyle = l.image
      ? `style="background-image: url('${l.image}'); background-size: cover; background-position: center;"`
      : '';

    return `
      <div class="listing-card fade-up">
        <div class="lc-bg ${l.bgClass}" ${bgStyle}>
          ${!l.image ? houseSVG() : ''}
        </div>
        <div class="lc-overlay"></div>
        <div class="lc-content">
          <span class="lc-tag">${l.tag}</span>
          <div class="lc-addr">${l.address}<br>${l.city}</div>
          <div class="lc-price">${l.price}</div>
          <div class="lc-meta">
            <span>${l.beds} BD</span>
            <span>${l.baths} BA</span>
            <span>${l.sqft} SF</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function houseSVG() {
  return `
    <svg class="house-svg" width="160" height="140" viewBox="0 0 160 140" fill="none">
      <path d="M80 12L148 70H126V128H34V70H12Z" stroke="white" stroke-width="1" fill="none"/>
      <rect x="56" y="88" width="48" height="40" stroke="white" stroke-width="0.8" fill="none"/>
      <rect x="34" y="78" width="32" height="32" stroke="white" stroke-width="0.7" fill="none"/>
    </svg>
  `;
}

/* ─────────────────────────────────────────────────
   RENDER TESTIMONIALS
────────────────────────────────────────────────── */
function renderTestimonials() {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;

  grid.innerHTML = testimonials.map((t) => `
    <div class="testi-card fade-up">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <span class="testi-quote-mark">"</span>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">${t.author}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────
   NAVBAR: scroll shrink + mobile toggle
────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  // Shrink on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.innerHTML = '&#9776;';
    });
  });
}

/* ─────────────────────────────────────────────────
   SCROLL ANIMATIONS (Intersection Observer)
────────────────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children if they have .fade-up class
        entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
        // Or if the element itself is .fade-up
        if (entry.target.classList.contains('fade-up')) {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe sections and grids
  document.querySelectorAll(
    'section, .stats-bar, footer, .listings-grid, .testi-grid, .about-section'
  ).forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────
   COUNTER ANIMATION (stats bar)
────────────────────────────────────────────────── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseFloat(el.dataset.target);
      const integer = el.dataset.integer === 'true';
      const suffix  = el.dataset.suffix || (integer ? '+' : 'B+');
      const dur     = 1800;
      const start   = performance.now();

      function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / dur, 1);
        // Ease out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = eased * target;

        el.textContent = integer
          ? Math.floor(value) + '+'
          : value.toFixed(1) + 'B+';

        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = integer ? target + '+' : '$' + target + 'B+';
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'form-status';

    const firstName = form.firstName.value.trim();
    const lastName  = form.lastName.value.trim();
    const email     = form.email.value.trim();

    // Basic validation
    if (!firstName || !lastName) {
      status.textContent = 'Please enter your full name.';
      status.classList.add('error');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      return;
    }

    // ─────────────────────────────────────────────
    // TO CONNECT A REAL BACKEND:
    // Replace the simulated response below with a
    // fetch() call to your form service, e.g.:
    //
    //   fetch('https://formspree.io/f/YOUR_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: `${firstName} ${lastName}`,
    //       email, phone: form.phone.value,
    //       interest: form.interest.value,
    //       message: form.message.value,
    //     })
    //   })
    //   .then(r => r.ok ? showSuccess() : showError())
    //   .catch(showError);
    // ─────────────────────────────────────────────

    // Simulated success for now
    const btn = form.querySelector('.form-send');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      status.textContent = `Thank you, ${firstName}! We'll be in touch soon.`;
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1200);
  });
}

/* ─────────────────────────────────────────────────
   SMOOTH SCROLL for anchor links
────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─────────────────────────────────────────────────
   INIT — runs when DOM is ready
────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderListings();
  renderTestimonials();
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  animateCounters();
  initContactForm();
});
