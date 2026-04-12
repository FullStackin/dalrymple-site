"use strict";

/* ══════════════════════════════════════════════════
   SAMPLE FALLBACK DATA
   Used when API key = placeholder (demo / local dev)
══════════════════════════════════════════════════ */
const SAMPLES = [
  {
    mlsNumber: "DM001",
    address: { full: "412 Waverly Street" },
    city: "Palo Alto",
    state: "CA",
    zip: "94301",
    listPrice: 3850000,
    beds: 4,
    baths: 3,
    sqft: 2640,
    status: "A",
    type: "Residential",
    images: [{ smallUrl: "Images/house2.webp" }],
    lat: 37.4419,
    lng: -122.143,
  },
  {
    mlsNumber: "DM002",
    address: { full: "88 Grandview Court" },
    city: "Los Altos Hills",
    state: "CA",
    zip: "94022",
    listPrice: 7200000,
    beds: 6,
    baths: 5,
    sqft: 5900,
    status: "A",
    type: "Residential",
    images: [],
    lat: 37.3795,
    lng: -122.1351,
  },
  {
    mlsNumber: "DM003",
    address: { full: "19250 Saratoga-Los Gatos Dr" },
    city: "Saratoga",
    state: "CA",
    zip: "95070",
    listPrice: 4100000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    status: "A",
    type: "Residential",
    images: [{ smallUrl: "Images/house.jpg" }],
    lat: 37.2638,
    lng: -122.0231,
  },
  {
    mlsNumber: "DM004",
    address: { full: "25 Almendral Avenue" },
    city: "Atherton",
    state: "CA",
    zip: "94027",
    listPrice: 12500000,
    beds: 7,
    baths: 8,
    sqft: 8800,
    status: "A",
    type: "Residential",
    images: [],
    lat: 37.4585,
    lng: -122.1977,
  },
  {
    mlsNumber: "DM005",
    address: { full: "316 University Avenue" },
    city: "Palo Alto",
    state: "CA",
    zip: "94301",
    listPrice: 2950000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    status: "A",
    type: "Condo",
    images: [{ smallUrl: "Images/kitchen.webp" }],
    lat: 37.448,
    lng: -122.16,
  },
  {
    mlsNumber: "DM006",
    address: { full: "1 Miramonte Avenue" },
    city: "Los Altos",
    state: "CA",
    zip: "94024",
    listPrice: 5400000,
    beds: 5,
    baths: 4,
    sqft: 4050,
    status: "A",
    type: "Residential",
    images: [],
    lat: 37.3852,
    lng: -122.1141,
  },
  {
    mlsNumber: "DM007",
    address: { full: "307 Orchard City Dr." },
    city: "Campbell",
    state: "CA",
    zip: "95008",
    listPrice: 1800000,
    beds: 4,
    baths: 3,
    sqft: 2100,
    status: "U",
    type: "Residential",
    images: [{ smallUrl: "Images/house.jpg" }],
    lat: 37.2872,
    lng: -121.9499,
  },
  {
    mlsNumber: "DM008",
    address: { full: "3129 Irlanda Way" },
    city: "San Jose",
    state: "CA",
    zip: "95124",
    listPrice: 1300000,
    soldPrice: 1300000,
    beds: 3,
    baths: 1,
    sqft: 1060,
    status: "U",
    type: "Residential",
    images: [],
    lat: 37.259,
    lng: -121.9227,
  },
  {
    mlsNumber: "DM009",
    address: { full: "336 Wilmington Court" },
    city: "Brentwood",
    state: "CA",
    zip: "94513",
    listPrice: 855000,
    soldPrice: 855000,
    beds: 3,
    baths: 2,
    sqft: 2108,
    status: "U",
    type: "Residential",
    images: [{ smallUrl: "Images/house2.webp" }],
    lat: 37.9318,
    lng: -121.6957,
  },
];

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
const S = {
  listings: [],
  total: 0,
  page: 1,
  pageSize: 9,
  loading: false,
  demo: false,
  lastFilters: {},
};

