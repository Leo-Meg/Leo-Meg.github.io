/* Bascule de langue, apparition au défilement. Rien d'autre.
   Le site reste entièrement lisible sans ce fichier. */
(function () {
  "use strict";

  var html = document.documentElement;
  var CLE = "langue";
  html.classList.add("js");

  function choisir(l) {
    html.setAttribute("data-lang", l);
    html.setAttribute("lang", l);
    try { localStorage.setItem(CLE, l); } catch (e) {}
    var b = document.querySelector(".bascule");
    if (b) {
      b.innerHTML = l === "fr" ? "<b>FR</b> / EN" : "FR / <b>EN</b>";
      b.setAttribute("aria-label", l === "fr" ? "Lire en anglais" : "Read in French");
    }
  }

  var depart = null;
  try { depart = localStorage.getItem(CLE); } catch (e) {}
  if (!depart) {
    depart = (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  choisir(depart);

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".bascule");
    if (!b) return;
    choisir(html.getAttribute("data-lang") === "fr" ? "en" : "fr");
  });

  if (!window.IntersectionObserver) {
    document.querySelectorAll("[data-reveal]").forEach(function (n) { n.classList.add("vu"); });
    return;
  }
  var obs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("vu"); obs.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
  document.querySelectorAll("[data-reveal]").forEach(function (n) { obs.observe(n); });
})();
