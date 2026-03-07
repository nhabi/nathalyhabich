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
      <h3 class="project-video-hero-copy__title">La Mula</h3>
      <table class="project-video-hero-table"><tbody>
      <tr><th scope="row">Client</th><td>La Mula</td></tr>
      <tr><th scope="row">Production Type</th><td>Journalistic streaming studio</td></tr>
      <tr><th scope="row">Overview</th><td><p>Art direction and spatial design for the streaming set of La Mula, a digital media platform focused on political journalism and investigative reporting.</p><p>The project translated the editorial identity of the platform into a visual environment designed for live streaming.</p></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Concept & Art Direction</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Development of the studio’s visual identity</li><li>Scenic system with illuminated LED backings</li><li>Creation of a visual environment optimized for camera and live broadcast</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Set Design</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Design of a modular desk system for multiple show formats</li><li>Flexible configuration allowing seated discussions or interview setups</li><li>Adaptation of the design to the spatial limitations of the office</li></ul></td></tr>
      <tr><th colspan="2" class="project-video-hero-table__section">Production & Implementation</th></tr>
      <tr><td colspan="2"><ul class="project-video-hero-table__list"><li>Location scouting and spatial evaluation</li><li>Coordination with suppliers and scenic builders</li><li>Supervision of installation and final styling</li></ul></td></tr>
      <tr><th scope="row">Outcome</th><td>The project transformed an office space into a streaming studio environment, enabling the launch of La Mula’s audiovisual content platform.</td></tr>
      </tbody></table>
` : `
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
