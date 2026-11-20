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
      <h3 class="project-video-hero-copy__title">Elite League</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast / tournament studio</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and scenic design for Elite League, the first esports league produced by ESB for the Peruvian market.</p><p>The set was designed as an immersive environment inspired by the fantasy universe of Dota 2, reinforcing the narrative identity of the tournament.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of a visual concept inspired by the world of Dota 2</li><li>Scenic identity aligned with tournament branding</li><li>Integration of fantasy-inspired elements into the set design</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scenic backings inspired by stained-glass windows</li><li>Central sculptural element referencing an iconic Dota character</li><li>Custom desk design for commentators</li><li>Graphic floor design aligned with the tournament visual identity</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with scenic fabricators</li><li>Furniture sourcing and customization</li><li>Integration of atmospheric lighting and scenic elements</li><li>Supervision of installation and set dressing</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project created an immersive esports broadcast set that visually transported the audience into the narrative universe of the game.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">Elite League</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión de liga competitiva</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión de Elite League, la primera liga de esports organizada por ESB para el mercado peruano.</p><p>El proyecto consistió en desarrollar una escenografía temática inspirada en el universo visual de Dota 2, construyendo un entorno que transportara a los espectadores al mundo del juego y reforzara la identidad de la liga durante la transmisión.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de un concepto escenográfico inspirado en la estética del universo de Dota 2</li><li>Diseño de identidad visual del set alineada al branding de la liga</li><li>Creación de elementos escenográficos que evocan el mundo del juego</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de escenografía con ventanales tipo vitrales inspirados en el universo de Dota</li><li>Integración de elemento central escultórico inspirado en una criatura icónica del juego</li><li>Diseño de mesa principal para comentaristas y análisis del torneo</li><li>Desarrollo de gráfica escenográfica y diseño del piso del set</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para fabricación de elementos escenográficos</li><li>Selección y adaptación de mobiliario para el set</li><li>Integración de iluminación ambiental y detalles escenográficos</li><li>Supervisión de producción, montaje e implementación del espacio</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un entorno escenográfico inmersivo alineado al universo visual de Dota 2, aportando una identidad temática clara a la primera edición de Elite League durante su transmisión.</td></tr>
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
