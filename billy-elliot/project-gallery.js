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
