// bg3d.js — lo-fi 8-bit pixel art background.
// Renders a parallax night-scene at low internal resolution (pixel size 6) and
// scales up with image-rendering: pixelated for the chunky NES/Game-Boy look.
// Layers (back to front):
//   1. twinkling stars (single accent-colored pixels, random phase)
//   2. 16x16 moon sprite (with two craters)
//   3. drifting cloud puffs
//   4. far mountain ridge   — slowest parallax
//   5. mid mountain ridge
//   6. near mountain ridge  — fastest parallax, treeline silhouette
// All colors are derived from --paper / --ink / --accent / --paper-2 so each
// theme reskins the scene. Animates at 12fps internally for that lo-fi feel
// regardless of monitor refresh rate.
//
// Public API kept identical to previous bg3d.js so app.jsx doesn't change:
//   window.bg3d.start()        — boot the scene
//   window.bg3d.setEnabled(b)  — show/hide
//   window.bg3d.refreshTheme() — re-read CSS vars (called on theme change)

(function () {
  const PIXEL = 6;       // CSS px per drawn pixel — chunkier = more 8-bit
  const FPS   = 12;      // lo-fi cap, regardless of rAF rate

  let canvas, ctx;
  let W = 0, H = 0;
  let stars = [], ridges = [], clouds = [], shooting = null;
  let palette = {};
  let started = false, enabled = true;
  let raf, lastDraw = 0, frameNo = 0;

  // ── color helpers ────────────────────────────────────────────────────────
  // We use a hidden div + getComputedStyle so the browser normalizes whatever
  // the CSS var contains (hex, oklch, color-mix, etc) into rgb() for us.
  function getRgb(varName, fallback) {
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;color:var(${varName}, ${fallback})`;
    document.body.appendChild(probe);
    const c = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    const m = c.match(/[\d.]+/g);
    return m ? [+m[0] | 0, +m[1] | 0, +m[2] | 0] : [0, 0, 0];
  }
  function rgb(c, a)  { return a == null ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
  function mix(a, b, t) {
    return [
      Math.round(a[0] * (1 - t) + b[0] * t),
      Math.round(a[1] * (1 - t) + b[1] * t),
      Math.round(a[2] * (1 - t) + b[2] * t),
    ];
  }

  function refreshTheme() {
    const sky    = getRgb("--paper",   "#ece2c8");
    const ink    = getRgb("--ink",     "#2a1c0f");
    const accent = getRgb("--accent",  "#a44016");
    const paper2 = getRgb("--paper-2", "#ebe1c0");
    palette = {
      sky,
      far:    mix(ink, sky, 0.55),
      mid:    mix(ink, sky, 0.32),
      near:   mix(ink, sky, 0.08),
      treetip:mix(ink, accent, 0.3),
      star:   accent,
      starDim:mix(accent, sky, 0.45),
      moon:   paper2,
      crater: mix(paper2, ink, 0.3),
      cloud:  mix(ink, sky, 0.62),
      shoot:  mix(accent, sky, 0.1),
    };
  }

  // ── scene generation ────────────────────────────────────────────────────
  // Ridges are precomputed at 2× width so we can scroll an offset without
  // ever needing to re-sample. Re-built on resize when W changes.
  function buildScene() {
    // stars sit in upper 60% of the sky; placed once, twinkle by phase
    stars = [];
    const skyBand = Math.floor(H * 0.6);
    const count = Math.floor((W * skyBand) / 220);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.floor(Math.random() * W),
        y: Math.floor(Math.random() * skyBand),
        period: 18 + Math.floor(Math.random() * 60), // frames
        phase: Math.floor(Math.random() * 60),
        bright: Math.random() < 0.25,                // a few are bigger
      });
    }

    // ridges — three layers, far → near
    const cfg = [
      { baseY: H * 0.62, amp: H * 0.10, freq: 0.018, jitter: 1, layer: "far"  },
      { baseY: H * 0.74, amp: H * 0.08, freq: 0.026, jitter: 1, layer: "mid"  },
      { baseY: H * 0.88, amp: H * 0.06, freq: 0.045, jitter: 2, layer: "near" },
    ];
    ridges = cfg.map((c) => {
      const y = [];
      const span = W * 2;
      for (let x = 0; x < span; x++) {
        let h = Math.sin(x * c.freq) * c.amp
              + Math.sin(x * c.freq * 2.3 + 1.7) * c.amp * 0.35
              + Math.sin(x * c.freq * 0.5 + 0.4) * c.amp * 0.4;
        if (c.jitter) h += (Math.random() - 0.5) * c.jitter * 2;
        y.push(Math.floor(c.baseY - h));
      }
      return { y, layer: c.layer };
    });

    // clouds — slow drifters; cluster of 2x1 puffs forming a longer horizontal
    clouds = [];
    const ccount = Math.max(2, Math.floor(W / 60));
    for (let i = 0; i < ccount; i++) {
      clouds.push({
        x: Math.random() * W,
        y: 8 + Math.random() * Math.floor(H * 0.35),
        w: 4 + Math.floor(Math.random() * 6),
        speed: 0.06 + Math.random() * 0.05, // pixels/frame
      });
    }
  }

  // 16x16 moon: '1' = body, '2' = crater shadow, '.' = transparent
  const MOON = [
    "................",
    "....1111111.....",
    "...111122111....",
    "..11111111111...",
    ".1112111111111..",
    ".1111111111111..",
    ".1111111121111..",
    ".1111121111111..",
    ".1111111111111..",
    ".1111211111111..",
    ".1111111121111..",
    ".1111111111111..",
    "..11111111111...",
    "...111111111....",
    ".....11111......",
    "................",
  ];

  function drawSprite(sprite, x, y, colors) {
    for (let py = 0; py < sprite.length; py++) {
      const row = sprite[py];
      for (let px = 0; px < row.length; px++) {
        const ch = row[px];
        if (ch === "." || ch === " ") continue;
        ctx.fillStyle = colors[ch];
        ctx.fillRect(x + px, y + py, 1, 1);
      }
    }
  }

  // ── frame ───────────────────────────────────────────────────────────────
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!enabled) return;
    if (now - lastDraw < 1000 / FPS) return;
    lastDraw = now;
    frameNo++;

    ctx.clearRect(0, 0, W, H);

    // stars — twinkle by phase. bright stars stay on longer.
    for (const s of stars) {
      const phase = (frameNo + s.phase) % s.period;
      const visible = phase > s.period * 0.18;
      if (!visible) continue;
      ctx.fillStyle = phase > s.period * 0.5 ? rgb(palette.star) : rgb(palette.starDim);
      ctx.fillRect(s.x, s.y, 1, 1);
      if (s.bright && phase > s.period * 0.4) {
        // 4-pixel cross for the brighter ones
        ctx.fillRect(s.x - 1, s.y, 1, 1);
        ctx.fillRect(s.x + 1, s.y, 1, 1);
        ctx.fillRect(s.x, s.y - 1, 1, 1);
        ctx.fillRect(s.x, s.y + 1, 1, 1);
      }
    }

    // shooting star — kicks off occasionally, ~once every 12s
    if (!shooting && Math.random() < 1 / (FPS * 12)) {
      shooting = {
        x: Math.random() * W * 0.6,
        y: Math.random() * H * 0.3,
        life: 14,
        vx: 4, vy: 1.2,
      };
    }
    if (shooting) {
      ctx.fillStyle = rgb(palette.shoot);
      // tail of 6 fading pixels
      for (let k = 0; k < 6; k++) {
        ctx.globalAlpha = (1 - k / 6) * 0.9;
        ctx.fillRect(
          Math.floor(shooting.x - k * shooting.vx * 0.5),
          Math.floor(shooting.y - k * shooting.vy * 0.5),
          1, 1,
        );
      }
      ctx.globalAlpha = 1;
      shooting.x += shooting.vx;
      shooting.y += shooting.vy;
      if (--shooting.life <= 0 || shooting.x > W) shooting = null;
    }

    // moon — sits in upper-right, drifts ~1px every few seconds via sin
    const moonX = Math.floor(W - 32 + Math.sin(frameNo * 0.004) * 1.5);
    const moonY = Math.floor(10 + Math.cos(frameNo * 0.003) * 1.2);
    drawSprite(MOON, moonX, moonY, {
      "1": rgb(palette.moon),
      "2": rgb(palette.crater),
    });

    // clouds
    ctx.fillStyle = rgb(palette.cloud, 0.78);
    for (const c of clouds) {
      c.x -= c.speed;
      if (c.x + c.w * 2 < -4) c.x = W + 4;
      const baseX = Math.floor(c.x);
      const baseY = Math.floor(c.y);
      // chunky cloud — 2-wide columns, varying height for ends
      for (let i = 0; i < c.w; i++) {
        const isEnd = i === 0 || i === c.w - 1;
        const isNearEnd = i === 1 || i === c.w - 2;
        const h = isEnd ? 1 : isNearEnd ? 2 : 3;
        const yOff = isEnd ? 1 : 0;
        ctx.fillRect(baseX + i * 2, baseY + yOff, 2, h);
      }
    }

    // ridges — back to front. Parallax via column offset.
    const offFar  = Math.floor(frameNo * 0.18) % W;
    const offMid  = Math.floor(frameNo * 0.42) % W;
    const offNear = Math.floor(frameNo * 0.85) % W;
    const offsets = [offFar, offMid, offNear];
    const colors  = [palette.far, palette.mid, palette.near];

    for (let layer = 0; layer < 3; layer++) {
      const r = ridges[layer].y;
      const off = offsets[layer];
      ctx.fillStyle = rgb(colors[layer]);
      // single-rect-per-column fill — this is the bulk of frame cost so we
      // stay in one fillStyle batch per ridge.
      for (let x = 0; x < W; x++) {
        const idx = (x + off) % r.length;
        const top = r[idx];
        if (top < H) ctx.fillRect(x, top, 1, H - top);
      }

      // top "highlight" line on near ridge — a single accent-tinted row,
      // gives the silhouette a 1-pixel rim like NES treetops.
      if (layer === 2) {
        ctx.fillStyle = rgb(palette.treetip, 0.65);
        for (let x = 0; x < W; x++) {
          const idx = (x + off) % r.length;
          const top = r[idx];
          if (top < H) ctx.fillRect(x, top, 1, 1);
        }
      }
    }
  }

  // ── boot / resize ───────────────────────────────────────────────────────
  function sizeCanvas() {
    if (!canvas) return;
    W = Math.max(64, Math.ceil(window.innerWidth  / PIXEL));
    H = Math.max(36, Math.ceil(window.innerHeight / PIXEL));
    canvas.width  = W;
    canvas.height = H;
    canvas.style.imageRendering = "pixelated";
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
  }

  function onResize() {
    sizeCanvas();
    buildScene();
  }

  function start() {
    if (started) return;
    canvas = document.getElementById("bg3d");
    if (!canvas) return;
    sizeCanvas();
    refreshTheme();
    buildScene();
    window.addEventListener("resize", onResize);
    started = true;
    raf = requestAnimationFrame(frame);
  }

  function setEnabled(on) {
    enabled = !!on;
    if (canvas) canvas.style.opacity = on ? "" : "0";
  }

  window.bg3d = { start, setEnabled, refreshTheme };
  window.addEventListener("tweakchange", refreshTheme);
})();