/* ══════════════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);
const D = {
  main: $("main"),
  cardsInner: $("cardsInner"),
  pagination: null, // appended inside cardsInner
  pills: $("pills"),
  rCount: $("rCount"),
  btnSearch: $("btnSearch"),
  btnReset: $("btnReset"),
  filterPanel: $("filterPanel"),
  fToggleBar: $("fToggleBar"),
  fBody: $("fBody"),
  scrollTop: $("scrollTop"),
  cardsPanel: $("cardsPanel"),
  btnList: $("btnList"),
  btnMap: $("btnMap"),
  // filters
  fLoc: $("fLoc"),
  fStatus: $("fStatus"),
  fType: $("fType"),
  fMinPrice: $("fMinPrice"),
  fMaxPrice: $("fMaxPrice"),
  fBeds: $("fBeds"),
  fBaths: $("fBaths"),
  fSqft: $("fSqft"),
  fSort: $("fSort"),
};

/* ══════════════════════════════════════════════════
   MAPBOX SETUP
══════════════════════════════════════════════════ */
let map, activePopup, activeMarkerEl;
const markerMap = new Map(); // mlsNumber → { marker, el, listing }

function initMap() {
  mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v11",
    center: CONFIG.MAP_CENTER,
    zoom: CONFIG.MAP_ZOOM,
    attributionControl: true,
  });

  // Navigation controls — top right
  map.addControl(
    new mapboxgl.NavigationControl({ showCompass: false }),
    "top-right",
  );

  // Apply subtle navy tint to map labels via paint (after load)
  map.on("load", () => {
    const bgLayer = map.getStyle().layers.find((l) => l.type === "background");
    if (bgLayer) {
      map.setPaintProperty(bgLayer.id, "background-color", "#07111e");
    }
  });
}

function clearMarkers() {
  markerMap.forEach(({ marker }) => marker.remove());
  markerMap.clear();
  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }
  activeMarkerEl = null;
}

function formatPrice(p) {
  if (!p) return "—";
  if (p >= 1000000)
    return "$" + (p / 1000000).toFixed(p % 1000000 === 0 ? 0 : 1) + "M";
  if (p >= 1000) return "$" + (p / 1000).toFixed(0) + "K";
  return "$" + p.toLocaleString();
}

function placeMarkers(listings) {
  clearMarkers();
  if (!map) return;

  const bounds = new mapboxgl.LngLatBounds();
  let hasBounds = false;

  listings.forEach((raw, idx) => {
    const l = norm(raw);
    const lat = raw.map?.latitude || raw.address?.latitude || raw.lat;
    const lng = raw.map?.longitude || raw.address?.longitude || raw.lng;
    if (!lat || !lng) return;

    bounds.extend([lng, lat]);
    hasBounds = true;

    // Price label marker
    const el = document.createElement("div");
    el.className = "map-marker";
    el.textContent = formatPrice(l.price);
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `${l.addr} — ${l.priceStr}`);
    el.setAttribute("tabindex", "0");

    const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([lng, lat])
      .addTo(map);

    // Click marker → highlight card + show popup
    const handleActivate = () => {
      activateMarker(raw.mlsNumber || `DM${idx}`, el);
      showPopup(l, lng, lat);
      scrollToCard(raw.mlsNumber || `DM${idx}`);
    };
    el.addEventListener("click", handleActivate);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") handleActivate();
    });

    markerMap.set(raw.mlsNumber || `DM${idx}`, { marker, el, listing: raw });
  });

  // Fit map to all markers with padding
  if (hasBounds && listings.length > 1) {
    map.fitBounds(bounds, {
      padding: { top: 60, bottom: 60, left: 40, right: 40 },
      maxZoom: 14,
      duration: 900,
    });
  } else if (hasBounds) {
    map.flyTo({ center: bounds.getCenter(), zoom: 14, duration: 900 });
  }
}

function activateMarker(id, el) {
  if (activeMarkerEl) activeMarkerEl.classList.remove("mactive");
  el.classList.add("mactive");
  activeMarkerEl = el;
}

