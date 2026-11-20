/* Nathaly Habich — grilla de proyectos (una sola función para home, categorías y "todos los proyectos").
 *
 * Uso en el HTML:
 *   <div class="grilla" data-proyectos="mecaigoderisa-peru-2026,evidenciaoculta-2025" data-lang="es"></div>
 *
 * Nombre y cliente salen de /data/proyectos.json; el video (o la primera foto) de /<proyecto>/media.json.
 * scripts/prerender.py escribe estas mismas tarjetas en el HTML (para Google) y marca la grilla con
 * data-prerendered="true"; en ese caso este archivo no vuelve a dibujarlas.
 * Mantener el HTML de tarjeta() idéntico a card_html() de scripts/prerender.py.
 */
(function () {
  var cache = {};
  function json(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    }
    return cache[url];
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function posterDe(src) { return src.replace(/\.mp4$/i, '-poster.webp'); }

  // Ritmo: una ancha y dos medianas. Si al final sobran dos, van las dos medianas.
  function esAncha(i, total) {
    if (total % 3 === 2 && i >= total - 2) return false;
    return i % 3 === 0;
  }

  function tarjeta(slug, datos, media, i, total, lang) {
    var nombre = (lang === 'en' && datos.nombre_en) ? datos.nombre_en : datos.nombre;
    var href = (lang === 'en' ? '/en/' : '/') + slug + '/';
    var items = (media && media.media) || [];
    var video = items.filter(function (m) { return m.type === 'video'; })[0];
    var foto = items.filter(function (m) { return m.type === 'image'; })[0];
    var visual = video
      ? '<video src="' + esc(video.src) + '" poster="' + esc(posterDe(video.src)) + '" muted loop playsinline preload="none" data-lazy-video></video>'
      : (foto ? '<img src="' + esc(foto.src) + '" alt="' + esc(nombre) + '" loading="lazy" decoding="async">' : '');
    var numero = (i + 1 < 10 ? '0' : '') + (i + 1);
    return '<a class="tarjeta' + (esAncha(i, total) ? ' tarjeta--ancha' : '') + '" href="' + href + '">' +
      '<div class="tarjeta__media">' + visual + '</div>' +
      '<p class="tarjeta__pie"><span class="tarjeta__numero" aria-hidden="true">' + numero + '</span>' +
      '<span class="tarjeta__nombre">' + esc(nombre) + '</span>' +
      '<span class="tarjeta__cliente">— ' + esc(datos.cliente) + '</span></p></a>';
  }

  window.renderGrilla = function (contenedor, slugs, lang) {
    lang = lang || document.documentElement.lang || 'es';
    return json('/data/proyectos.json').then(function (catalogo) {
      var proyectos = (catalogo && catalogo.proyectos) || {};
      var validos = slugs.filter(function (s) { return proyectos[s]; });
      return Promise.all(validos.map(function (s) { return json('/' + s + '/media.json'); })).then(function (medias) {
        contenedor.innerHTML = validos.map(function (s, i) {
          return tarjeta(s, proyectos[s], medias[i], i, validos.length, lang);
        }).join('');
        if (window.lazyVideos) window.lazyVideos.observe(contenedor);
      });
    });
  };

  function iniciar() {
    document.querySelectorAll('.grilla[data-proyectos]').forEach(function (g) {
      if (g.dataset.prerendered === 'true') return; // ya viene escrita en el HTML
      var slugs = g.dataset.proyectos.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      window.renderGrilla(g, slugs, g.dataset.lang);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
