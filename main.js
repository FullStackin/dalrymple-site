'use strict';

/* ── DATA ── */
const listings = [
  { tag:'Featured', address:'4821 Orchard Hill', city:'Palo Alto, CA', price:'$4,850,000', beds:5, baths:4.5, sqft:'4,200', bgClass:'bg-a' },
  { tag:'New', address:'2970 Hillcrest Dr', city:'Los Altos Hills, CA', price:'$6,200,000', beds:6, baths:5, sqft:'5,800', bgClass:'bg-b' },
  { tag:'Just Listed', address:'1103 Heritage Ln', city:'Saratoga, CA', price:'$3,475,000', beds:4, baths:3.5, sqft:'3,100', bgClass:'bg-c' },
  { tag:'Price Reduced', address:'756 Magnolia Ave', city:'Menlo Park, CA', price:'$2,995,000', beds:4, baths:3, sqft:'2,800', bgClass:'bg-d' },
];

const testimonials = [
  { stars:5, text:"Brianna's ability to understand what we were looking for was extraordinary. She found us a home that exceeded everything on our list — and negotiated a price we couldn't believe. Truly a cut above.", author:'Michael & Sarah T.' },
  { stars:5, text:"Albert's market knowledge is unmatched. We sold our Palo Alto home in four days, above asking. He made the entire process feel completely effortless. Best realtor team in the valley.", author:'Jennifer K.' },
  { stars:5, text:"Working with Brianna and Albert was the best decision we made in our home buying journey. Their integrity, speed, and attention to detail are unparalleled in this market.", author:'David & Priya N.' },
];

/* ── RENDER LISTINGS ── */
function renderListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;
  grid.innerHTML = listings.map((l) => {
    const bgStyle = l.image ? `style="background-image:url('${l.image}');background-size:cover;background-position:center;"` : '';
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
          <div class="lc-meta"><span>${l.beds} BD</span><span>${l.baths} BA</span><span>${l.sqft} SF</span></div>
        </div>
      </div>`;
  }).join('');
}
function houseSVG() {
  return `<svg class="house-svg" width="140" height="120" viewBox="0 0 160 140" fill="none">
    <path d="M80 12L148 70H126V128H34V70H12Z" stroke="white" stroke-width="1" fill="none"/>
    <rect x="56" y="88" width="48" height="40" stroke="white" stroke-width="0.8" fill="none"/>
    <rect x="34" y="78" width="32" height="32" stroke="white" stroke-width="0.7" fill="none"/>
  </svg>`;
}

/* ── RENDER TESTIMONIALS ── */
function renderTestimonials() {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;
  grid.innerHTML = testimonials.map((t) => `
    <div class="testi-card fade-up">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <span class="testi-quote-mark">"</span>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">${t.author}</div>
    </div>`).join('');
}

/* ── HERO SLIDESHOW ── */
function initHeroSlideshow() {
  const slides  = document.querySelectorAll('.hero-slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const words   = document.querySelectorAll('.rotator-word');
  let current   = 0, timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    words[current % words.length].classList.remove('active');
    words[current % words.length].classList.add('exit');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    setTimeout(() => document.querySelectorAll('.rotator-word.exit').forEach(w => w.classList.remove('exit')), 650);
    words[current % words.length].classList.add('active');
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); clearInterval(timer); timer = setInterval(() => goTo(current + 1), 4200); }));
  timer = setInterval(() => goTo(current + 1), 4200);
}

/* ── NAVBAR ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.innerHTML = open ? '&#10005;' : '&#9776;';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); toggle.innerHTML = '&#9776;'; }));
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.fade-up').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 130));
      if (e.target.classList.contains('fade-up')) e.target.classList.add('visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('section, .stats-bar, .dual-cta, footer, .listings-carousel, .testi-grid, .about-text').forEach(el => obs.observe(el));
}

/* ── COUNTERS ── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = parseFloat(el.dataset.target), integer = el.dataset.integer === 'true', dur = 1800, start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3), v = e * target;
        el.textContent = integer ? Math.floor(v) + '+' : v.toFixed(1) + 'B+';
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = integer ? target + '+' : '$' + target + 'B+';
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); const navH = document.getElementById('navbar').offsetHeight; window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' }); }
    });
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status'; status.textContent = '';
    const firstName = form.firstName.value.trim(), lastName = form.lastName.value.trim(), email = form.email.value.trim();
    if (!firstName || !lastName) { status.textContent = 'Please enter your full name.'; status.classList.add('error'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = 'Please enter a valid email.'; status.classList.add('error'); return; }
    const btn = form.querySelector('.form-send'); btn.textContent = 'Sending...'; btn.disabled = true;
    try {
      form.querySelector('input[name="_replyto"]').value = email;
      const res = await fetch('https://formspree.io/f/xojpeayp', { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body: JSON.stringify({ firstName, lastName, name:`${firstName} ${lastName}`, email, phone: form.phone.value.trim(), interest: form.interest.value, message: form.message.value.trim() }) });
      if (res.ok) { status.textContent = `Thanks, ${firstName}. We'll be in touch shortly.`; status.classList.add('success'); form.reset(); }
      else { status.textContent = 'Something went wrong. Please try again.'; status.classList.add('error'); }
    } catch { status.textContent = 'Network error. Please try again.'; status.classList.add('error'); }
    finally { btn.textContent = 'Send Message'; btn.disabled = false; }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderListings();
  renderTestimonials();
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  animateCounters();
  initContactForm();
  initHeroSlideshow();
});