function showPopup(l, lng, lat) {
  if (activePopup) activePopup.remove();
  const metaParts = [
    l.beds ? `${l.beds} BD` : "",
    l.baths ? `${l.baths} BA` : "",
    l.sqft ? `${Number(l.sqft).toLocaleString()} SF` : "",
  ].filter(Boolean);
  const html = `<div class="pop-inner">
    <div class="pop-addr">${l.addr}</div>
    <div class="pop-city">${l.city}</div>
    <div class="pop-price">${l.priceStr}</div>
    ${metaParts.length ? `<div class="pop-meta">${metaParts.join(" · ")}</div>` : ""}
    <a href="index.html#contact" class="pop-cta">Inquire About This Property</a>
  </div>`;
  activePopup = new mapboxgl.Popup({
    closeButton: true,
    maxWidth: "240px",
    offset: [0, -8],
  })
    .setLngLat([lng, lat])
    .setHTML(html)
    .addTo(map);
}

/* ══════════════════════════════════════════════════
   NORMALISE LISTING
══════════════════════════════════════════════════ */
function norm(l) {
  let addr = "";
  if (typeof l.address === "string") {
    addr = l.address;
  } else if (l.address && typeof l.address === "object") {
    addr =
      l.address.full ||
      [l.address.streetNumber, l.address.streetName, l.address.streetSuffix]
        .filter(Boolean)
        .join(" ") ||
      "Address on request";
  }

  const cityStr = l.city
    ? [l.city, l.state || "CA", l.zip].filter(Boolean).join(", ")
    : l.address && typeof l.address === "object"
      ? [l.address.city, l.address.state, l.address.zip]
          .filter(Boolean)
          .join(", ")
      : "";

  const rawPrice =
    (l.status === "U" ? l.soldPrice || l.listPrice : l.listPrice) ||
    l.price ||
    0;
  const priceStr = rawPrice
    ? "$" + Number(rawPrice).toLocaleString("en-US")
    : "Contact for Price";

  const beds = l.beds || l.details?.numBedrooms || null;
  const baths = l.baths || l.details?.numBathrooms || null;
  const sqft = l.sqft || l.details?.sqft || null;

  let image = null;
  if (Array.isArray(l.images) && l.images.length > 0) {
    image = l.images[0]?.smallUrl || l.images[0]?.mediumUrl || null;
  }
  const photoCt = Array.isArray(l.images) ? l.images.length : 0;
  const type = l.type || l.class || "Residential";
  const mlsNum = l.mlsNumber || l.listingId || null;

  return {
    addr,
    city: cityStr,
    price: rawPrice,
    priceStr,
    beds,
    baths,
    sqft,
    image,
    photoCt,
    type,
    status: l.status || "A",
    mlsNum,
  };
}

/* ══════════════════════════════════════════════════
   HOUSE PLACEHOLDER SVG
══════════════════════════════════════════════════ */
const HSVG = `<svg width="90" height="76" viewBox="0 0 160 140" fill="none" aria-hidden="true">
  <path d="M80 12L148 70H126V128H34V70H12Z" stroke="white" stroke-width="1.2" fill="none"/>
  <rect x="56" y="88" width="48" height="40" stroke="white" stroke-width=".8" fill="none"/>
  <rect x="34" y="78" width="32" height="32" stroke="white" stroke-width=".7" fill="none"/>
</svg>`;

