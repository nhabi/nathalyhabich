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
      <h3 class="project-video-hero-copy__title">The International Pubstomp</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Live esports event / fan experience</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and spatial design for The International Pubstomp, a live fan event where the Dota 2 community gathered to watch the championship tournament together.</p><p>The project involved transforming a two-level terrace bar into an immersive esports viewing environment.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Research of the visual identity of The International championship</li><li>Development of thematic event design inspired by the tournament</li><li>Creation of a community-focused immersive experience</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Spatial Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Stage design for hosts and commentators</li><li>Full venue decoration across two floors</li><li>Large-format banners and graphic installations</li><li>Functional modules including ticketing structures</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordination with scenic fabricators and suppliers</li><li>Procurement of props, banners and scenic elements</li><li>Supervision of installation and event preparation</li><li>Art direction during the live event</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>A large-scale live event experience that combined esports broadcast with a physical fan environment, bringing the championship atmosphere to a live audience.</td></tr>
      </tbody></table>
` : `
      <h3 class="project-video-hero-copy__title">The International Pubstomp</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>ESB</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Experiencia en vivo para esports / Evento para transmisión del campeonato The International</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte y diseño espacial para The International Pubstomp, un evento en vivo organizado por ESB donde los fanáticos de Dota 2 se reunieron para seguir las partidas del campeonato mundial The International.</p><p>El proyecto consistió en transformar un bar terraza de dos niveles en un espacio temático dedicado al universo de Dota, combinando ambientación para público presencial con escenografía diseñada para transmisión en streaming.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concepto y dirección de arte</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Investigación de la identidad visual de The International correspondiente a esa edición</li><li>Desarrollo del concepto escenográfico del evento inspirado en el universo del campeonato</li><li>Diseño de ambientación temática para crear una experiencia inmersiva para la comunidad</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño del espacio</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Diseño del escenario principal para comentaristas y presentaciones en vivo</li><li>Ambientación completa del local de dos niveles con elementos gráficos y escenográficos</li><li>Integración de banderines y piezas visuales de gran formato para reforzar la identidad del evento</li><li>Diseño de módulos y elementos funcionales para operación del evento</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Producción e implementación</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con proveedores para fabricación de escenografía y elementos gráficos</li><li>Compras y sourcing de utilería, mobiliario y materiales de ambientación</li><li>Supervisión de montaje y transformación del espacio para el evento</li><li>Dirección de arte durante el desarrollo de las jornadas del Pubstomp</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Creación de una experiencia en vivo que permitió a la comunidad de Dota 2 vivir el campeonato mundial en un entorno temático, combinando evento presencial y transmisión digital durante tres días de competencia.</td></tr>
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
