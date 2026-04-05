"use strict";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */

const activeListings = [
  {
    tag: "Featured",
    address: "4821 Orchard Hill",
    city: "Palo Alto, CA",
    price: "$4,850,000",
    beds: 5,
    baths: 4.5,
    sqft: "4,200",
    bgClass: "bg-a",
  },
  {
    tag: "New",
    address: "2970 Hillcrest Dr",
    city: "Los Altos Hills, CA",
    price: "$6,200,000",
    beds: 6,
    baths: 5,
    sqft: "5,800",
    bgClass: "bg-b",
  },
  {
    tag: "Just Listed",
    address: "1103 Heritage Ln",
    city: "Saratoga, CA",
    price: "$3,475,000",
    beds: 4,
    baths: 3.5,
    sqft: "3,100",
    bgClass: "bg-c",
  },
  {
    tag: "Price Reduced",
    address: "756 Magnolia Ave",
    city: "Menlo Park, CA",
    price: "$2,995,000",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    bgClass: "bg-d",
  },
];

const soldListings = [
  {
    tag: "Sold",
    address: "892 Rinconada Ave",
    city: "Palo Alto, CA",
    price: "$5,620,000",
    beds: 5,
    baths: 4,
    sqft: "3,980",
    bgClass: "bg-b",
  },
  {
    tag: "Sold",
    address: "14 Stonebrook Ct",
    city: "Atherton, CA",
    price: "$9,100,000",
    beds: 6,
    baths: 6,
    sqft: "7,200",
    bgClass: "bg-a",
  },
  {
    tag: "Sold",
    address: "441 Pepper Ave",
    city: "Los Altos, CA",
    price: "$4,250,000",
    beds: 4,
    baths: 3.5,
    sqft: "3,400",
    bgClass: "bg-c",
  },
  {
    tag: "Sold",
    address: "278 Summit Dr",
    city: "Saratoga, CA",
    price: "$3,800,000",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    bgClass: "bg-d",
  },
];

const testimonials = [
  {
    stars: 5,
    text: "Brianna's ability to understand what we were looking for was extraordinary. She found us a home that exceeded everything on our list — and negotiated a price we couldn't believe. Truly a cut above.",
    author: "Michael & Sarah T.",
  },
  {
    stars: 5,
    text: "Albert's market knowledge is unmatched. We sold our Palo Alto home in four days, above asking. He made the entire process feel completely effortless. Best realtor team in the valley.",
    author: "Jennifer K.",
  },
  {
    stars: 5,
    text: "Working with Brianna and Albert was the best decision we made in our home buying journey. Their integrity, speed, and attention to detail are unparalleled in this market.",
    author: "David & Priya N.",
  },
  {
    stars: 5,
    text: "From our first call to closing day, the Dalrymple Team was responsive, strategic, and genuinely caring. They helped us navigate a multiple-offer situation and we came out on top.",
    author: "Robert & Lisa M.",
  },
];

const soldStories = [
  {
    location: "Los Altos Hills, CA",
    result: "Listed at $5.2M · Sold at $5.78M in 9 Days",
    story:
      "We received 6 offers in the first weekend. Albert's staging strategy and Brianna's outreach to off-market buyer lists created a bidding environment that netted our clients $580,000 above asking — without a single price reduction.",
    highlight: "+$580K",
    highlightLabel: "Above Asking",
  },
  {
    location: "Palo Alto, CA",
    result: "Sold in 4 Days — Multiple Offers",
    story:
      "A targeted pre-market campaign reached 340 qualified buyers before the first public showing. The property sold in a competitive 7-offer situation at 108% of list price, giving the sellers the confidence and certainty they needed.",
    highlight: "108%",
    highlightLabel: "Of List Price",
  },
  {
    location: "Saratoga, CA",
    result: "Off-Market Purchase — Never Hit MLS",
    story:
      "Our buyer clients had searched for 14 months with no success. Within 6 weeks of engaging the Dalrymple Team, we matched them with an off-market property that perfectly fit their criteria — before any other buyers had access.",
    highlight: "6 Weeks",
    highlightLabel: "To Off-Market Close",
  },
];

