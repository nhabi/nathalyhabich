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
      <h3 class="project-video-hero-copy__title">Elite League</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast / tournament studio</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and scenic design for Elite League, the first esports league produced by ESB for the Peruvian market.</p><p>The set was designed as an immersive environment inspired by the fantasy universe of Dota 2, reinforcing the narrative identity of the tournament.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of a visual concept inspired by the world of Dota 2</li><li>Scenic identity aligned with tournament branding</li><li>Integration of fantasy-inspired elements into the set design</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scenic backings inspired by stained-glass windows</li><li>Central sculptural element referencing an iconic Dota character</li><li>Custom desk design for commentators</li><li>Graphic floor design aligned with the tournament visual identity</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with scenic fabricators</li><li>Furniture sourcing and customization</li><li>Integration of atmospheric lighting and scenic elements</li><li>Supervision of installation and set dressing</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project created an immersive esports broadcast set that visually transported the audience into the narrative universe of the game.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">Elite League</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión de liga competitiva</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión de Elite League, la primera liga de esports organizada por ESB para el mercado peruano.</p><p>El proyecto consistió en desarrollar una escenografía temática inspirada en el universo visual de Dota 2, construyendo un entorno que transportara a los espectadores al mundo del juego y reforzara la identidad de la liga durante la transmisión.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de un concepto escenográfico inspirado en la estética del universo de Dota 2</li><li>Diseño de identidad visual del set alineada al branding de la liga</li><li>Creación de elementos escenográficos que evocan el mundo del juego</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de escenografía con ventanales tipo vitrales inspirados en el universo de Dota</li><li>Integración de elemento central escultórico inspirado en una criatura icónica del juego</li><li>Diseño de mesa principal para comentaristas y análisis del torneo</li><li>Desarrollo de gráfica escenográfica y diseño del piso del set</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para fabricación de elementos escenográficos</li><li>Selección y adaptación de mobiliario para el set</li><li>Integración de iluminación ambiental y detalles escenográficos</li><li>Supervisión de producción, montaje e implementación del espacio</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un entorno escenográfico inmersivo alineado al universo visual de Dota 2, aportando una identidad temática clara a la primera edición de Elite League durante su transmisión.</td></tr>
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
