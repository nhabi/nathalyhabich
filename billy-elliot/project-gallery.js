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
      <h3 class="project-video-hero-copy__title">Billy Elliot – Gym Set Study</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>Academic project</td></tr>
      <tr><th scope="row">Production Type</th><td>Scenic reconstruction and 3D modeling</td></tr>
      <tr><th scope="row">Overview</th><td><p>3D reconstruction and spatial analysis of the gym set used in the film Billy Elliot.</p><p>The project focused on studying the spatial composition and scenic design of the original set through digital modeling and technical drawings.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Project Development</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Analysis of the original set design used in the film</li><li>Development of technical floor plans</li><li>3D modeling of the gym environment</li><li>Digital reconstruction of scenic elements</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project produced a digital reconstruction of the set, providing insight into its spatial organization and scenic composition within the film.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">Billy Elliot – Gym Set Study</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>Proyecto académico / estudio escenográfico</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Modelado y análisis de set cinematográfico</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Modelado tridimensional y reconstrucción escenográfica del set del gimnasio utilizado en la película Billy Elliot.</p><p>El proyecto consistió en analizar la configuración espacial del set y desarrollar planos y un modelo 3D que permitiera entender la construcción escenográfica y su funcionamiento dentro de la narrativa cinematográfica.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Desarrollo del proyecto</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Análisis del diseño escenográfico del gimnasio presente en la película</li><li>Desarrollo de planos del set y su configuración espacial</li><li>Modelado tridimensional del espacio y elementos escenográficos</li><li>Reconstrucción digital del set para estudio y documentación visual</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto permitió reconstruir digitalmente el set utilizado en la película, generando una referencia visual y técnica del espacio escenográfico y su organización dentro de la producción.</td></tr>
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
