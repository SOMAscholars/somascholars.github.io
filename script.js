(function () {
  "use strict";

  /* ---------------------------------------------------------
     SUBMIT / VOLUNTEER LINKS
     --------------------------------------------------------- */
  document.querySelectorAll("#submit-cta, #volunteer-cta, #nav-submit-link, #nav-submit-link-mobile")
    .forEach((el) => { el.href = SUBMISSION_FORM_URL; });

  /* ---------------------------------------------------------
     PAGE ROUTER (hash-based, three views)
     --------------------------------------------------------- */
  const pages = {
    home: document.getElementById("page-home"),
    gallery: document.getElementById("page-gallery"),
    team: document.getElementById("page-team"),
  };
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");

  function showPage(name) {
    if (!pages[name]) name = "home";
    Object.entries(pages).forEach(([key, el]) => {
      el.classList.toggle("is-active", key === name);
    });
    navLinks.forEach((a) => {
      if (a.dataset.page === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    closeMobileMenu();
    initRevealObserver();
  }

  function routeFromHash() {
    const hash = (window.location.hash || "#home").replace("#", "");
    showPage(["home", "gallery", "team"].includes(hash) ? hash : "home");
  }

  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const page = a.dataset.page;
      window.location.hash = page;
      showPage(page);
    });
  });

  window.addEventListener("hashchange", routeFromHash);

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  /* ---------------------------------------------------------
     CAROUSEL
     --------------------------------------------------------- */
  const carouselEl = document.getElementById("carousel");
  const totalEl = document.getElementById("carousel-total");
  const currentEl = document.getElementById("carousel-current");
  let carouselIndex = 0;
  let carouselTimer = null;

  function pad(n) { return String(n + 1).padStart(2, "0"); }

  function buildCarousel() {
    carouselEl.innerHTML = CAROUSEL.map((art, i) => `
      <div class="carousel__slide${i === 0 ? " is-active" : ""}" data-index="${i}">
        <div class="carousel__img-wrap">
          <img class="carousel__img" src="${art.img}" alt="${art.title} by ${art.artist}" loading="${i === 0 ? "eager" : "lazy"}">
        </div>
        <div class="carousel__meta">
          <span class="carousel__eyebrow">${art.accession}</span>
          <h2 class="carousel__title">${art.title}</h2>
          <p class="carousel__artist">${art.artist} — ${art.medium}, ${art.year}</p>
        </div>
      </div>
    `).join("");
    totalEl.textContent = pad(CAROUSEL.length - 1);
  }

  function goToSlide(index) {
    const slides = carouselEl.querySelectorAll(".carousel__slide");
    carouselIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === carouselIndex));
    currentEl.textContent = pad(carouselIndex);
    restartAutoplay();
  }

  function restartAutoplay() {
    clearTimeout(carouselTimer);
    carouselTimer = setTimeout(() => goToSlide(carouselIndex + 1), 6500);
  }

  document.getElementById("carousel-next").addEventListener("click", () => goToSlide(carouselIndex + 1));
  document.getElementById("carousel-prev").addEventListener("click", () => goToSlide(carouselIndex - 1));

  // Basic swipe support for touch devices
  (function enableSwipe() {
    let startX = null;
    carouselEl.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    carouselEl.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) goToSlide(carouselIndex + (delta < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  })();

  buildCarousel();
  restartAutoplay();

  /* ---------------------------------------------------------
     GALLERY (masonry)
     --------------------------------------------------------- */
  const masonryEl = document.getElementById("masonry");

  function buildGallery() {
    masonryEl.innerHTML = ARTWORK.map((art) => {
      const wide = art.w / art.h >= 1.3;
      return `
        <figure class="piece${wide ? " piece--wide" : ""}" data-id="${art.id}" tabindex="0" role="button" aria-label="View ${art.title} by ${art.artist}">
          <div class="piece__frame">
            <img src="${art.img}" alt="${art.title}, ${art.medium} by ${art.artist}" loading="lazy">
            <div class="piece__overlay"><span class="piece__overlay-text">${art.accession}</span></div>
          </div>
          <figcaption class="piece__caption">
            <div class="t">${art.title}</div>
            <div class="a">${art.artist} — ${art.medium}, ${art.year}</div>
          </figcaption>
        </figure>
      `;
    }).join("");

    masonryEl.querySelectorAll(".piece").forEach((el) => {
      const open = () => openLightbox(Number(el.dataset.id));
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }
  buildGallery();

  /* ---------------------------------------------------------
     LIGHTBOX
     --------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title");
  const lbArtist = document.getElementById("lightbox-artist");
  const lbMedium = document.getElementById("lightbox-medium");
  const lbAccession = document.getElementById("lightbox-accession");
  let lastFocused = null;

  function openLightbox(id) {
    const art = ARTWORK.find((a) => a.id === id);
    if (!art) return;
    lbImg.src = art.img;
    lbImg.alt = art.title;
    lbTitle.textContent = art.title;
    lbArtist.textContent = art.artist;
    lbMedium.textContent = `${art.medium}, ${art.year}`;
    lbAccession.textContent = art.accession;
    lastFocused = document.activeElement;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  /* ---------------------------------------------------------
     TEAM
     --------------------------------------------------------- */
  const teamGrid = document.getElementById("team-grid");

  function buildTeam() {
    teamGrid.innerHTML = TEAM.map((m) => `
      <div class="member">
        <div class="member__frame">
          <img src="${m.img}" alt="${m.name}" loading="lazy">
        </div>
        <div class="member__meta">
          <div class="member__name">${m.name}</div>
          <div class="member__role">${m.role}</div>
          <div class="member__medium">${m.medium}</div>
        </div>
      </div>
    `).join("");
  }
  buildTeam();

  /* ---------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------- */
  let revealObserver = null;
  function initRevealObserver() {
    if (revealObserver) revealObserver.disconnect();
    const targets = document.querySelectorAll(".page.is-active .reveal");
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t) => revealObserver.observe(t));
  }

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  routeFromHash();
})();