/* ══════════════════════════════════════════════════
   BUILD CARD HTML
══════════════════════════════════════════════════ */
function buildCard(raw, idx) {
  const l = norm(raw);
  const id = raw.mlsNumber || `DM${idx}`;
  const sold = l.status === "U";
  const delay = (idx % S.pageSize) * 50;

  const imgHTML = l.image
    ? `<img class="res-img" src="${l.image}" alt="${l.addr}" loading="lazy" />`
    : `<div class="res-ph">${HSVG}</div>`;

  const badge = sold
    ? `<span class="res-badge sold">Recently Sold</span>`
    : `<span class="res-badge">For Sale</span>`;
  const pct = l.photoCt > 1 ? `<div class="res-pct">📷 ${l.photoCt}</div>` : "";
  const meta = [
    l.beds ? `${l.beds} BD` : "",
    l.baths ? `${l.baths} BA` : "",
    l.sqft ? `${Number(l.sqft).toLocaleString()} SF` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const mlsTag = l.mlsNum ? `<div class="res-mls">MLS# ${l.mlsNum}</div>` : "";

  return `<article class="res-card" id="card-${id}" data-id="${id}" role="listitem" style="animation-delay:${delay}ms"
    tabindex="0" aria-label="${l.addr}, ${l.priceStr}">
    <div class="res-img-wrap">${imgHTML}${badge}${pct}</div>
    <div class="res-body">
      ${mlsTag}
      <h2 class="res-addr">${l.addr}</h2>
      <div class="res-city">${l.city}</div>
      <div class="res-price">${l.priceStr}</div>
      ${meta ? `<div class="res-meta">${meta}</div>` : ""}
      <div class="res-foot">
        <span class="res-type">${l.type}</span>
        <a href="index.html#contact" class="res-cta" aria-label="Inquire about ${l.addr}">Inquire</a>
      </div>
    </div>
  </article>`;
}

/* Scroll card into view in left panel */
function scrollToCard(id) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  document
    .querySelectorAll(".res-card.active")
    .forEach((c) => c.classList.remove("active"));
  card.classList.add("active");
  card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ══════════════════════════════════════════════════
   SKELETON LOADERS
══════════════════════════════════════════════════ */
function showSkeletons() {
  const sk = `<div class="sk-card" aria-busy="true">
    <div class="sk-img"></div>
    <div class="sk-body">
      <div class="sk-ln sk-s"></div>
      <div class="sk-ln sk-m"></div>
      <div class="sk-ln sk-l"></div>
      <div class="sk-ln sk-x"></div>
    </div>
  </div>`;
  D.cardsInner.innerHTML = sk.repeat(S.pageSize);
  clearMarkers();
}

/* ══════════════════════════════════════════════════
   RENDER CARDS + MAP MARKERS
══════════════════════════════════════════════════ */
function renderResults(listings, total) {
  S.listings = listings;
  S.total = total;

  D.rCount.innerHTML =
    total > 0 ? `<strong>${total.toLocaleString()}</strong> found` : "";

  if (!listings.length) {
    D.cardsInner.innerHTML = `<div class="state-box">
      <div class="si">∅</div>
      <div class="st">No Properties Found</div>
      <div class="ss">Try broadening your search — wider price range, fewer filters, or a different area.</div>
      <button class="sbtn" onclick="resetAndSearch()">Clear Filters</button>
    </div>`;
    clearMarkers();
    return;
  }

  // Cards
  const cardsHTML = listings.map((l, i) => buildCard(l, i)).join("");
  D.cardsInner.innerHTML = cardsHTML + buildPagination(total, S.page);

  // Card → marker interaction
  D.cardsInner.querySelectorAll(".res-card").forEach((card) => {
    const id = card.dataset.id;
    card.addEventListener("mouseenter", () => highlightMarker(id));
    card.addEventListener("mouseleave", () => unhighlightMarker(id));
    card.addEventListener("click", () => {
      const entry = markerMap.get(id);
      if (entry) {
        const l = norm(entry.listing);
        const lat =
          entry.listing.map?.latitude ||
          entry.listing.address?.latitude ||
          entry.listing.lat;
        const lng =
          entry.listing.map?.longitude ||
          entry.listing.address?.longitude ||
          entry.listing.lng;
        if (lat && lng) {
          activateMarker(id, entry.el);
          showPopup(l, lng, lat);
          map?.flyTo({ center: [lng, lat], zoom: 15, duration: 700 });
        }
      }
    });
  });

  // Map markers
  placeMarkers(listings);
}

function highlightMarker(id) {
  const entry = markerMap.get(id);
  if (entry) entry.el.classList.add("mactive");
}
function unhighlightMarker(id) {
  const entry = markerMap.get(id);
  if (entry && entry.el !== activeMarkerEl)
    entry.el.classList.remove("mactive");
}

/* ══════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════ */
function buildPagination(total, current) {
  const pages = Math.ceil(total / S.pageSize);
  if (pages <= 1) return "";

  let html = `<div class="pagination">`;
  html += `<button class="pgbtn" ${current === 1 ? "disabled" : ""} onclick="goPage(${current - 1})" aria-label="Previous">←</button>`;

  const range = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= current - 2 && i <= current + 2))
      range.push(i);
  }
  let prev = null;
  for (const p of range) {
    if (prev !== null && p - prev > 1)
      html += `<span class="pgbtn" style="pointer-events:none;border:none;color:var(--slate)">…</span>`;
    html += `<button class="pgbtn${p === current ? " active" : ""}" onclick="goPage(${p})" aria-label="Page ${p}" aria-current="${p === current}">${p}</button>`;
    prev = p;
  }
  html += `<button class="pgbtn" ${current === pages ? "disabled" : ""} onclick="goPage(${current + 1})" aria-label="Next">→</button>`;
  html += `</div>`;
  return html;
}

