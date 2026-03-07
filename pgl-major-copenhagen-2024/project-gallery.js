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
      <h3 class="project-video-hero-copy__title">PGL Major Copenhagen 2024</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast / Counter-Strike tournament coverage</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and scenic design for the broadcast coverage of PGL Major Copenhagen 2024, one of the most prestigious Counter-Strike tournaments.</p><p>The set was designed as a compact commentary environment focused on frontal camera coverage and analysis segments.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Visual identity aligned with the tournament branding</li><li>Minimal scenic concept designed for conversation-based broadcast</li><li>Clean visual composition optimized for camera framing</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Scenic backings and wall structures</li><li>Custom graphic wallpaper pattern design</li><li>Branding graphics for the commentators’ desk</li><li>Integrated lighting to enhance visual presence</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with graphic and scenic suppliers</li><li>Sourcing of materials and props</li><li>Location scouting and spatial adaptation</li><li>Supervision of installation and set styling</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>A compact yet visually clear set designed to prioritize on-camera dialogue while maintaining strong alignment with tournament branding.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">PGL Major Copenhagen 2024</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Broadcast de esports / Set para transmisión y análisis de torneo de Counter-Strike</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño de set para la transmisión del PGL Major Copenhagen 2024, uno de los torneos más importantes del circuito competitivo de Counter-Strike.</p><p>El proyecto consistió en desarrollar una escenografía compacta para comentaristas, diseñada para una toma frontal centrada en el análisis del torneo durante la transmisión.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de identidad visual del set alineada al branding del campeonato</li><li>Diseño de escenografía minimalista enfocada en la conversación entre comentaristas</li><li>Creación de un entorno visual limpio y funcional para transmisión en cámara</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño de backings escenográficos para el fondo del set</li><li>Creación de pattern gráfico para papel tapiz del fondo</li><li>Diseño de gráfica para el branding de la mesa de comentaristas</li><li>Integración de iluminación para reforzar la presencia visual del espacio</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para impresión de gráfica escenográfica</li><li>Compras y sourcing de elementos necesarios para la ambientación</li><li>Scouting y adaptación del espacio para el set</li><li>Supervisión de implementación y montaje final</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de un set compacto y visualmente claro que permitió centrar la transmisión en la conversación y análisis del torneo, manteniendo coherencia con la identidad visual del campeonato.</td></tr>
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
