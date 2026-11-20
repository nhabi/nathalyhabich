/* Nathaly Habich — interacciones del sitio (brand/sistema-web.md)
   - Menú móvil
   - Cursor "VER" sobre proyectos y fotos, y movimiento del video según el mouse
   - Franja de marca: se anima solo mientras está en pantalla
   - Respeta "reducir movimiento" del sistema */
(function () {
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function listo(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  listo(function () {
    /* ---------- Menú móvil ---------- */
    var boton = document.querySelector('.nh-menu-boton');
    var panel = document.getElementById('nh-panel');
    if (boton && panel) {
      var cerrar = function () {
        panel.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nh-menu-abierto');
      };
      boton.addEventListener('click', function () {
        var abrir = !panel.classList.contains('abierto');
        panel.classList.toggle('abierto', abrir);
        boton.setAttribute('aria-expanded', String(abrir));
        document.body.classList.toggle('nh-menu-abierto', abrir);
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
      window.addEventListener('resize', function () { if (window.innerWidth >= 1024) cerrar(); });
    }

    /* ---------- Animaciones SVG (SMIL) en pausa si se pide menos movimiento ---------- */
    if (reducir) {
      document.querySelectorAll('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
    }

    /* ---------- Franja de marca ---------- */
    document.querySelectorAll('.franja').forEach(function (franja) {
      if (!('IntersectionObserver' in window)) { franja.classList.add('en-vista'); return; }
      new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) { franja.classList.toggle('en-vista', e.isIntersecting); });
      }, { threshold: 0.25 }).observe(franja);
    });

    /* ---------- Cursor "VER" ---------- */
    var conMouse = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var objetivos = '.tarjeta, #lightgallery .item';
    if (!conMouse) return;

    var etiqueta = document.documentElement.lang === 'en' ? 'VIEW' : 'VER';
    var cursor = document.createElement('div');
    cursor.className = 'nh-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML =
      '<svg viewBox="0 0 200 200"><path>' +
      '<animate attributeName="d" dur="4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.2 1;0.45 0 0.2 1" ' +
      'values="M60,30 C110,10 175,40 180,95 C185,140 150,170 110,175 C70,180 25,165 20,120 C15,75 30,42 60,30 Z;' +
      'M50,45 C90,15 160,25 175,75 C190,125 160,180 105,178 C55,176 15,150 18,105 C20,75 30,58 50,45 Z;' +
      'M60,30 C110,10 175,40 180,95 C185,140 150,170 110,175 C70,180 25,165 20,120 C15,75 30,42 60,30 Z"/>' +
      '</path></svg><b>' + etiqueta + '</b>';
    document.body.appendChild(cursor);
    if (reducir && cursor.querySelector('svg').pauseAnimations) cursor.querySelector('svg').pauseAnimations();

    var x = -200, y = -200, cx = x, cy = y, activo = false, corriendo = false;
    function seguir() {
      cx += (x - cx) * (reducir ? 1 : 0.2);
      cy += (y - cy) * (reducir ? 1 : 0.2);
      cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) scale(' + (activo ? 1 : 0.4) + ')';
      if (activo || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) requestAnimationFrame(seguir);
      else corriendo = false;
    }
    function arrancar() { if (!corriendo) { corriendo = true; requestAnimationFrame(seguir); } }
    document.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; if (activo) arrancar(); }, { passive: true });

    // Delegación: funciona también con tarjetas que se agregan después (grilla renderizada por JS)
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest(objetivos);
      if (t && !activo) { activo = true; cx = x = e.clientX; cy = y = e.clientY; cursor.classList.add('activo'); arrancar(); }
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest && e.target.closest(objetivos);
      if (!t) return;
      if (e.relatedTarget && t.contains(e.relatedTarget)) return;
      activo = false; cursor.classList.remove('activo'); arrancar();
      var media = t.querySelector('.tarjeta__media');
      if (media) { media.style.removeProperty('--mx'); media.style.removeProperty('--my'); }
    });
    document.addEventListener('mousemove', function (e) {
      var media = e.target.closest && e.target.closest('.tarjeta__media');
      if (!media || reducir) return;
      var r = media.getBoundingClientRect();
      media.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      media.style.setProperty('--my', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    }, { passive: true });
  });
})();