function goPage(p) {
  S.page = p;
  runSearch(S.lastFilters, p);
  D.cardsPanel.scrollTo({ top: 0, behavior: "smooth" });
}
window.goPage = goPage;
window.resetAndSearch = () => resetFilters(true);

/* ══════════════════════════════════════════════════
   FILTER PILLS
══════════════════════════════════════════════════ */
const PILL_LABELS = {
  fLoc: (v) => v,
  fType: (v) => v,
  fBeds: (v) => `${v}+ Beds`,
  fBaths: (v) => `${v}+ Baths`,
  fMinPrice: (v) => `From $${Number(v).toLocaleString()}`,
  fMaxPrice: (v) => `Up to $${Number(v).toLocaleString()}`,
  fSqft: (v) => `${Number(v).toLocaleString()}+ SF`,
  fStatus: (v) => (v === "U" ? "Recently Sold" : null),
};

function renderPills(filters) {
  const html = Object.entries(filters)
    .filter(([k, v]) => v && k !== "fSort" && PILL_LABELS[k])
    .map(([k, v]) => {
      const label = PILL_LABELS[k]?.(v);
      if (!label) return "";
      return `<div class="pill"><span>${label}</span><button onclick="clearPill('${k}')" aria-label="Remove ${label}">✕</button></div>`;
    })
    .join("");
  D.pills.innerHTML = html;
}

function clearPill(key) {
  const el = D[key];
  if (el) el.value = "";
  triggerSearch();
}
window.clearPill = clearPill;

/* ══════════════════════════════════════════════════
   READ FILTERS
══════════════════════════════════════════════════ */
function readFilters() {
  return {
    fLoc: D.fLoc.value.trim(),
    fStatus: D.fStatus.value || "A",
    fType: D.fType.value,
    fMinPrice: D.fMinPrice.value,
    fMaxPrice: D.fMaxPrice.value,
    fBeds: D.fBeds.value,
    fBaths: D.fBaths.value,
    fSqft: D.fSqft.value,
    fSort: D.fSort.value || "updatedOnDesc",
  };
}

