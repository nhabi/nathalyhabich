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
      <h3 class="project-video-hero-copy__title">BetBoom Dacha Dubai 2024</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión y análisis de liga competitiva</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión de BetBoom Dacha Dubai 2024, una de las ligas internacionales clasificatorias para el circuito competitivo de Dota 2.</p><p>El proyecto consistió en desarrollar un entorno escenográfico temático para el espacio de comentaristas y análisis del torneo, alineado con la narrativa visual de la liga de ese año.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de concepto escenográfico inspirado en una estética universitaria intervenida por elementos fantásticos</li><li>Creación de un entorno visual que combina atmósfera académica con narrativa fantástica</li><li>Diseño de identidad visual del set alineada con la temática de la liga</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de dos espacios escenográficos para transmisión y conversación entre comentaristas</li><li>Desarrollo de escenografía con efectos especiales que simulan muros intervenidos por raíces y vegetación</li><li>Creación de ambientación temática inspirada en dormitorios universitarios vintage</li><li>Diseño de elementos gráficos y piezas visuales para el set</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Selección y sourcing de mobiliario, objetos vintage y utilería escenográfica</li><li>Coordinación con proveedores para fabricación de elementos escenográficos</li><li>Supervisión de producción, montaje e implementación del set</li><li>Integración de iluminación ambiental y elementos escenográficos temáticos</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un entorno escenográfico inmersivo que refuerza la narrativa visual de la liga, proporcionando un espacio distintivo para comentaristas y transmisión del torneo.</td></tr>
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
