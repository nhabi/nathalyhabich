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
      <h3 class="project-video-hero-copy__title">La Mula</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>La Mula</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Estudio de streaming para medio periodístico</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño espacial para el desarrollo del set de streaming de La Mula, un medio digital especializado en periodismo político y de investigación que buscaba expandirse al formato audiovisual en vivo.</p><p>El proyecto consistió en crear un entorno visual que permitiera trasladar la identidad editorial del medio a un formato de transmisión en streaming, adaptando el diseño del set al espacio disponible dentro de sus oficinas.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del concepto visual del set para transmitir una identidad periodística sólida</li><li>Diseño de sistema escenográfico con backings iluminados mediante acentos LED</li><li>Construcción de una atmósfera visual que funcionara correctamente en cámara para formatos de streaming</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de mesa modular para conducción de programas con diferentes formatos</li><li>Sistema flexible que permite configurar el set para entrevistas o conversaciones sentadas</li><li>Adaptación del diseño a las condiciones espaciales de la locación</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scouting y evaluación de la locación dentro de las oficinas del medio</li><li>Coordinación con proveedores para construcción e implementación del set</li><li>Supervisión de montaje y ambientación final</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>El proyecto permitió transformar un espacio de oficina en un entorno preparado para transmisión en vivo, facilitando el lanzamiento del canal de streaming del medio con una identidad visual clara y funcional para producción audiovisual.</td></tr>
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