const markets = [
  {
    name: "Palo Alto",
    desc: "World-class schools · Tech headquarters",
    price: "Median $3.9M",
    bgClass: "bg-a",
  },
  {
    name: "Los Altos Hills",
    desc: "Estate lots · Equestrian estates",
    price: "Median $5.5M",
    bgClass: "bg-b",
  },
  {
    name: "Saratoga",
    desc: "Vineyards · Historic charm",
    price: "Median $3.2M",
    bgClass: "bg-c",
  },
  {
    name: "Menlo Park",
    desc: "Sand Hill Rd · Sand Hill community",
    price: "Median $3.4M",
    bgClass: "bg-d",
  },
  {
    name: "Atherton",
    desc: "Gated estates · Ultimate privacy",
    price: "Median $8.2M",
    bgClass: "bg-a",
  },
  {
    name: "Los Gatos",
    desc: "Boutique village · Mountain views",
    price: "Median $2.8M",
    bgClass: "bg-b",
  },
];

/* ══════════════════════════════════════════════════
   HOUSE SVG PLACEHOLDER
   Defined once as a constant — no need to call a function per card
══════════════════════════════════════════════════ */
const HOUSE_SVG = `<svg class="house-svg" width="140" height="120" viewBox="0 0 160 140" fill="none" aria-hidden="true">
  <path d="M80 12L148 70H126V128H34V70H12Z" stroke="white" stroke-width="1" fill="none"/>
  <rect x="56" y="88" width="48" height="40" stroke="white" stroke-width="0.8" fill="none"/>
  <rect x="34" y="78" width="32" height="32" stroke="white" stroke-width="0.7" fill="none"/>
</svg>`;

/* ══════════════════════════════════════════════════
   RENDER LISTINGS
══════════════════════════════════════════════════ */
function buildListingCard(l) {
  const bgStyle = l.image
    ? `style="background-image:url('${l.image}');background-size:cover;background-position:center;"`
    : "";

  return `
    <article class="listing-card fade-up" role="listitem">
      <div class="lc-bg ${l.bgClass}" ${bgStyle}>
        ${!l.image ? HOUSE_SVG : ""}
      </div>
      <div class="lc-overlay" aria-hidden="true"></div>
      <div class="lc-content">
        <span class="lc-tag">${l.tag}</span>
        <h3 class="lc-addr">${l.address}<br><span style="font-size:0.8em;opacity:0.75;">${l.city}</span></h3>
        <div class="lc-price">${l.price}</div>
        <div class="lc-meta" aria-label="Property details">
          <span>${l.beds} BD</span>
          <span>${l.baths} BA</span>
          <span>${l.sqft} SF</span>
        </div>
        <a href="#contact" class="lc-cta" aria-label="Schedule a showing for ${l.address}">Schedule Showing →</a>
      </div>
    </article>`;
}

function renderListings(tab = "active") {
  const grid = document.getElementById("listingsGrid");
  if (!grid) return;
  const data = tab === "active" ? activeListings : soldListings;
  grid.innerHTML = data.map(buildListingCard).join("");

  // Re-trigger fade-up for newly rendered cards
  requestAnimationFrame(() => {
    grid.querySelectorAll(".fade-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 100);
    });
  });
}

/* ══════════════════════════════════════════════════
   LISTING TABS
══════════════════════════════════════════════════ */
function initListingTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderListings(btn.dataset.tab);
    });
  });
}

/* ══════════════════════════════════════════════════
   RENDER SOLD STORIES
══════════════════════════════════════════════════ */
function renderSoldStories() {
  const grid = document.getElementById("soldGrid");
  if (!grid) return;

  grid.innerHTML = soldStories
    .map(
      (s) => `
    <article class="sold-card fade-up" role="listitem">
      <div class="sold-location">${s.location}</div>
      <div class="sold-result">${s.result}</div>
      <p class="sold-story">${s.story}</p>
      <span class="sold-highlight">${s.highlight}</span>
      <div class="sold-highlight-label">${s.highlightLabel}</div>
    </article>
  `,
    )
    .join("");
}

