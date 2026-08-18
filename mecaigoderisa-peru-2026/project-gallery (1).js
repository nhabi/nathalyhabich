(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

  const currentScript = document.currentScript;
  const mediaBase = currentScript ? new URL(".", currentScript.src) : new URL("./", window.location.href);
  const url = new URL("media.json", mediaBase);
  url.searchParams.set("v", Date.now().toString());
  const data = await fetch(url.toString(), { cache: "no-store" }).then(r => r.json());

  gallery.innerHTML = "";

  // Determinar idioma
  const isEnglish = window.location.pathname.startsWith("/en/");

  // Definir los textos del proyecto desde data
  const projectData = {
    title: data.title || "Proyecto",
    client: data.client || "",
    productionType: data.productionType || "",
    overview: data.overview || "",
    sections: data.sections || [],
    outcome: data.outcome || ""
  };

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

    // Construir tabla dinámicamente
    let tableHTML = `
      <h3 class="project-video-hero-copy__title">${projectData.title}</h3>
      <table class="project-video-hero-table">
      <tbody>
    `;

    if (projectData.client) {
      tableHTML += `<tr><th scope="row">${isEnglish ? 'Client' : 'Cliente'}</th><td>${projectData.client}</td></tr>`;
    }
    if (projectData.productionType) {
      tableHTML += `<tr><th scope="row">${isEnglish ? 'Production Type' : 'Tipo de producción'}</th><td>${projectData.productionType}</td></tr>`;
    }
    if (projectData.overview) {
      tableHTML += `<tr><th scope="row">${isEnglish ? 'Overview' : 'Descripción'}</th><td>${projectData.overview}</td></tr>`;
    }

    // Secciones
    for (const section of (projectData.sections || [])) {
      const sectionTitle = isEnglish ? section.title_en || section.title : section.title;
      const items = isEnglish && section.items_en ? section.items_en : section.items;
      tableHTML += `
        <tr><th colspan="2" class="project-video-hero-table__section">${sectionTitle}</th></tr>
        <tr><td colspan="2"><ul class="project-video-hero-table__list">
      `;
      for (const item of (items || [])) {
        tableHTML += `<li>${item}</li>`;
      }
      tableHTML += `</ul></td></tr>`;
    }

    if (projectData.outcome) {
      tableHTML += `<tr><th scope="row">${isEnglish ? 'Outcome' : 'Resultado'}</th><td>${projectData.outcome}</td></tr>`;
    }

    tableHTML += `
      </tbody>
      </table>
    `;

    heroCopy.innerHTML = tableHTML;
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
