/* Keeps the reader's place when switching between design directions.
   Stores the section in view (plus how far into it) and restores it on the next page.
   The restore waits for the design to finish streaming in before it gives up. */
(function () {
  var KEY = "mlfp-scroll";
  var script = document.currentScript;
  var allowRatioFallback = !script || script.getAttribute("data-fallback") !== "none";
  var docEl = document.documentElement;
  var OFFSET = 80;
  var userMoved = false;
  var saverOn = false;

  function y() { return window.scrollY || docEl.scrollTop || 0; }
  function maxY() { return Math.max(1, docEl.scrollHeight - window.innerHeight); }
  function rendered() { return docEl.scrollHeight > window.innerHeight * 1.2; }

  /* Landmarks: real sections plus anything the nav links to (some ids sit on divs). */
  function landmarks() {
    var seen = {}, out = [];
    var push = function (el) {
      if (!el || !el.id || seen[el.id]) return;
      if (!el.offsetHeight) return;
      seen[el.id] = 1;
      out.push(el);
    };
    document.querySelectorAll("section[id], footer[id]").forEach(push);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id) push(document.getElementById(id));
    });
    return out.sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top; });
  }

  function save() {
    if (!saverOn) return;
    var cur = y();
    var probe = cur + OFFSET;
    var id = null, ratio = 0;
    var els = landmarks();
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var top = el.getBoundingClientRect().top + cur;
      var h = el.offsetHeight || 1;
      if (probe >= top && probe < top + h) { id = el.id; ratio = (probe - top) / h; break; }
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ id: id, ratio: ratio, doc: cur / maxY(), y: cur, t: Date.now() }));
    } catch (e) {}
  }

  function startSaver() {
    if (saverOn) return;
    saverOn = true;
    var pending = false;
    window.addEventListener("scroll", function () {
      if (pending) return;
      pending = true;
      setTimeout(function () { pending = false; save(); }, 220);
    }, { passive: true });
    window.addEventListener("pagehide", save);
  }

  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) {
    window.addEventListener(ev, function () { userMoved = true; }, { passive: true });
  });

  var pageLoaded = document.readyState === "complete";
  window.addEventListener("load", function () { pageLoaded = true; });

  var st = null;
  try { st = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  var dbg = window.__mlfpScroll = { st: st, ticks: 0, target: null, aborted: null };

  if (!st || location.hash || (st.y || 0) < 120 || Date.now() - (st.t || 0) > 3600000) {
    dbg.aborted = "no-state";
    startSaver();
    return;
  }

  /* Restore phase: nothing is written to storage until it lands or is abandoned. */
  var elapsed = 0, stable = 0, lastH = -1, landed = 0;
  var poll = function () {
    dbg.ticks++;
    if (userMoved) { dbg.aborted = "user"; startSaver(); return; }

    var h = docEl.scrollHeight;
    stable = h === lastH ? stable + 1 : 0;
    lastH = h;

    var target = null;
    var el = st.id ? document.getElementById(st.id) : null;
    if (el && el.offsetHeight) {
      target = el.getBoundingClientRect().top + y() + (st.ratio || 0) * el.offsetHeight - OFFSET;
    } else if (allowRatioFallback && rendered() && stable >= 3) {
      target = (st.doc || 0) * maxY();
    }

    if (target !== null && rendered()) {
      target = Math.max(0, Math.min(maxY(), target));
      dbg.target = target;
      window.scrollTo(0, target);
      landed = Math.abs(y() - target) < 4 && stable >= 3 ? landed + 1 : 0;
      if (landed >= 4 && pageLoaded) { dbg.aborted = "landed"; startSaver(); return; }
    }

    elapsed += 110;
    if (elapsed < 9000) setTimeout(poll, 110);
    else { dbg.aborted = "timeout"; startSaver(); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(poll, 40); });
  else setTimeout(poll, 40);
})();