/* ══════════════════════════════════════════════════
   RENDER TESTIMONIALS
══════════════════════════════════════════════════ */
function renderTestimonials() {
  const track = document.getElementById("testiTrack");
  if (!track) return;

  // Duplicate for seamless looping
  const allTestimonials = [...testimonials, ...testimonials];

  track.innerHTML = allTestimonials
    .map(
      (t) => `
    <article class="testi-card" role="listitem">
      <div class="testi-stars" aria-label="${t.stars} stars">${"★".repeat(t.stars)}</div>
      <span class="testi-quote-mark" aria-hidden="true">"</span>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">${t.author}</div>
    </article>
  `,
    )
    .join("");
}

/* ══════════════════════════════════════════════════
   TESTIMONIAL CAROUSEL CONTROLS
   FIX: Corrected 'getgetCardStep' typo to 'getCardStep'
══════════════════════════════════════════════════ */
function initTestimonialControls() {
  const track = document.getElementById("testiTrack");
  const prev = document.getElementById("testiPrev");
  const next = document.getElementById("testiNext");
  if (!track || !prev || !next) return;

  function getCardStep() {
    const card = track.querySelector(".testi-card");
    if (!card) return 0;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  }

  let position = 0;
  let autoScroll;

  function updateTrack() {
    track.style.transform = `translateX(${position}px)`;
  }

  function moveNext() {
    // FIX: was 'getgetCardStep()' — corrected
    position -= getCardStep();
    if (Math.abs(position) >= testimonials.length * getCardStep()) {
      position = 0;
    }
    updateTrack();
  }

  function movePrev() {
    position += getCardStep();
    if (position > 0) {
      position = -(testimonials.length - 1) * getCardStep();
    }
    updateTrack();
  }

  function startAutoScroll() {
    // Guard: don't start if no cards
    if (!track.children.length) return;
    autoScroll = setInterval(moveNext, 3500);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  next.addEventListener("click", () => {
    stopAutoScroll();
    moveNext();
    startAutoScroll();
  });
  prev.addEventListener("click", () => {
    stopAutoScroll();
    movePrev();
    startAutoScroll();
  });

  track.addEventListener("mouseenter", stopAutoScroll);
  track.addEventListener("mouseleave", startAutoScroll);

  // Swipe support for mobile
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        stopAutoScroll();
        if (diff > 0) moveNext();
        else movePrev();
        startAutoScroll();
      }
    },
    { passive: true },
  );

  startAutoScroll();
}

/* ══════════════════════════════════════════════════
   RENDER MARKETS
══════════════════════════════════════════════════ */
function renderMarkets() {
  const grid = document.getElementById("marketsGrid");
  if (!grid) return;

  grid.innerHTML = markets
    .map(
      (m) => `
    <article class="market-card fade-up" role="listitem">
      <div class="market-card-bg ${m.bgClass}" aria-hidden="true"></div>
      <div class="market-card-overlay" aria-hidden="true"></div>
      <div class="market-card-content">
        <h3 class="market-name">${m.name}</h3>
        <div class="market-desc">${m.desc}</div>
        <div class="market-price">${m.price}</div>
      </div>
    </article>
  `,
    )
    .join("");
}

/* ══════════════════════════════════════════════════
   HERO SLIDESHOW
══════════════════════════════════════════════════ */
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const words = document.querySelectorAll(".rotator-word");
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    words[current % words.length].classList.remove("active");
    words[current % words.length].classList.add("exit");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    setTimeout(() => {
      document
        .querySelectorAll(".rotator-word.exit")
        .forEach((w) => w.classList.remove("exit"));
    }, 650);
    words[current % words.length].classList.add("active");
  }

  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      goTo(i);
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 4200);
    }),
  );

  timer = setInterval(() => goTo(current + 1), 4200);
}

/* ══════════════════════════════════════════════════
   HERO MOUSE PARALLAX — NEW
══════════════════════════════════════════════════ */
function initHeroParallax() {
  const heroEl = document.querySelector(".hero");
  const content = document.querySelector(".hero-content");
  if (!heroEl || !content) return;

  // Only on desktop (no hover on touch)
  if (window.matchMedia("(hover: none)").matches) return;

  heroEl.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    content.style.transform = `translate(${x}px, ${y}px)`;
  });

  heroEl.addEventListener("mouseleave", () => {
    content.style.transform = "translate(0, 0)";
  });
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.innerHTML = "&#9776;";
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

