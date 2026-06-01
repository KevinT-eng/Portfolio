/* ============================================================================
   main.js — interactions. You normally never need to edit this file.
   Handles: navigation, animated bridge, hero photo, scroll reveals,
            gallery lightbox, mobile menu, contact form fallback.
   ============================================================================ */

(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  window.SITE = window.SITE || {};

  function init() {
    if (window.SITE.render) window.SITE.render();   // build DOM from data
    setupNav();
    buildBridge();
    loadHeroImage();
    setupReveal();
    setupLightbox();
    setupVideoCards();
  }

  /* --- NAVIGATION: scrolled state, active link, mobile menu ------------- */
  function setupNav() {
    var nav = $("#nav"), toggle = $("#nav-toggle"), links = $("#nav-links");

    function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 60); }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close mobile menu after choosing a link
    $$("#nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open"); toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // highlight the section currently in view
    var sections = $$("main section[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          $$("#nav-links a").forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- HERO: generate cable-stayed cables + draw-in animation ----------- */
  function buildBridge() {
    var g = $(".bridge-cables"); if (!g) return;
    var towers = [470, 980], deckY = 430, topY = 120;
    var cables = "";
    towers.forEach(function (tx) {
      for (var i = 1; i <= 7; i++) {
        var span = 150;
        var rx = tx + (i * span) / 2.2;        // forward cables
        var lx = tx - (i * span) / 2.2;        // backward cables
        cables += '<line x1="' + tx + '" y1="' + topY + '" x2="' + rx + '" y2="' + deckY + '"/>';
        cables += '<line x1="' + tx + '" y1="' + topY + '" x2="' + lx + '" y2="' + deckY + '"/>';
      }
    });
    g.innerHTML = cables;

    // animate draw if motion allowed
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var lines = $$(".hero__bridge line");
    lines.forEach(function (ln, i) {
      var len = ln.getTotalLength ? ln.getTotalLength() : 600;
      ln.style.setProperty("--len", len);
      ln.classList.add("draw");
      ln.style.animationDelay = (0.3 + i * 0.04) + "s";
    });
  }

  /* --- HERO: fade in real background photo if it exists ----------------- */
  function loadHeroImage() {
    var src = window.SITE_DATA && window.SITE_DATA.profile && window.SITE_DATA.profile.heroImage;
    if (!src) return;
    var bg = $("#hero-bg"); var probe = new Image();
    probe.onload = function () { bg.style.backgroundImage = "url('" + src + "')"; bg.classList.add("is-loaded"); };
    probe.src = src;  // if it fails to load, the line-art bridge simply stays
  }

  /* --- SCROLL REVEAL ---------------------------------------------------- */
  function setupReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* --- GALLERY LIGHTBOX ------------------------------------------------- */
  function setupVideoCards() {
    $$(".gcard__media--video").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-video");
        var poster = btn.getAttribute("data-poster") || "";
        if (!src) return;
        var wrap = document.createElement("div");
        wrap.className = "gcard__media gcard__media--video is-playing";
        wrap.innerHTML =
          '<video class="gcard__video" controls autoplay playsinline preload="auto"' +
            (poster ? ' poster="' + poster + '"' : "") + '>' +
            '<source src="' + src + '" type="video/mp4">' +
            "Your browser does not support the video tag." +
          "</video>";
        btn.parentNode.replaceChild(wrap, btn);
        var v = wrap.querySelector("video");
        if (v && v.play) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      });
    });
  }

  function setupLightbox() {
    var all = (window.SITE_DATA && window.SITE_DATA.gallery) || [];
    var images = all.filter(function (g) { return g.image && !g.video && !g.youtube; });
    var box = $("#lightbox"), stage = $("#lightbox-stage"), cap = $("#lightbox-caption");
    var current = 0;
    if (!box) return;

    function show(i) {
      if (!images.length) return;
      current = (i + images.length) % images.length;
      var g = images[current];
      stage.innerHTML = '<img src="' + g.image + '" alt="' + (g.title || "") + '">';
      cap.textContent = g.title || "";
    }
    function open(i) { show(i); box.classList.add("is-open"); box.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
    function close() { box.classList.remove("is-open"); box.setAttribute("aria-hidden", "true"); stage.innerHTML = ""; document.body.style.overflow = ""; }

    // only the image cards open the lightbox; videos/embeds play inline
    $$(".gcard__media--img").forEach(function (btn) {
      btn.addEventListener("click", function () { open(parseInt(btn.getAttribute("data-lb"), 10)); });
    });

    var closeBtn = $("#lightbox-close"), prevBtn = $("#lightbox-prev"), nextBtn = $("#lightbox-next");
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* --- CONTACT FORM fallback (mailto) ----------------------------------- */
  window.SITE.mailtoSubmit = function (e) {
    e.preventDefault();
    var f = e.target;
    var to = (window.SITE_DATA && window.SITE_DATA.contact && window.SITE_DATA.contact.email) || "";
    var subject = "Website enquiry from " + (f.name.value || "visitor");
    var body = "Name: " + f.name.value + "\nEmail: " + f.email.value + "\n\n" + f.message.value;
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    return false;
  };

  /* --- go --------------------------------------------------------------- */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
