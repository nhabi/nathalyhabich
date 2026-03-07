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
      <h3 class="project-video-hero-copy__title">Vieja Moralidad – Production Design Study</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>Proyecto académico — Especialización en Dirección de Arte<br>Universidad Nacional Autónoma de México (UNAM)</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Diseño de producción basado en guion</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Ejercicio de diseño de producción desarrollado durante la especialización en Dirección de Arte en la UNAM, enfocado en construir la propuesta visual de la película Vieja Moralidad a partir del análisis del guion.</p><p>El proyecto consistió en desarrollar el concepto estético del film y diseñar los espacios escenográficos principales sin referencia visual de la película final.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del concepto visual de la película</li><li>Investigación estética y referencias de época</li><li>Definición del tono visual y narrativa cromática del proyecto</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño escenográfico</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de sets a partir de escenas clave del guion</li><li>Desarrollo de ambientación y elementos escenográficos</li><li>Definición de objetos y utilería presentes en cada espacio</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Desarrollo visual</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Propuesta de vestuario acorde al contexto narrativo</li><li>Definición de estilo de iluminación y atmósfera visual</li><li>Desarrollo de propuestas de encuadre y composición escénica</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Desarrollo técnico</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Modelado 3D de sets principales</li><li>Diseño de planos escenográficos</li><li>Desarrollo de maquetas digitales de los espacios</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto permitió desarrollar una propuesta integral de diseño de producción, integrando concepto visual, escenografía y planificación espacial para las escenas principales de la historia.</td></tr>
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
