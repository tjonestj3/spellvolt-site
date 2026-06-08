/* ============================================================
   SPELLVOLT — interactions
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- starfield ---------- */
  const cv = document.getElementById("stars");
  if (cv) {
    const ctx = cv.getContext("2d");
    let stars = [], w, h, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px";
      cv.style.height = innerHeight + "px";
      const count = Math.round((innerWidth * innerHeight) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.2) * dpr,
        a: Math.random(), tw: Math.random() * 0.02 + 0.004,
        c: Math.random() < 0.18 ? "168,123,255" : (Math.random() < 0.3 ? "47,225,232" : "220,228,255"),
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.tw;
        const o = 0.35 + Math.abs(Math.sin(s.a)) * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${o})`;
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize();
    addEventListener("resize", resize);
    if (!reduce) draw(); else draw();
  }

  /* ---------- custom reticle ---------- */
  const ret = document.getElementById("reticle");
  if (ret && matchMedia("(pointer:fine)").matches) {
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; ret.style.opacity = "1"; });
    addEventListener("mousedown", () => ret.classList.add("click"));
    addEventListener("mouseup", () => ret.classList.remove("click"));
    addEventListener("mouseleave", () => ret.style.opacity = "0");
    (function loop() {
      cx += (tx - cx) * 0.32; cy += (ty - cy) * 0.32;
      ret.style.left = cx + "px"; ret.style.top = cy + "px";
      requestAnimationFrame(loop);
    })();
    // enlarge over interactive targets
    const hov = 'a,button,.slot,.way,.boss,.mode,.preset,.rx,.btn';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hov)) ret.style.transform = "scale(1.5)";
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hov)) ret.style.transform = "";
    });
  } else if (ret) {
    ret.style.display = "none";
    document.body.style.cursor = "auto";
  }

  /* ---------- nav solidify ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("solid", scrollY > 40);
    const gf = document.getElementById("gridFloor");
    if (gf && !reduce) gf.style.backgroundPositionY = (scrollY * 0.25) + "px, " + (scrollY * 0.25) + "px";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* failsafe: if requestAnimationFrame is paused (offscreen iframe / capture),
     CSS transitions never advance — detect that and force content visible. */
  let rafAlive = false;
  requestAnimationFrame(() => requestAnimationFrame(() => { rafAlive = true; }));
  setTimeout(() => { if (!rafAlive) document.documentElement.classList.add("reveal-done"); }, 700);

  /* ---------- boss stage tints ---------- */
  const bossTints = {
    fire:   "radial-gradient(120% 100% at 50% 120%, rgba(255,90,44,.45), transparent 70%)",
    ice:    "radial-gradient(120% 100% at 50% 120%, rgba(56,216,230,.4), transparent 70%)",
    light:  "radial-gradient(120% 100% at 50% 120%, rgba(179,136,255,.45), transparent 70%)",
    rock:   "radial-gradient(120% 100% at 50% 120%, rgba(208,168,95,.4), transparent 70%)",
    storm2: "radial-gradient(120% 100% at 50% 120%, rgba(58,134,255,.4), transparent 70%)",
    summit2:"radial-gradient(120% 100% at 50% 120%, rgba(120,140,255,.32), transparent 70%)",
    summit: "conic-gradient(from 0deg, rgba(255,90,44,.35), rgba(255,225,77,.3), rgba(56,216,230,.35), rgba(179,136,255,.4), rgba(255,90,44,.35))",
  };
  const styleEl = document.createElement("style");
  let css = "";
  document.querySelectorAll(".boss").forEach((b, i) => {
    const t = bossTints[b.dataset.boss];
    if (t) { b.dataset.idx = i; css += `.boss[data-idx="${i}"]::before{background:${t};}`; }
  });
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------- reaction matrix ---------- */
  const EL = {
    fire:  { name: "Fire", g: "#g-fire", c: "var(--fire-hi)", v: "rgba(255,90,44,.5)" },
    ice:   { name: "Ice", g: "#g-ice", c: "var(--ice-hi)", v: "rgba(56,216,230,.5)" },
    light: { name: "Lightning", g: "#g-bolt", c: "var(--light-hi)", v: "rgba(179,136,255,.5)" },
    water: { name: "Water", g: "#g-water", c: "var(--water-hi)", v: "rgba(58,134,255,.5)" },
  };
  const order = ["fire", "ice", "light", "water"];
  // [cast][surface] -> reaction
  const RX = {
    "fire-ice":    { r: "water", t: "Melt", d: "Fire melts the ice patch down into a slowing water surface." },
    "fire-water":  { r: "steam", t: "Steam Cloud", d: "Fire boils the water into a vision-blocking steam screen." },
    "fire-light":  { r: "burst", t: "Explosion", d: "Igniting a charged surface detonates a small AoE burst." },
    "ice-fire":    { r: "ice",   t: "Extinguish", d: "Ice snuffs the flames — the fire patch is gone." },
    "ice-water":   { r: "ice",   t: "Freeze", d: "Water freezes solid into a slick, jump-stripping ice patch." },
    "ice-light":   { r: "light", t: "Shock Zone", d: "Charged ice becomes an electrified contact-shock zone." },
    "light-ice":   { r: "burst-l", t: "Shock Zone", d: "Lightning electrifies the ice into a damaging shock field." },
    "light-fire":  { r: "burst", t: "Explosion", d: "Lightning onto fire detonates — a small, punchy AoE blast." },
    "light-water": { r: "burst-l", t: "Shock Zone", d: "Soaked floor conducts: lightning spreads a contact-shock zone." },
    "water-fire":  { r: "steam", t: "Steam Cloud", d: "Water douses the fire and throws up a steam screen." },
    "water-ice":   { r: "water", t: "Slush", d: "Water pools over the ice — footing stays treacherous." },
    "water-light": { r: "burst-l", t: "Shock Zone", d: "Wet ground plus a live bolt: an instant contact-shock zone." },
  };
  const RXGLYPH = { water: "#g-water", steam: "#g-steam", ice: "#g-ice", light: "#g-bolt", burst: "#g-burst", "burst-l": "#g-bolt" };
  const RXCOLOR = { water: "var(--water-hi)", steam: "var(--steam)", ice: "var(--ice-hi)", light: "var(--light-hi)", burst: "var(--fire-hi)", "burst-l": "var(--light-hi)" };

  const grid = document.getElementById("reactGrid");
  function glyph(id, size, color) { return `<svg width="${size}" height="${size}" style="color:${color}"><use href="${id}"/></svg>`; }

  if (grid) {
    // corner
    grid.insertAdjacentHTML("beforeend", `<div class="cell corner"></div>`);
    // column headers (surface already on floor)
    order.forEach((k) => {
      grid.insertAdjacentHTML("beforeend",
        `<div class="cell hd"><span class="e" style="color:${EL[k].c}">${glyph(EL[k].g, 22, EL[k].c)}</span>${EL[k].name}</div>`);
    });
    // rows
    order.forEach((castK) => {
      grid.insertAdjacentHTML("beforeend",
        `<div class="cell hd"><span class="e" style="color:${EL[castK].c}">${glyph(EL[castK].g, 22, EL[castK].c)}</span>${EL[castK].name}</div>`);
      order.forEach((surfK) => {
        if (castK === surfK) {
          grid.insertAdjacentHTML("beforeend", `<div class="cell rx same">＋</div>`);
          return;
        }
        const key = castK + "-" + surfK;
        const rx = RX[key];
        if (!rx) { grid.insertAdjacentHTML("beforeend", `<div class="cell rx none">·</div>`); return; }
        const col = RXCOLOR[rx.r];
        const el = document.createElement("div");
        el.className = "cell rx";
        el.dataset.react = key;
        el.style.color = col;
        el.innerHTML = glyph(RXGLYPH[rx.r], 26, col);
        grid.appendChild(el);
      });
    });

    // detail panel
    const rdA = document.getElementById("rdA"), rdB = document.getElementById("rdB"),
          rdC = document.getElementById("rdC"), rdTitle = document.getElementById("rdTitle"),
          rdText = document.getElementById("rdText");
    let locked = false;

    function show(key) {
      const [castK, surfK] = key.split("-");
      const rx = RX[key]; if (!rx) return;
      rdA.innerHTML = glyph(EL[castK].g, 26, EL[castK].c);
      rdA.style.borderColor = EL[castK].v;
      rdB.innerHTML = glyph(EL[surfK].g, 26, EL[surfK].c);
      rdB.style.borderColor = EL[surfK].v;
      const col = RXCOLOR[rx.r];
      rdC.innerHTML = glyph(RXGLYPH[rx.r], 26, col);
      rdC.style.borderColor = col.replace("var(", "").replace(")", "") ? "rgba(255,255,255,.25)" : "";
      rdC.style.boxShadow = `0 0 18px ${col}`;
      rdTitle.textContent = rx.t;
      rdText.classList.remove("placeholder");
      rdText.textContent = rx.d;
    }

    grid.addEventListener("mouseover", (e) => {
      const c = e.target.closest(".rx[data-react]");
      if (!c || locked) return;
      grid.querySelectorAll(".rx.active").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      show(c.dataset.react);
    });
    grid.addEventListener("click", (e) => {
      const c = e.target.closest(".rx[data-react]");
      if (!c) return;
      if (locked && c.classList.contains("active")) { locked = false; c.classList.remove("active"); return; }
      grid.querySelectorAll(".rx.active").forEach((x) => x.classList.remove("active"));
      c.classList.add("active"); show(c.dataset.react); locked = true;
    });

    // default highlight: fire onto ice
    const def = grid.querySelector('.rx[data-react="fire-ice"]');
    if (def) { def.classList.add("active"); show("fire-ice"); }
  }
})();
