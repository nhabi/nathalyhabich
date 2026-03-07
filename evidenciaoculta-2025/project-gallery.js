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
