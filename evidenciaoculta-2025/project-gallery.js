(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

  const posterFor = (src) => src.replace(/\.mp4$/i, "-poster.webp");
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Debe coincidir con lightbox_video_html() de scripts/prerender.py
  const lightboxVideoHtml = (src) =>
    '<video class="lg-video-object lg-html5" controls muted loop playsinline preload="none"><source src="' + escapeAttr(src) + '" type="video/mp4"></video>';
  const initLightbox = () => {
    if (window.jQuery && window.jQuery.fn.lightGallery) {
      window.jQuery(gallery).lightGallery({ selector: ".item", download: false, exThumbImage: "data-thumb" });
    }
  };

  // Si el contenido ya viene en el HTML (scripts/prerender.py), no lo duplicamos:
  // solo activamos los videos diferidos y la galería/lightbox.
  if (gallery.dataset.prerendered === "true") {
    if (window.lazyVideos) window.lazyVideos.observe(gallery);
    initLightbox();
    return;
  }

  // Cache-bust para que siempre cargue lo nuevo
  const currentScript = document.currentScript;
  const mediaBase = currentScript ? new URL(".", currentScript.src) : new URL("./", window.location.href);
  const url = new URL("media.json", mediaBase);
  url.searchParams.set("v", Date.now().toString());
  const data = await fetch(url.toString(), { cache: "no-store" }).then(r => r.json());

  gallery.innerHTML = "";

  const firstVideo = (data.media || []).find(item => item.type === "video");
  if (firstVideo) {
    const hero = document.createElement("div");
    hero.className = "project-video-hero";

    const heroVideoWrap = document.createElement("div");
    heroVideoWrap.className = "project-video-hero-media";

    const heroVideo = document.createElement("video");
    heroVideo.src = firstVideo.src;
    heroVideo.className = "img-fluid";
    heroVideo.autoplay = true;
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("muted", "");
    heroVideo.preload = "metadata";
    heroVideo.poster = posterFor(firstVideo.src);

    heroVideoWrap.appendChild(heroVideo);
    hero.appendChild(heroVideoWrap);

    const heroCopy = document.createElement("div");
    heroCopy.className = "project-video-hero-copy";
    const isEnglish = window.location.pathname.startsWith("/en/");
    heroCopy.innerHTML = isEnglish ? `
      <h3 class="project-video-hero-copy__title">Evidencia Oculta</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>América Televisión / 14y6</td></tr>
      <tr><th scope="row">Production Type</th><td>Investigative television series with dramatized reconstructions of real criminal cases.</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction for Evidencia Oculta, an investigative television series focused on the reconstruction of real homicide cases in Peru.</p><p>The project required adapting existing locations and designing temporary sets to support the dramatization of each case while maintaining visual coherence and production efficiency across multiple episodes.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Design and adaptation of sets for crime reenactments</li><li>Set dressing and environmental storytelling for each case</li><li>Selection and management of props to build narrative spaces</li><li>Costume coordination for actors involved in dramatizations</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Art Department Production</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Management of wardrobe and prop inventory from production storage</li><li>Sourcing and purchasing additional props and wardrobe pieces</li><li>Coordination with suppliers and production departments</li><li>Budget management and optimization of art department resources</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">On-Set Supervision</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Supervision of set preparation and installation before filming</li><li>Art direction presence during shooting</li><li>Real-time problem solving during production</li><li>Maintaining visual continuity across different dramatizations</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project delivered believable environments that allowed each case to be visually reconstructed while maintaining aesthetic consistency and practical functionality for television production.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">Evidencia Oculta</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>América Televisión / 14 y 6</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Serie televisiva periodística con dramatizaciones de casos reales</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte integral para la serie televisiva Evidencia Oculta, una producción centrada en la investigación y reconstrucción de casos de asesinatos reales en el Perú.</p><p>El proyecto requería adaptar espacios y construir sets para dramatizar cada caso, manteniendo coherencia visual dentro de las necesidades narrativas y de producción de la serie.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño y adaptación de sets para las dramatizaciones de cada caso</li><li>Ambientación de espacios y composición escenográfica</li><li>Selección y gestión de utilería para construir los entornos narrativos</li><li>Coordinación de vestuario para los actores en escena</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Gestión de recursos de utilería y vestuario provenientes de almacén</li><li>Compras y sourcing de elementos necesarios para cada escena</li><li>Coordinación con proveedores involucrados en el área de arte</li><li>Administración y optimización del presupuesto de arte</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Supervisión en rodaje</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Supervisión del montaje y preparación de sets antes de rodaje</li><li>Dirección de arte durante las grabaciones</li><li>Resolución de necesidades visuales en tiempo real durante la producción</li><li>Control de coherencia estética entre las distintas dramatizaciones</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Construcción de entornos verosímiles que permitieron recrear visualmente los casos investigados, manteniendo consistencia estética y funcionalidad para la narrativa televisiva.</td></tr>
      </tbody>
      </table>
    `;

    hero.appendChild(heroCopy);
    gallery.parentNode.insertBefore(hero, gallery);
  }

  let firstVideoHiddenOnDesktop = false;

  for (const item of (data.media || [])) {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4 item";
    col.setAttribute("data-aos", "fade");
    if (item.type === "video") {
      col.setAttribute("data-html", lightboxVideoHtml(item.src));
      col.setAttribute("data-poster", posterFor(item.src));
      col.setAttribute("data-thumb", posterFor(item.src));
    } else {
      col.setAttribute("data-src", item.src);
      col.setAttribute("data-thumb", item.src);
    }

    const a = document.createElement("a");
    a.href = "#";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.poster = posterFor(item.src);
      video.className = "img-fluid";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.preload = "none";
      video.setAttribute("data-lazy-video", "");

      a.appendChild(video);

      if (!firstVideoHiddenOnDesktop && firstVideo && item.src === firstVideo.src) {
        col.classList.add("desktop-hide-first-video");
        firstVideoHiddenOnDesktop = true;
      }
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || "";
      img.className = "img-fluid";
      img.loading = "lazy";
      img.decoding = "async";

      a.appendChild(img);
    }

    col.appendChild(a);
    gallery.appendChild(col);
  }

  if (window.lazyVideos) window.lazyVideos.observe(gallery);

  // Re-inicializar lightGallery si existe (ajusta el selector si tu init es diferente)
  initLightbox();
})();
