(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

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

    heroVideoWrap.appendChild(heroVideo);
    hero.appendChild(heroVideoWrap);

    const heroCopy = document.createElement("div");
    heroCopy.className = "project-video-hero-copy";
    const isEnglish = window.location.pathname.startsWith("/en/");
    heroCopy.innerHTML = isEnglish ? `
      <h3 class="project-video-hero-copy__title">Todo Good</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>Todo Good</td></tr>
      <tr><th scope="row">Production Type</th><td>Streaming studio / Digital content production</td></tr>
      <tr><th scope="row">Overview</th><td><p>Spatial design and art direction for the development of the new Todo Good streaming studio, built inside a three-level house adapted for audiovisual production.</p><p>The project involved designing the spatial layout of the studio and creating the main broadcast sets used for live streaming content.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Studio Spatial Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of the first-floor production layout</li><li>Definition of production areas including switcher, sets, dressing rooms and audience space</li><li>Spatial planning for efficient streaming operation</li><li>Technical planning of power outlets and electrical infrastructure for sets</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of the studio’s visual concept</li><li>Design of the main host set</li><li>Design of the secondary stage set for guests and live performances</li><li>Design of tables, scenic backings and visual elements</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with scenic builders and technical suppliers</li><li>Workshop supervision during fabrication</li><li>Technical scouting and on-site supervision</li><li>Final installation and styling of the studio</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project transformed the location into a fully functional streaming studio, elevating the channel’s visual standard and enabling professional live content production.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">Todo Good</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>Todo Good</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Estudio de streaming / Producción de contenido digital</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Diseño espacial y dirección de arte para la creación del nuevo estudio de streaming del canal Todo Good, desarrollado dentro de una casa de tres niveles adaptada para producción audiovisual.</p><p>El proyecto incluyó el diseño de distribución del primer piso del estudio, así como el desarrollo conceptual y ejecución de los sets principales utilizados para transmisión.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño espacial del estudio</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del layout del primer piso para funcionamiento de estudio audiovisual</li><li>Definición de áreas de producción: switcher, sets, camerinos, recepción y zona de público</li><li>Planificación de distribución de espacios para operación de streaming</li><li>Diseño de puntos eléctricos y tomas necesarias para sets y operación técnica</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño de sets</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo conceptual del sistema visual del estudio</li><li>Diseño del set principal para conducción del programa</li><li>Diseño del set secundario con tarima para invitados y presentaciones musicales</li><li>Diseño de mesas, backings y elementos escenográficos</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con escenógrafos y proveedores para construcción de sets</li><li>Supervisión de fabricación en talleres</li><li>Scouting técnico y seguimiento de implementación en locación</li><li>Supervisión de montaje y ambientación final del estudio</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto permitió transformar la locación en un estudio de streaming completamente funcional, elevando el estándar visual del canal y consolidando un entorno profesional para producción de contenido en vivo.</td></tr>
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
    col.setAttribute("data-src", item.src);

    const a = document.createElement("a");
    a.href = "#";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.className = "img-fluid";
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.preload = "metadata";

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

      a.appendChild(img);
    }

    col.appendChild(a);
    gallery.appendChild(col);
  }

  // Re-inicializar lightGallery si existe (ajusta el selector si tu init es diferente)
  if (window.lightGallery) {
    window.lightGallery(gallery, {
      selector: ".item"
    });
  }
})();
