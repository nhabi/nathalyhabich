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
      <h3 class="project-video-hero-copy__title">ESL One Birmingham 2024</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast / commentary set design</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and scenic design for the broadcast coverage of ESL One Birmingham 2024, produced by ESB for the Latin American esports audience.</p><p>The project involved designing and implementing a broadcast set for commentators responsible for live match analysis and tournament coverage.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Research and analysis of the ESL One tournament branding</li><li>Development of the visual concept for the commentary set</li><li>Alignment of scenic design with the tournament’s visual identity</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scenic background structures and broadcast backings</li><li>Custom desk design for commentators</li><li>Selection and integration of furniture including sofas and seating</li><li>Scenic lighting to reinforce the visual identity of the set</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with scenic fabricators and technical suppliers</li><li>Budget management for the art department</li><li>Procurement of props and furniture</li><li>Supervision of set fabrication and installation</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>A broadcast environment designed to support professional esports coverage, aligning the visual narrative of the set with the tournament branding while ensuring functionality for live analysis.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">ESL One Birmingham 2024</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión y análisis de liga competitiva</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión del campeonato internacional ESL One Birmingham 2024, producido por ESB para su cobertura en Latinoamérica.</p><p>El proyecto consistió en desarrollar un espacio para comentaristas donde se realizara el análisis y narración en vivo de los partidos del torneo, alineando el diseño del set con la identidad visual del campeonato.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Investigación de la identidad visual y lineamientos gráficos del campeonato ESL One</li><li>Desarrollo del concepto escenográfico del set de comentaristas</li><li>Diseño de un sistema visual coherente con el branding de la liga</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de escenografía y backings para el espacio de transmisión</li><li>Desarrollo y fabricación de mesa central para comentaristas</li><li>Selección de mobiliario, incluyendo sofás y sillas para el set</li><li>Integración de elementos escenográficos e iluminación ambiental</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para fabricación de elementos escenográficos</li><li>Gestión de compras y administración del presupuesto del área de arte</li><li>Supervisión de fabricación y seguimiento de producción</li><li>Implementación y montaje final del set para transmisión</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un entorno escenográfico alineado con la identidad visual del campeonato, proporcionando un espacio funcional para comentaristas y transmisión en vivo de la liga para la audiencia de Latinoamérica.</td></tr>
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
