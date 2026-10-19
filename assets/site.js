/* Flexibility - comportements de la page */
(function () {
  'use strict';
  var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* adresse de telechargement unique (definie dans index.html) */
  var url = window.DOWNLOAD_URL;
  $('[data-download]').forEach(function (a) {
    if (url) a.setAttribute('href', url);
    else { a.setAttribute('href', '#installation'); a.setAttribute('data-soon', '1'); }
  });
  if (!url) $('.dl-soon').forEach(function (e) { e.hidden = false; });

  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* apparition au defilement */
  var rv = $('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* copie de l'empreinte */
  var cp = document.getElementById('copy-sha');
  if (cp) cp.addEventListener('click', function () {
    var t = document.getElementById('sha').textContent;
    var done = function () { cp.textContent = 'Copié'; setTimeout(function () { cp.textContent = 'Copier'; }, 1600); };
    try { navigator.clipboard.writeText(t).then(done, done); } catch (e) { done(); }
  });
})();
