(async function () {
  const gallery = document.getElementById("lightgallery");
  if (!gallery) return;

  const url = "./media.json?v=" + Date.now();

  let data;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`No se pudo cargar media.json (${response.status})`);
    }
    data = await response.json();
  } catch (error) {
    console.error("Error cargando galería:", error);
    gallery.innerHTML =
      '<div class="col-12"><p class="text-center text-white">No se pudo cargar la galería en este momento.</p></div>';
    return;
  }

  gallery.innerHTML = "";

  for (const item of data.media || []) {
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

  if (window.lightGallery) {
    window.lightGallery(gallery, {
      selector: ".item"
    });
  }
})();