/* ══════════════════════════════════════════════════
   FILTER VALUE MAPPING
══════════════════════════════════════════════════ */
function mapPropertyType(value) {
  const v = (value || "").toLowerCase().trim();

  if (!v || v === "any type") return "";
  if (v === "single family") return "residential";
  if (v === "multi-family") return "residential";
  if (v === "residential") return "residential";
  if (v === "condo" || v === "condominium") return "condo";
  if (v === "commercial") return "commercial";

  return "";
}
/* ══════════════════════════════════════════════════
   FETCH FROM REPLIERS API
══════════════════════════════════════════════════ */
async function fetchListings(filters, page) {
  const base = CONFIG.REPLIERS_CLIENT_SIDE
    ? "https://csr-api.repliers.io"
    : "https://api.repliers.io";

  const params = new URLSearchParams();

  params.set("status", filters.fStatus || "A");
  params.set("resultsPerPage", S.pageSize);
  params.set("pageNum", page);
  params.set("sortBy", filters.fSort || "updatedOnDesc");
  params.set("state", "CA");

  if (filters.fLoc) {
    params.append("city", filters.fLoc);
  }

  const mappedType = mapPropertyType(filters.fType);
  if (mappedType) params.append("class", mappedType);

  if (filters.fBeds) params.append("minBedrooms", filters.fBeds);
  if (filters.fBaths) params.append("minBaths", filters.fBaths);
  if (filters.fMinPrice) params.append("minPrice", filters.fMinPrice);
  if (filters.fMaxPrice) params.append("maxPrice", filters.fMaxPrice);
  if (filters.fSqft) params.append("minSqft", filters.fSqft);

  const url = `${base}/listings?${params.toString()}`;
  console.log("MLS request URL:", url);

  const res = await fetch(url, {
    headers: { "REPLIERS-API-KEY": CONFIG.REPLIERS_API_KEY },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("MLS error body:", text);
    throw new Error(`API ${res.status}`);
  }

  const data = await res.json();
  console.log("MLS raw response:", data);

  return {
    listings: data.listings || [],
    total: data.count || 0,
  };
}

/* ══════════════════════════════════════════════════
   DEMO FALLBACK — client-side filter of SAMPLES
══════════════════════════════════════════════════ */
function filterSamples(filters, page) {
  let d = SAMPLES.filter((l) => {
    if (filters.fStatus && l.status !== filters.fStatus) return false;
    if (
      filters.fType &&
      !l.type.toLowerCase().includes(filters.fType.toLowerCase())
    )
      return false;
    if (filters.fBeds && (l.beds || 0) < +filters.fBeds) return false;
    if (filters.fBaths && (l.baths || 0) < +filters.fBaths) return false;
    const price =
      (l.status === "U" ? l.soldPrice : l.listPrice) || l.listPrice || 0;
    if (filters.fMinPrice && price < +filters.fMinPrice) return false;
    if (filters.fMaxPrice && price > +filters.fMaxPrice) return false;
    if (filters.fSqft && (l.sqft || 0) < +filters.fSqft) return false;
    if (filters.fLoc) {
      const loc = filters.fLoc.toLowerCase();
      const addrStr =
        (typeof l.address === "object" ? l.address.full : l.address) || "";
      if (
        !l.city.toLowerCase().includes(loc) &&
        !addrStr.toLowerCase().includes(loc)
      )
        return false;
    }
    return true;
  });
  if (filters.fSort === "listPriceDesc")
    d.sort((a, b) => (b.listPrice || 0) - (a.listPrice || 0));
  else if (filters.fSort === "listPriceAsc")
    d.sort((a, b) => (a.listPrice || 0) - (b.listPrice || 0));
  else if (filters.fSort === "bedsDesc")
    d.sort((a, b) => (b.beds || 0) - (a.beds || 0));
  else if (filters.fSort === "sqftDesc")
    d.sort((a, b) => (b.sqft || 0) - (a.sqft || 0));
  const from = (page - 1) * S.pageSize;
  return { listings: d.slice(from, from + S.pageSize), total: d.length };
}

/* ══════════════════════════════════════════════════
   MAIN SEARCH RUNNER
══════════════════════════════════════════════════ */
async function runSearch(filters, page = 1) {
  if (S.loading) return;
  S.loading = true;
  S.lastFilters = filters;
  S.page = page;

  D.btnSearch.textContent = "Searching…";
  D.btnSearch.disabled = true;
  showSkeletons();
  renderPills(filters);

  const isDemo =
    !CONFIG.REPLIERS_API_KEY ||
    CONFIG.REPLIERS_API_KEY === "YOUR_REPLIERS_API_KEY_HERE";

  try {
    let listings, total;
    if (isDemo) {
      S.demo = true;
      ({ listings, total } = filterSamples(filters, page));
    } else {
      S.demo = false;
      ({ listings, total } = await fetchListings(filters, page));
    }
    renderResults(listings, total);
  } catch (err) {
    console.error("Search error:", err);
    D.cardsInner.innerHTML = `<div class="state-box">
      <div class="si">!</div>
      <div class="st">Search Unavailable</div>
      <div class="ss">We couldn't load listings right now. Please try again or contact us directly.</div>
      <a href="index.html#contact" class="sbtn" style="display:inline-block">Contact the Team</a>
    </div>`;
    clearMarkers();
  } finally {
    S.loading = false;
    D.btnSearch.textContent = "Search Properties";
    D.btnSearch.disabled = false;
  }
}

function triggerSearch() {
  S.page = 1;
  runSearch(readFilters(), 1);
}

function resetFilters(search = true) {
  D.fLoc.value = "";
  D.fStatus.value = "A";
  D.fType.value = "";
  D.fMinPrice.value = "";
  D.fMaxPrice.value = "";
  D.fBeds.value = "";
  D.fBaths.value = "";
  D.fSqft.value = "";
  D.fSort.value = "updatedOnDesc";
  if (search) triggerSearch();
}

/* ══════════════════════════════════════════════════
   LAYOUT — measure filter panel and offset main
══════════════════════════════════════════════════ */
function applyLayout() {
  const navH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 72;
  const panelH = D.filterPanel.offsetHeight;
  const mainTop = navH + panelH;
  D.main.style.marginTop = mainTop + "px";
  D.main.style.height = `calc(100dvh - ${mainTop}px)`;
}

/* ══════════════════════════════════════════════════
   FILTER PANEL COLLAPSE TOGGLE
══════════════════════════════════════════════════ */
function initFilterToggle() {
  const toggle = () => {
    const collapsed = D.filterPanel.classList.toggle("collapsed");
    D.fToggleBar.setAttribute("aria-expanded", String(!collapsed));
    // Re-measure after transition
    setTimeout(applyLayout, 380);
  };
  D.fToggleBar.addEventListener("click", toggle);
  D.fToggleBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggle();
  });
}