/* ══════════════════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════════════════ */
function initScrollAnimations() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        // Stagger children with .fade-up class
        e.target.querySelectorAll(".fade-up").forEach((el, i) => {
          setTimeout(() => el.classList.add("visible"), i * 130);
        });
        // Also animate the element itself if it has .fade-up
        if (e.target.classList.contains("fade-up")) {
          e.target.classList.add("visible");
        }
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(
      "section, .stats-bar, .dual-cta, footer, .listings-carousel, " +
        ".testi-grid, .about-text, .sold-stories, .markets-section, " +
        ".market-bar, .private-listings, .press-bar",
    )
    .forEach((el) => obs.observe(el));
}

/* ══════════════════════════════════════════════════
   COUNTERS
   FIX: Counter now shows $ prefix during animation, not just on end frame
══════════════════════════════════════════════════ */
function animateCounters() {
  const counters = document.querySelectorAll(".stat-num[data-target]");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const integer = el.dataset.integer === "true";
        const dur = 1800;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
          const v = e * target;

          // FIX: prefix $ on every frame, not just final
          el.textContent = integer
            ? Math.floor(v) + "+"
            : "$" + v.toFixed(1) + "B+";

          if (p < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = integer ? target + "+" : "$" + target + "B+";
          }
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => obs.observe(c));
}

/* ══════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const selector = a.getAttribute("href");
      if (selector === "#") return;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById("navbar").offsetHeight;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navH - 8,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ══════════════════════════════════════════════════
   CONTACT FORM
   FIX: References captured outside event handler
══════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const btn = form?.querySelector(".form-send");
  if (!form || !status || !btn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();

    if (!firstName || !lastName) {
      status.textContent = "Please enter your full name.";
      status.classList.add("error");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      form.querySelector('input[name="_replyto"]').value = email;

      const res = await fetch("https://formspree.io/f/xojpeayp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email,
          phone: form.phone.value.trim(),
          interest: form.interest.value,
          message: form.message.value.trim(),
        }),
      });

      if (res.ok) {
        status.textContent = `Thanks, ${firstName}. We'll be in touch within 2 hours.`;
        status.classList.add("success");
        form.reset();
      } else {
        status.textContent =
          "Something went wrong. Please try again or call us directly.";
        status.classList.add("error");
      }
    } catch {
      status.textContent = "Network error. Please call us at (408) 555-0100.";
      status.classList.add("error");
    } finally {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }
  });
}

/* ══════════════════════════════════════════════════
   PRIVATE LISTINGS FORM — NEW
══════════════════════════════════════════════════ */
function initPrivateForm() {
  const form = document.getElementById("privateForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector(".private-submit");
    const email = form.email.value.trim();
    if (!email) return;

    btn.textContent = "Requesting...";
    btn.disabled = true;

    try {
      const res = await fetch("https://formspree.io/f/xojpeayp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          interest: "private",
          source: "private-listings-gate",
        }),
      });

      if (res.ok) {
        form.innerHTML = `<p style="color:var(--champ-light);font-family:var(--serif);font-size:20px;font-weight:300;">
          You're on the list. We'll be in touch.
        </p>`;
      } else {
        btn.textContent = "Try Again";
        btn.disabled = false;
      }
    } catch {
      btn.textContent = "Try Again";
      btn.disabled = false;
    }
  });
}

/* ══════════════════════════════════════════════════
   STICKY MOBILE VALUATION CTA — NEW
══════════════════════════════════════════════════ */
function initStickyValuation() {
  const bar = document.getElementById("stickyVal");
  const link = bar?.querySelector("a");
  if (!bar || !link) return;

  window.addEventListener(
    "scroll",
    () => {
      const visible = window.scrollY > window.innerHeight * 0.4;
      bar.classList.toggle("visible", visible);
      bar.setAttribute("aria-hidden", String(!visible));
      link.setAttribute("tabindex", visible ? "0" : "-1");
    },
    { passive: true },
  );
}

/* ══════════════════════════════════════════════════
   INIT — DOMContentLoaded
══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Render dynamic content
  renderListings("active");
  initListingTabs();
  renderSoldStories();
  renderTestimonials();
  renderMarkets();

  // UI behaviours
  initTestimonialControls();
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  animateCounters();
  initContactForm();
  initPrivateForm();
  initStickyValuation();

  // Hero effects
  initHeroSlideshow();
  initHeroParallax();
});
