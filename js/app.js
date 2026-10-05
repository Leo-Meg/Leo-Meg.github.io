/* ============================================================
   Léo Mégret — vitrine
   Trois responsabilités, rien de plus :
     1. router l'accueil vers un panneau (par le hash, donc
        partageable et compatible avec le bouton « précédent »)
     2. révéler le contenu au défilement
     3. séquencer l'entrée de l'accueil

   Aucune dépendance. La classe `js` posée sur <html> est ce qui
   autorise le CSS à masquer les éléments animés : sans elle —
   donc sans JavaScript, ou si ce fichier échoue — tout reste
   visible et lisible.
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var corps    = document.body;
  var panneaux = document.getElementById('panneaux');
  var retour   = document.getElementById('retour');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.panneau'));
  var CLES     = sections.map(function (s) { return s.dataset.cle; });

  /* ----------------------------------------------------------
     1. Entrée séquencée de l'accueil
     ---------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-anim]'), function (el) {
    el.style.setProperty('--i', el.dataset.anim);
  });
  requestAnimationFrame(function () { corps.classList.add('pret'); });

  /* ----------------------------------------------------------
     2. Révélation au défilement

     Mesure directe plutôt qu'IntersectionObserver. L'API ne se
     déclenche pas dans certains contextes (navigateurs embarqués,
     rendu hors écran, onglet jamais peint) — et un contenu qui
     reste invisible parce qu'un observateur ne s'est jamais
     réveillé est précisément la panne silencieuse qu'on ne veut
     pas. Une quinzaine d'éléments mesurés une fois par frame de
     défilement : le coût est négligeable, le comportement est sûr.
     ---------------------------------------------------------- */
  var aReveler  = [];
  var enAttente = false;

  function revele() {
    enAttente = false;
    var hauteur = window.innerHeight || document.documentElement.clientHeight;
    var restants = [];
    for (var i = 0; i < aReveler.length; i++) {
      var el = aReveler[i];
      var r  = el.getBoundingClientRect();
      if (r.top < hauteur * 0.92 && r.bottom > 0) el.classList.add('vu');
      else restants.push(el);              /* révélé une seule fois */
    }
    aReveler = restants;
  }

  /* rAF sert à limiter la fréquence pendant le défilement, pas à
     décider si le contenu s'affiche : s'il n'est pas disponible ou
     ne se déclenche pas, on mesure directement. */
  function planifie() {
    if (enAttente) return;
    enAttente = true;
    if (window.requestAnimationFrame) requestAnimationFrame(revele);
    else revele();
  }

  function armeRevelations(racine) {
    aReveler = Array.prototype.slice.call(racine.querySelectorAll('[data-reveal]'));
    revele();                              /* immédiat : getBoundingClientRect
                                              force le calcul de mise en page */
    /* filets : une image qui arrive tard peut décaler la mise en page */
    setTimeout(planifie, 350);
    setTimeout(planifie, 1400);
  }

  /* ----------------------------------------------------------
     3. Routage
     ---------------------------------------------------------- */
  function cleDuHash() {
    var h = (location.hash || '').replace(/^#/, '');
    return CLES.indexOf(h) >= 0 ? h : null;
  }

  function prefereMoinsDeMouvement() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function applique(cle, animer) {
    function ouvrir() {
      sections.forEach(function (s) { s.hidden = (s.dataset.cle !== cle); });

      if (cle) {
        var actif = sections.filter(function (s) { return s.dataset.cle === cle; })[0];
        corps.classList.add('detail');
        corps.classList.remove('defile');
        panneaux.setAttribute('aria-hidden', 'false');
        panneaux.scrollTop = 0;
        document.title = actif.querySelector('h2').textContent + ' — Léo Mégret';
        armeRevelations(actif);
        retour.focus({ preventScroll: true });
      } else {
        corps.classList.remove('detail');
        panneaux.setAttribute('aria-hidden', 'true');
        aReveler = [];
        document.title = 'Léo Mégret — Ingénieur IA';
      }
    }

    /* View Transitions là où c'est disponible ; ailleurs, les
       transitions CSS font déjà tout le travail. */
    if (animer && document.startViewTransition && !prefereMoinsDeMouvement()) {
      document.startViewTransition(ouvrir);
    } else {
      ouvrir();
    }
  }

  window.addEventListener('hashchange', function () { applique(cleDuHash(), true); });

  retour.addEventListener('click', function () {
    if (location.hash) history.pushState(null, '', location.pathname + location.search);
    applique(null, true);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && corps.classList.contains('detail')) retour.click();
  });

  panneaux.addEventListener('scroll', function () {
    corps.classList.toggle('defile', panneaux.scrollTop > 8);
    planifie();
  }, { passive: true });

  window.addEventListener('resize', planifie, { passive: true });
  window.addEventListener('load', planifie);

  /* état initial — permet d'ouvrir directement sur #parcours */
  applique(cleDuHash(), false);

})();
