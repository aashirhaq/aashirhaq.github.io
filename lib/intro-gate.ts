/**
 * Runs inline in <head> before first paint, so the decision "play the intro or
 * show the portfolio" never causes a content flash or a hydration mismatch.
 *
 * Sets <html data-intro>:
 *   "play"  — first entry this session, on Home, motion allowed, no Save-Data
 *   "enter" — everyone else: fast CSS settle-in, no cinematic
 *   (unset) — reduced motion, or JS disabled: content is simply visible
 *
 * Safety net: if the cinematic client code has not taken over within
 * INTRO_BOOT_TIMEOUT_MS (slow/failed JS), fall back to "enter" so content is
 * never trapped behind the overlay.
 */
export const INTRO_SESSION_KEY = "portfolioIntroPlayed";
export const INTRO_BOOT_TIMEOUT_MS = 5000;

export const introGateScript = `(function(){
  var d = document.documentElement;
  try {
    var played = sessionStorage.getItem("${INTRO_SESSION_KEY}") === "1";
    sessionStorage.setItem("${INTRO_SESSION_KEY}", "1");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var c = navigator.connection;
    var constrained = !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")));
    var home = location.pathname === "/" || location.pathname === "/index.html";
    if (!played && !reduced && !constrained && home) {
      d.setAttribute("data-intro", "play");
      // Fade the intro in only once its poster is decoded (never a hard pop).
      var ready = function () { d.setAttribute("data-poster", "ready"); };
      var img = new Image();
      img.fetchPriority = "high";
      img.onload = img.onerror = ready;
      img.src = "/media/robot-intro.poster.webp";
      setTimeout(ready, 1500);
      setTimeout(function () {
        if (!window.__cinematicAlive && d.getAttribute("data-intro") === "play") {
          d.setAttribute("data-intro", "enter");
        }
      }, ${INTRO_BOOT_TIMEOUT_MS});
    } else if (!reduced) {
      d.setAttribute("data-intro", "enter");
    }
  } catch (e) {}
})();`;