/* ══════════════════════════════════════════════════
   MOBILE VIEW TOGGLE (List ↔ Map)
══════════════════════════════════════════════════ */
function initViewToggle() {
  D.btnList.addEventListener("click", () => {
    document.body.classList.remove("show-map");
    D.btnList.classList.add("active");
    D.btnList.setAttribute("aria-pressed", "true");
    D.btnMap.classList.remove("active");
    D.btnMap.setAttribute("aria-pressed", "false");
  });
  D.btnMap.addEventListener("click", () => {
    document.body.classList.add("show-map");
    D.btnMap.classList.add("active");
    D.btnMap.setAttribute("aria-pressed", "true");
    D.btnList.classList.remove("active");
    D.btnList.setAttribute("aria-pressed", "false");
    // Trigger resize so map renders correctly
    setTimeout(() => map?.resize(), 50);
  });
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
function initNavbar() {
  const toggle = $("navToggle");
  const links = $("navLinks");
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
   SCROLL TO TOP (cards panel)
══════════════════════════════════════════════════ */
function initScrollTop() {
  D.cardsPanel.addEventListener(
    "scroll",
    () => {
      D.scrollTop.classList.toggle("visible", D.cardsPanel.scrollTop > 400);
    },
    { passive: true },
  );
  D.scrollTop.addEventListener("click", () =>
    D.cardsPanel.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFilterToggle();
  initViewToggle();
  initScrollTop();
  initMap();

  // Wire search events
  D.btnSearch.addEventListener("click", triggerSearch);
  D.btnReset.addEventListener("click", () => resetFilters(true));
  D.fLoc.addEventListener("keydown", (e) => {
    if (e.key === "Enter") triggerSearch();
  });
  D.fSort.addEventListener("change", triggerSearch);

  // URL params pre-fill
  const q = new URLSearchParams(window.location.search);
  if (q.get("city")) D.fLoc.value = q.get("city");
  if (q.get("status")) D.fStatus.value = q.get("status");

  // Layout then initial search
  applyLayout();
  window.addEventListener("resize", applyLayout, { passive: true });

  runSearch(readFilters(), 1);
});
