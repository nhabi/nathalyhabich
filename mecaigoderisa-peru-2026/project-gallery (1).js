(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

  const currentScript = document.currentScript;
  const mediaBase = currentScript ? new URL(".", currentScript.src) : new URL("./", window.location.href);
  const url = new URL("media.json", mediaBase);
  url.searchParams.set("v", Date.now().toString());
  const data = await fetch(url.toString(), { cache: "no-store" }).then(r => r.json());

  gallery.innerHTML = "";

  const isEnglish = window.location.pathname.startsWith("/en/");

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

    heroCopy.innerHTML = isEnglish ? `
      <h3 class="project-video-hero-copy__title">Me Caigo de Risa Peru</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>Latina Network / Rayo en la Botella</td></tr>
      <tr><th scope="row">Production Type</th><td>Live entertainment format — physical comedy, daily broadcast Monday through Friday</td></tr>
      <tr><th scope="row">Overview</th><td><p>Production design for the inclined stage on Me Caigo de Risa Perú, the Peruvian adaptation of the internationally produced format originally developed in Mexico.</p><p>The role required designing a completely new themed set every single day, built entirely from lightweight materials, with a 24 to 48-hour fabrication and installation window per episode. No art department existed prior to joining the project — the entire workflow was built from scratch.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Conceived and art directed 67 unique set designs for the inclined stage across the run of the show, each with its own visual concept, expressive color palette, and distinct aesthetic direction</li><li>Analyzed scripts and story briefs per episode to translate narrative action into scenographic decisions — including identifying set requirements implied by the story but not explicitly listed in the content brief</li><li>Developed visual concepts and color palettes with a camera-first approach: bold, saturated, high-impact sets that read immediately on screen and remain true to each episode's theme</li><li>Designed within strict technical constraints specific to the format: permanently inclined performance surface, lightweight construction throughout (foam, polystyrene, vinyl wrap, PVC), fully anchored scenic elements, and live uncut effect sequences with no pauses during recording</li><li>Produced a full design package per episode: concept statement, color palette, script-to-set breakdown with feasibility assessment, elements list, effects mapping, and a print-ready shoot-day reference sheet</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Workflow & Systems</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Built the art department workflow from the ground up for a production that had no established art direction prior to joining</li><li>Developed proprietary production tools: episode tracker, per-episode design brief, props and elements purchasing list, and a safety and operations protocol for the inclined stage submitted to the network</li><li>Maintained a minimum two-episode design lead ahead of recording, allowing the installation crew to optimize their schedule and significantly reduce overtime hours</li><li>Managed fabrication timelines with the network's in-house scenic workshop, coordinating the two-stage installation model: primary build the day before recording, finishing details on shoot morning from 8:30 to 10:00am</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">On-Set Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Supervised and directed the full installation of the inclined stage for every episode — from structural elements through to props and final dressing</li><li>Conducted a complete set walk-through before each recording, verifying visual consistency, element functionality, and design integrity</li><li>Maintained a floor or monitor presence throughout each live recording, available to respond to visual issues in real time</li><li>Managed per-character props logistics: tracking what each performer enters with, what gets handed to them mid-scene, and what needs to be staged behind the set — confirmed during the pre-shoot production meeting</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Team & Cross-Department Coordination</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinated with the network's scenic fabrication team, installation crew, special effects, lighting, costume, and content departments to ensure operational and visual alignment across every episode</li><li>Served as the central point between the content writing team (Paulo and Guille) and the execution crew (Johnny, Toño, Fernando), consolidating design information so each department received exactly what they needed</li><li>Coordinated with the special effects lead (Arnaldo) to map each episode's effects and identify which required specific set elements or furniture pieces to be integrated into the design for activation</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>Elevated the visual standard of the inclined stage from improvised, art-direction-free execution to a fully conceived set with defined concept, palette, and aesthetic direction in every episode. The project closed with consistent recognition from the production company for the quality and reliability of the work delivered, bringing the Peruvian production in line with the visual benchmark of the international format.</td></tr>
      </tbody></table>
    ` : `
      <h3 class="project-video-hero-copy__title">Me Caigo de Risa Perú</h3>
      <table class="project-video-hero-table">
      <tbody>
      <tr><th scope="row">Cliente</th><td>Latina Network / Rayo en la Botella</td></tr>
      <tr><th scope="row">Tipo de producción</th><td>Formato de entretenimiento en vivo — comedia física, grabación diaria de lunes a viernes</td></tr>
      <tr><th scope="row">Descripción</th><td><p>Dirección de arte del escenario inclinado para Me Caigo de Risa Perú, adaptación local del formato internacional. El proyecto requería diseñar una escenografía temática completamente distinta cada día, construida en foam y materiales livianos, con un plazo de fabricación y montaje de 24 a 48 horas por episodio. No existía un área de arte establecida al momento de incorporarse; el sistema de trabajo fue construido desde cero.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Diseño de producción</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Conceptualización y diseño de 67 escenografías temáticas únicas para el escenario inclinado a lo largo del proyecto, cada una con concepto visual, paleta de color expresiva y dirección estética propia</li><li>Análisis e interpretación del guion de contenido por episodio para traducir cada historia en decisiones escenográficas funcionales incluyendo la deducción de elementos no listados explícitamente en el guion pero necesarios para el desarrollo de la acción</li><li>Generación de brief de diseño por episodio: concepto, paleta, desglose guion-set con semáforo de viabilidad, lista de elementos, mapeo de efectos y resumen ejecutivo para el día de grabación</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Sistema de trabajo</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Desarrollo de herramientas de gestión propias: tracker de episodios, ficha de diseño por episodio, lista de elementos para compras, y protocolo de operaciones y seguridad del escenario inclinado para el canal</li><li>Planificación anticipada de diseños con un mínimo de dos episodios de adelanto sobre la grabación, permitiendo que el equipo de montaje optimizara sus tiempos y redujera horas extra</li><li>Coordinación del timing de fabricación con utilería del canal, gestionando los plazos ajustados de Víctor y el equipo de foam para garantizar el montaje en dos momentos: el día anterior y la mañana de grabación de 8:30 a 10:00am</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Coordinación en set</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Supervisión y dirección del montaje del escenario inclinado en cada episodio desde la colocación de estructuras hasta los detalles de utilería y props</li><li>Walk-through completo del set antes de cada grabación, verificando coherencia visual, funcionalidad de elementos e integridad del diseño</li><li>Presencia en piso o monitor durante la grabación del acto, con capacidad de respuesta ante imprevistos visuales en tiempo real</li><li>Gestión de props y elementos por personaje: mapeo de qué entra con cada participante, qué se le entrega en escena y qué hay que tener listo detrás del set durante la reunión de producción previa a cada grabación</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Gestión de equipos</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Coordinación con utilería del canal (fabricación en foam), equipo de montaje, efectos especiales, iluminación, vestuario y equipo de contenido para garantizar la coherencia operativa y visual de cada episodio</li><li>Articulación del flujo entre el área de contenido y el equipo de ejecución, centralizando la información de diseño para que cada área recibiera exactamente lo que necesitaba</li><li>Coordinación con efectos especiales para mapear los efectos de cada episodio e identificar cuáles requerían elementos o mobiliario dentro del set para activarse</li></ul></td></tr>
      <tr><th scope="row">Resultado</th><td>Elevación del nivel visual del escenario inclinado desde la resolución improvisada sin criterio de arte hacia un set con concepto, paleta y dirección definidos en cada episodio. El programa cerró con reconocimiento interno de la productora por la calidad y consistencia del trabajo entregado, alineando la producción peruana al estándar visual del formato internacional.</td></tr>
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

  if (window.lightGallery) {
    window.lightGallery(gallery, {
      selector: ".item"
    });
  }
})();
