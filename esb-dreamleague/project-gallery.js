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
      <h3 class="project-video-hero-copy__title">DreamLeague Season 22 & 23</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast studio / tournament commentary set</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and set design for the broadcast coverage of DreamLeague Seasons 22 and 23, one of the most important international Dota 2 tournaments.</p><p>The project required the creation of a larger-scale broadcast environment inspired by the visual language of late-night talk shows, adapted to the esports broadcast format.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of a late-night show inspired broadcast aesthetic</li><li>Visual concept tailored for esports analysis and discussion</li><li>Integration of narrative lighting and scenic elements</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scenic structures including shelves, decorative elements and background lighting</li><li>Custom desk design for host and commentators</li><li>Furniture selection and upholstery adaptation</li><li>Integration of decorative elements to reinforce the late-night show atmosphere</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with suppliers and scenic builders</li><li>Procurement of furniture, props and scenic elements</li><li>Art department budget management</li><li>Supervision of fabrication, installation and set dressing</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The final design created a distinctive broadcast environment merging traditional talk-show aesthetics with the visual language of esports commentary.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">DreamLeague Season 22 &amp; 23</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión y análisis de liga competitiva</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión de DreamLeague Seasons 22 y 23, una de las ligas internacionales más importantes de Dota 2.</p><p>El proyecto consistió en desarrollar un espacio escenográfico para comentaristas y análisis del torneo, inspirado en el formato de late night show, adaptado al lenguaje visual del broadcast de esports.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo del concepto escenográfico inspirado en formato late night show</li><li>Diseño de identidad visual del set alineada a la transmisión del torneo</li><li>Construcción de un entorno visual pensado para conversación y análisis en vivo</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de escenografía con estanterías, elementos decorativos e iluminación ambiental</li><li>Diseño de mesa principal para conducción del programa</li><li>Selección y adaptación de mobiliario para el set</li><li>Integración de elementos escenográficos que refuerzan la atmósfera del formato</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para fabricación de elementos escenográficos</li><li>Compras y sourcing de mobiliario y utilería</li><li>Gestión del presupuesto del área de arte</li><li>Supervisión de fabricación, montaje e implementación del set</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un set escenográfico de mayor escala que integró el lenguaje del late night show con el formato de transmisión de esports, proporcionando un entorno visual sólido para la cobertura de DreamLeague en Latinoamérica.</td></tr>
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
