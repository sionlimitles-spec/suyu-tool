/* Suyu Tool — app.js
   QR Code Generator + UI behaviour. Everything runs locally in the browser. */

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  // Support full UTF-8 (Indonesian text, emoji) in QR payload.
  if (window.qrcode && qrcode.stringToBytesFuncs && qrcode.stringToBytesFuncs["UTF-8"]) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
  }

  var state = {
    text: "https://suyu.tool",
    ecc: "M",
    size: 480,
    dot: "rounded",
    eye: "rounded",
    margin: 2,
    fg: "#0b3bd6",
    fg2: "#22d3ee",
    bg: "#ffffff",
    bgNone: false,
    grad: true
  };

  var canvas = $("qrCanvas");
  var ctx = canvas.getContext("2d");
  var statusEl = $("qrStatus");
  var statusTimer = null;

  /* ---------- helpers ---------- */

  function roundRectPath(c, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function setStatus(msg, isError) {
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("err", !!isError);
    if (statusTimer) clearTimeout(statusTimer);
    if (msg) statusTimer = setTimeout(function () { statusEl.textContent = ""; }, 4000);
  }

  function finderRegions(count) {
    return [
      [0, 0],
      [0, count - 7],
      [count - 7, 0]
    ];
  }

  function inFinder(r, c, regions) {
    for (var i = 0; i < regions.length; i++) {
      var r0 = regions[i][0], c0 = regions[i][1];
      if (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7) return true;
    }
    return false;
  }

  /* ---------- QR rendering ---------- */

  function render() {
    var text = state.text.trim();

    if (!text) {
      renderEmpty();
      return;
    }

    var qr;
    try {
      qr = qrcode(0, state.ecc);
      qr.addData(text);
      qr.make();
    } catch (e) {
      renderEmpty();
      setStatus("Data terlalu panjang untuk level koreksi ini — coba level lebih rendah (L) atau pendekkan teks.", true);
      return;
    }

    var count = qr.getModuleCount();
    var margin = state.margin;
    var total = count + margin * 2;
    var size = state.size;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    // Background
    if (!state.bgNone) {
      ctx.fillStyle = state.bg;
      ctx.fillRect(0, 0, size, size);
    }

    var modulePx = size / total;
    var fill = state.grad
      ? ctx.createLinearGradient(0, 0, size, size)
      : state.fg;
    if (state.grad) {
      fill.addColorStop(0, state.fg);
      fill.addColorStop(1, state.fg2);
    }

    var regions = finderRegions(count);

    // Draw data modules (skip finder areas)
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (!qr.isDark(r, c)) continue;
        if (inFinder(r, c, regions)) continue;
        drawDot(r, c, modulePx, fill);
      }
    }

    // Draw finder patterns on top
    for (var k = 0; k < regions.length; k++) {
      drawFinder(regions[k][0], regions[k][1], modulePx, fill);
    }

    $("qrMeta").textContent =
      size + " × " + size + " px · " +
      (state.bgNone ? "latar transparan" : "latar " + state.bg) +
      (state.grad ? " · gradasi" : "");
  }

  function drawDot(r, c, s, fill) {
    var x = (c + state.margin) * s;
    var y = (r + state.margin) * s;
    ctx.fillStyle = fill;

    if (state.dot === "square") {
      ctx.fillRect(x, y, s, s);
    } else if (state.dot === "circle") {
      var inset = s * 0.1;
      ctx.beginPath();
      ctx.arc(x + s / 2, y + s / 2, s / 2 - inset, 0, Math.PI * 2);
      ctx.fill();
    } else { // rounded
      var g = s * 0.06;
      roundRectPath(ctx, x + g, y + g, s - g * 2, s - g * 2, s * 0.32);
      ctx.fill();
    }
  }

  function drawFinder(r0, c0, s, fill) {
    var x = (c0 + state.margin) * s;
    var y = (r0 + state.margin) * s;
    var w = 7 * s;

    ctx.fillStyle = fill;
    ctx.strokeStyle = fill;

    // Outer ring (1 module thick)
    if (state.eye === "circle") {
      ctx.lineWidth = s;
      ctx.beginPath();
      ctx.arc(x + w / 2, y + w / 2, w / 2 - s / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (state.eye === "rounded") {
      ctx.lineWidth = s;
      roundRectPath(ctx, x + s / 2, y + s / 2, w - s, w - s, s * 1.5);
      ctx.stroke();
    } else { // square
      ctx.lineWidth = s;
      ctx.strokeRect(x + s / 2, y + s / 2, w - s, w - s);
    }

    // Center (3 modules)
    var cx = x + 2 * s, cy = y + 2 * s, cw = 3 * s;
    if (state.eye === "circle") {
      ctx.beginPath();
      ctx.arc(cx + cw / 2, cy + cw / 2, cw / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (state.eye === "rounded") {
      roundRectPath(ctx, cx, cy, cw, cw, s * 0.9);
      ctx.fill();
    } else {
      ctx.fillRect(cx, cy, cw, cw);
    }
  }

  function renderEmpty() {
    var size = state.size;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(120,140,180,0.12)";
    ctx.fillRect(0, 0, size, size);
    $("qrMeta").textContent = "Masukkan teks atau link untuk mulai";
  }

  /* ---------- events ---------- */

  function readState() {
    state.text = $("qrText").value;
    state.ecc = $("qrEcc").value;
    state.size = parseInt($("qrSize").value, 10);
    state.dot = $("qrDot").value;
    state.eye = $("qrEye").value;
    state.margin = parseInt($("qrMargin").value, 10);
    state.fg = $("qrFg").value;
    state.fg2 = $("qrFg2").value;
    state.bg = $("qrBg").value;
    state.bgNone = $("qrBgNone").checked;
    state.grad = $("qrGrad").checked;
    $("sizeVal").textContent = state.size + "px";
    $("marginVal").textContent = state.margin + " modul";
  }

  var debounce;
  function onInput() {
    readState();
    clearTimeout(debounce);
    debounce = setTimeout(render, 80);
  }

  function bind() {
    var ids = ["qrText", "qrEcc", "qrSize", "qrDot", "qrEye", "qrMargin",
               "qrFg", "qrFg2", "qrBg", "qrBgNone", "qrGrad"];
    for (var i = 0; i < ids.length; i++) {
      $(ids[i]).addEventListener("input", onInput);
      $(ids[i]).addEventListener("change", onInput);
    }

    $("qrDownload").addEventListener("click", function () {
      canvas.toBlob(function (blob) {
        if (!blob) { setStatus("Gagal membuat gambar.", true); return; }
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "suyu-tool-qr.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 500);
        setStatus("Berhasil diunduh! ✅");
      }, "image/png");
    });

    $("qrCopy").addEventListener("click", function () {
      canvas.toBlob(function (blob) {
        if (!blob) { setStatus("Gagal menyalin.", true); return; }
        if (navigator.clipboard && window.ClipboardItem) {
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
            .then(function () { setStatus("Gambar disalin ke clipboard! ✅"); })
            .catch(function () { setStatus("Tidak bisa menyalin di browser ini — pakai tombol Unduh.", true); });
        } else {
          setStatus("Browser ini belum mendukung salin gambar — pakai tombol Unduh.", true);
        }
      }, "image/png");
    });
  }

  /* ---------- theme ---------- */

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("suyu-theme"); } catch (e) {}
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    var light = saved ? saved === "light" : prefersLight;
    document.documentElement.setAttribute("data-theme", light ? "light" : "dark");

    $("themeBtn").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "light";
      var next = cur ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("suyu-theme", next); } catch (e) {}
    });
  }

  /* ---------- reveal on scroll ---------- */

  function initReveal() {
    var els = document.querySelectorAll(".tool-card, .feat, .qr-controls, .qr-preview, .hero-stats .stat");
    var io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    els.forEach(function (el) {
      el.classList.add("reveal");
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  /* ---------- boot ---------- */

  function init() {
    $("year").textContent = new Date().getFullYear();
    initTheme();
    bind();
    readState();
    render();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
