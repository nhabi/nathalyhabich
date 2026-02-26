(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

  // Cache-bust para que siempre cargue lo nuevo
  const url = "./media.json?v=" + Date.now();
  const data = await fetch(url, { cache: "no-store" }).then(r => r.json());

  gallery.innerHTML = "";

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
    // Si ya estaba inicializado, destrúyelo si tu versión lo soporta
    // (depende de tu implementación actual)
    window.lightGallery(gallery, {
      selector: ".item"
      // agrega aquí tus plugins/opciones existentes si ya los usas
    });
  }
})();
