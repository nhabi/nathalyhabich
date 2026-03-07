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
      <h3 class="project-video-hero-copy__title">BetBoom Dacha Dubai 2024</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>ESB</td></tr>
      <tr><th scope="row">Production Type</th><td>Esports broadcast studio</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and scenic design for the broadcast coverage of BetBoom Dacha Dubai 2024, a major international tournament within the Dota 2 competitive circuit.</p><p>The set was designed as a narrative environment inspired by a fictional university aesthetic intersected by supernatural elements.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of a visual narrative combining academic and fantasy aesthetics</li><li>Scenic concept aligned with the tournament’s creative direction</li><li>Creation of a distinctive broadcast atmosphere</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Two scenic environments designed for live broadcast conversations</li><li>Scenic walls with special effects simulating broken structures and growing roots</li><li>Vintage-inspired dormitory environment for thematic storytelling</li><li>Graphic elements developed specifically for the set</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Sourcing of vintage furniture and decorative objects</li><li>Coordination with scenic fabricators and suppliers</li><li>Supervision of installation and scenic finishing</li><li>Integration of atmospheric lighting and scenic textures</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>A visually immersive broadcast set reinforcing the thematic narrative of the tournament while supporting live analysis and commentary.</td></tr>
      </tbody></table>
` : `
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
