/* ============================================================================
   render.js — turns SITE_DATA (from data.js) into the page.
   You normally never need to edit this file; edit data.js instead.
   Each render* function is a small reusable "component".
   ============================================================================ */

(function () {
  "use strict";
  var D = window.SITE_DATA;
  var $ = function (sel) { return document.querySelector(sel); };

  /* --- tiny helpers ----------------------------------------------------- */
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function imgFallback() { return ' onerror="this.classList.add(\'img--missing\');this.removeAttribute(\'src\')" '; }

  /* --- inline SVG icon set (stroke uses currentColor) -------------------- */
  var ICONS = {
    bridge:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 18h20M4 18v-4M20 18v-4M2 14c3 0 4-4 10-4s7 4 10 4M12 10v8"/></svg>',
    analysis:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18M7 15l3-4 3 3 4-6"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h3l2-7 4 14 2-9 2 4h5"/></svg>',
    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4m0 0-5 6m5-6 5 6"/></svg>',
    damage:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    sensor:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></svg>',
    shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    leaf:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 21c0-9 5-16 16-16 0 11-7 16-16 16zM5 21c2-6 6-9 11-11"/></svg>',
    // contact
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4 0 4.8 2.6 4.8 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24H8z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1 1 6l11 5 9-4.1V14h2V6zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.2z"/></svg>',
    orcid:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM8 6.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM7 10h2v8H7zm4 0h3.7c3.5 0 5 2.5 5 4s-1.5 4-5 4H11zm2 1.8v4.4h1.6c2 0 2.9-1 2.9-2.2s-.9-2.2-2.9-2.2z"/></svg>',
    researchgate:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 0H4.4A4.4 4.4 0 0 0 0 4.4v15.2A4.4 4.4 0 0 0 4.4 24h15.2a4.4 4.4 0 0 0 4.4-4.4V4.4A4.4 4.4 0 0 0 19.6 0zM9.6 14.7c-.5.5-1.2.8-2.1.8-1.9 0-3-1.4-3-3.5V10c0-2.1 1.1-3.5 3-3.5.9 0 1.6.3 2.1.8.5.5.7 1.1.7 2h-1.4c0-.5-.1-.8-.3-1-.2-.3-.6-.4-1.1-.4-1 0-1.5.7-1.5 2v2c0 1.3.5 2 1.5 2 .5 0 .9-.1 1.1-.4.2-.2.3-.5.3-1v-.8H7.5v-1.1h2.8v1.8c0 .8-.2 1.5-.7 2zM18 17h-1.5l-1.8-3h-1v3H12.3V6.6H15c1.9 0 3 1 3 2.9 0 1.3-.6 2.2-1.6 2.6L18 17zm-1.8-7.4c0-1-.5-1.4-1.5-1.4h-1v3h1c1 0 1.5-.5 1.5-1.6z"/></svg>',
    university:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 2 8l10 5 10-5zM6 11v6c0 1 2.7 2 6 2s6-1 6-2v-6M22 8v6"/></svg>',
    mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    link:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    play:    '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    external:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>'
  };
  function icon(name) { return ICONS[name] || ICONS.link; }

  /* --- 1. PROFILE / HERO ------------------------------------------------ */
  function renderProfile() {
    var p = D.profile;
    $("#nav-name").textContent = p.name.replace(/^Dr\.\s*/, "");
    $("#hero-kicker").textContent = p.tagline ? p.role : "Civil & Structural Engineering";
    $("#hero-name").textContent = p.name;
    $("#hero-role").textContent = p.role;
    $("#hero-intro").textContent = p.heroIntro;
    $("#hero-meta").textContent = [p.institution, p.location].filter(Boolean).join("  ·  ");
    $("#hero-kicker").textContent = p.tagline || "Civil & Structural Engineering";
    // CV download buttons
    var cv = $("#cv-download"); if (cv) cv.setAttribute("href", p.cvFile || "#");
  }

  /* --- 2. ABOUT --------------------------------------------------------- */
  function renderAbout() {
    var a = D.about, p = D.profile;
    var photo = $("#about-photo");
    photo.setAttribute("src", p.photo);
    photo.setAttribute("alt", p.name);
    var txt = $("#about-text"); txt.innerHTML = "";
    (a.paragraphs || []).forEach(function (para) { txt.appendChild(el("<p>" + esc(para) + "</p>")); });
    var hl = $("#about-highlights"); hl.innerHTML = "";
    (a.highlights || []).forEach(function (h) {
      hl.appendChild(el(
        '<div class="stat reveal"><div class="stat__value">' + esc(h.value) +
        '</div><div class="stat__label">' + esc(h.label) + "</div></div>"));
    });
  }

  /* --- 3. RESEARCH ------------------------------------------------------ */
  function renderResearch() {
    var grid = $("#research-grid"); grid.innerHTML = "";
    (D.research || []).forEach(function (r) {
      grid.appendChild(el(
        '<article class="rcard reveal"><div class="rcard__icon">' + icon(r.icon) +
        '</div><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></article>"));
    });
  }

  /* --- 4. PROJECTS ------------------------------------------------------ */
  function projectMedia(m) {
    if (!m) return '<div class="img--missing" style="height:100%"></div>';
    if (m.type === "youtube")
      return '<iframe src="https://www.youtube.com/embed/' + esc(m.id) +
             '" title="Project video" allowfullscreen loading="lazy"></iframe>';
    if (m.type === "video")
      return '<video controls preload="none" poster="' + esc(m.poster || "") + '"' + imgFallback() +
             '><source src="' + esc(m.src) + '" type="video/mp4"></video>';
    return '<img src="' + esc(m.src) + '" alt="Project image" loading="lazy"' + imgFallback() + ">";
  }
  function renderProjects() {
    var wrap = $("#projects-list"); wrap.innerHTML = "";
    (D.projects || []).forEach(function (p) {
      var st = (p.status || "").toLowerCase();
      var objectives = (p.objectives || []).map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("");
      wrap.appendChild(el(
        '<article class="pcard reveal">' +
          '<div class="pcard__media">' + projectMedia(p.media) + "</div>" +
          '<div class="pcard__body">' +
            '<div class="pcard__top">' +
              '<span class="badge badge--' + esc(st) + '">' + esc(p.status) + "</span>" +
              '<span class="pcard__period">' + esc(p.period || "") + "</span>" +
            "</div>" +
            "<h3>" + esc(p.title) + "</h3>" +
            '<p class="pcard__desc">' + esc(p.description) + "</p>" +
            '<div class="pcard__grid">' +
              "<div><h4>Objectives</h4><ul>" + objectives + "</ul></div>" +
              "<div><h4>Methods</h4><p>" + esc(p.methods) + "</p>" +
                '<h4 style="margin-top:14px">Collaborators</h4><p>' + esc(p.collaborators) + "</p></div>" +
            "</div>" +
          "</div>" +
        "</article>"));
    });
  }

  /* --- 5. PUBLICATIONS -------------------------------------------------- */
  function pubTags(it) {
    var t = "";
    if (it.doi)  t += '<a class="pub__tag" target="_blank" rel="noopener" href="https://doi.org/' + esc(it.doi) + '">DOI</a>';
    if (it.pdf)  t += '<a class="pub__tag" target="_blank" rel="noopener" href="' + esc(it.pdf) + '">PDF</a>';
    if (it.link) t += '<a class="pub__tag" target="_blank" rel="noopener" href="' + esc(it.link) + '">Link</a>';
    return t ? '<div class="pub__tags">' + t + "</div>" : "";
  }
  function renderPublications() {
    var filters = $("#pub-filters"); var list = $("#publications-list");
    filters.innerHTML = ""; list.innerHTML = "";
    var cats = (D.publications || []).map(function (g) { return g.category; });
    // filter buttons
    filters.appendChild(makeFilter("All", true));
    cats.forEach(function (c) { filters.appendChild(makeFilter(c, false)); });

    (D.publications || []).forEach(function (g) {
      var items = (g.items || []).map(function (it) {
        return '<div class="pub">' +
          '<div class="pub__year">' + esc(it.year) + "</div>" +
          "<div><h3 class=\"pub__title\">" + esc(it.title) + "</h3>" +
          '<p class="pub__authors">' + esc(it.authors) + "</p>" +
          '<p class="pub__venue">' + esc(it.venue) + "</p>" + pubTags(it) + "</div></div>";
      }).join("");
      list.appendChild(el(
        '<div class="pub-group reveal" data-cat="' + esc(g.category) + '">' +
        '<h3 class="pub-group__title">' + esc(g.category) + "</h3>" + items + "</div>"));
    });

    function makeFilter(label, active) {
      var b = el('<button class="pub-filter' + (active ? " is-active" : "") + '">' + esc(label) + "</button>");
      b.addEventListener("click", function () {
        filters.querySelectorAll(".pub-filter").forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        list.querySelectorAll(".pub-group").forEach(function (g) {
          g.style.display = (label === "All" || g.getAttribute("data-cat") === label) ? "" : "none";
        });
      });
      return b;
    }
  }

  /* --- 6. CV ------------------------------------------------------------ */
  function tl(items) {
    return '<div class="tl">' + items.map(function (i) {
      return '<div class="tl__item"><div class="tl__period">' + esc(i.period) + "</div>" +
        '<div class="tl__title">' + esc(i.title) + "</div>" +
        '<div class="tl__org">' + esc(i.org) + "</div>" +
        (i.detail ? '<div class="tl__detail">' + esc(i.detail) + "</div>" : "") + "</div>";
    }).join("") + "</div>";
  }
  function tags(arr) { return '<div class="tags">' + arr.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>"; }
  function renderCV() {
    var c = D.cv; var wrap = $("#cv-content"); wrap.innerHTML = "";
    var left =
      '<div class="cv__col">' +
        '<div class="cv__block"><h3>Education</h3>' + tl(c.education) + "</div>" +
        '<div class="cv__block"><h3>Research Experience</h3>' + tl(c.research_experience) + "</div>" +
        '<div class="cv__block"><h3>Teaching Experience</h3>' + tl(c.teaching_experience) + "</div>" +
      "</div>";
    var right =
      '<div class="cv__col">' +
        '<div class="cv__block"><h3>Technical Skills</h3>' + tags(c.technical_skills) + "</div>" +
        '<div class="cv__block"><h3>Software Skills</h3>' + tags(c.software_skills) + "</div>" +
        '<div class="cv__block"><h3>Awards</h3>' + tl(c.awards) + "</div>" +
        '<div class="cv__block"><h3>Professional Memberships</h3>' + tl(c.memberships) + "</div>" +
      "</div>";
    wrap.appendChild(el('<div class="cv__col reveal">' + left + "</div>"));
    wrap.appendChild(el('<div class="cv__col reveal">' + right + "</div>"));
  }

  /* --- 7. CERTIFICATES -------------------------------------------------- */
  function renderCertificates() {
    var grid = $("#cert-grid"); grid.innerHTML = "";
    (D.certificates || []).forEach(function (c) {
      var linkTarget = c.file || c.image;
      grid.appendChild(el(
        '<article class="cert reveal">' +
          '<div class="cert__img"><img src="' + esc(c.image) + '" alt="' + esc(c.title) + '" loading="lazy"' + imgFallback() + "></div>" +
          '<div class="cert__body">' +
            '<span class="cert__date">' + esc(c.date) + "</span>" +
            "<h3>" + esc(c.title) + "</h3>" +
            '<p class="cert__org">' + esc(c.org) + "</p>" +
            (linkTarget ? '<a class="cert__link" target="_blank" rel="noopener" href="' + esc(linkTarget) + '">' +
              icon("external") + (c.file ? "View document" : "View certificate") + "</a>" : "") +
          "</div>" +
        "</article>"));
    });
  }

  /* --- 8. GALLERY (media card grid) ------------------------------------- */
  function renderGallery() {
    var grid = $("#gallery-grid"); grid.innerHTML = "";
    var imgIndex = -1; // running index of image-only cards (for the lightbox)

    (D.gallery || []).forEach(function (g) {
      var kind = g.youtube ? "youtube" : (g.video ? "video" : "image");
      var media;

      if (kind === "youtube") {
        media =
          '<div class="gcard__media gcard__media--embed">' +
            '<iframe src="https://www.youtube.com/embed/' + esc(g.youtube) + '" title="' + esc(g.title || "Video") + '" ' +
              'loading="lazy" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
          "</div>";
      } else if (kind === "video") {
        media =
          '<button type="button" class="gcard__media gcard__media--video" ' +
            'data-video="' + esc(g.video) + '" data-poster="' + esc(g.poster || "") + '" ' +
            'aria-label="Play video: ' + esc(g.title || "video") + '">' +
            (g.poster ? '<img src="' + esc(g.poster) + '" alt="' + esc(g.title || "Video poster") + '" loading="lazy">' : "") +
            '<span class="gcard__play" aria-hidden="true">' + icon("play") + "</span>" +
          "</button>";
      } else {
        imgIndex += 1;
        // image media is a button so it can open the lightbox (keyboard accessible)
        media =
          '<button type="button" class="gcard__media gcard__media--img" data-lb="' + imgIndex +
            '" aria-label="Enlarge image: ' + esc(g.title || "media") + '">' +
            '<img src="' + esc(g.image || "") + '" alt="' + esc(g.title || "Gallery image") + '" loading="lazy"' + imgFallback() + ">" +
            '<span class="gcard__zoom" aria-hidden="true">' + icon("external") + "</span>" +
          "</button>";
      }

      grid.appendChild(el(
        '<article class="gcard gcard--' + kind + ' reveal">' +
          media +
          '<div class="gcard__body">' +
            '<span class="gcard__cat">' + esc(g.category || "") + "</span>" +
            '<h3 class="gcard__title">' + esc(g.title || "") + "</h3>" +
            '<p class="gcard__desc">' + esc(g.description || "") + "</p>" +
          "</div>" +
        "</article>"));
    });
  }

  /* --- 9. CONTACT ------------------------------------------------------- */
  function renderContact() {
    var c = D.contact;
    $("#contact-intro").textContent = c.intro || "";
    var links = $("#contact-links"); links.innerHTML = "";
    links.appendChild(el('<a class="contact__email" href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>"));
    var grid = el('<div class="clinks"></div>');
    (c.links || []).forEach(function (l) {
      if (!l.url) return;
      grid.appendChild(el('<a class="clink" target="_blank" rel="noopener" href="' + esc(l.url) + '">' +
        icon(l.icon) + "<span>" + esc(l.label) + "</span></a>"));
    });
    links.appendChild(grid);

    // contact form (Formspree if endpoint set, else mailto)
    var fw = $("#contact-form-wrap"); fw.innerHTML = "";
    var action = c.formEndpoint
      ? ' action="' + esc(c.formEndpoint) + '" method="POST" '
      : ' onsubmit="return SITE.mailtoSubmit(event)" ';
    fw.appendChild(el(
      '<form class="cform"' + action + '>' +
        '<label for="cf-name">Name</label><input id="cf-name" name="name" placeholder="Your name" required>' +
        '<label for="cf-email">Email</label><input id="cf-email" type="email" name="email" placeholder="you@email.com" required>' +
        '<label for="cf-msg">Message</label><textarea id="cf-msg" name="message" placeholder="How can I help?" required></textarea>' +
        '<button type="submit" class="btn btn--primary">Send message</button>' +
        '<p class="cform__note">' + (c.formEndpoint
            ? "Messages are delivered via a form service."
            : "Opens your email app pre-filled. See README to enable direct sending.") +
        "</p>" +
      "</form>"));
  }

  /* --- FOOTER ----------------------------------------------------------- */
  function renderFooter() { $("#footer-note").textContent = (D.footer && D.footer.note) || ""; }

  /* --- run all ---------------------------------------------------------- */
  window.SITE = window.SITE || {};
  window.SITE.render = function () {
    if (!D) { console.error("SITE_DATA missing — check js/data.js"); return; }
    renderProfile(); renderAbout(); renderResearch(); renderProjects();
    renderPublications(); renderCV(); renderCertificates(); renderGallery();
    renderContact(); renderFooter();
  };
})();
