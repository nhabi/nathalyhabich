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
      <h3 class="project-video-hero-copy__title">CanalYa</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>CanalYa / Marco Siuentes</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Canal de streaming periodístico</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Diseño conceptual y dirección de arte para el set del canal de streaming CanalYa, un proyecto periodístico liderado por el periodista Marco Sifuentes orientado a la producción de contenido digital en vivo.</p><p>El proyecto consistió en desarrollar el concepto visual del estudio desde cero, creando un entorno escenográfico adaptable a distintos formatos de conversación y análisis periodístico.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del concepto visual del estudio de streaming</li><li>Diseño de propuestas escenográficas para el espacio de transmisión</li><li>Construcción de un sistema visual coherente con la identidad editorial del canal</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de layout escenográfico para conducción y conversación en cámara</li><li>Desarrollo de elementos escenográficos y ambientación del espacio</li><li>Diseño de soluciones visuales pensadas para producción de streaming</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Evolución del proyecto</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Durante el proceso de desarrollo, el diseño fue posteriormente adaptado para integrarse al estudio construido para el medio digital La Mula, permitiendo que el espacio funcionara como entorno de producción para ambos proyectos de streaming.</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto sentó las bases conceptuales para un set de streaming periodístico adaptable a múltiples formatos de conversación, consolidando un espacio funcional para producción audiovisual digital.</td></tr>
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
