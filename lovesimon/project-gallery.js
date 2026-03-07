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
    heroCopy.innerHTML = `
      <h3 class="project-video-hero-copy__title">Love, Simon – Production Design Study</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>Proyecto académico</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Diseño de producción basado en guion</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Desarrollo completo de diseño de producción para la película Love, Simon, realizado a partir del análisis del guion sin referencia visual de la película original.</p><p>El proyecto consistió en construir la propuesta visual completa del film, desarrollando el concepto estético, los espacios escenográficos, la paleta cromática y la identidad visual de los personajes y escenarios.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del concepto visual general de la película</li><li>Creación del guion de color para narrativa visual del film</li><li>Investigación estética y referencias visuales para el universo de la historia</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño escenográfico</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de propuestas de ambientación para cada locación del guion</li><li>Diseño de sets y configuración espacial de cada escena</li><li>Definición de elementos escenográficos y utilería</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño visual del proyecto</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de paletas cromáticas para espacios y personajes</li><li>Propuesta de vestuario alineada a la narrativa visual</li><li>Diseño de atmósferas visuales para cada escenario</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Desarrollo técnico</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Elaboración de planos escenográficos</li><li>Modelado 3D de sets</li><li>Construcción de maquetas del espacio</li><li>Desarrollo completo de carpeta de arte y bitácora del proyecto</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto consolidó una propuesta completa de diseño de producción para la película, integrando narrativa visual, escenografía, vestuario y planificación técnica dentro de un sistema coherente de dirección de arte.</td></tr>
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
