/*
 * Reproduce los <video data-lazy-video> solo cuando entran en pantalla y los pausa al salir.
 * Los videos llevan preload="none" + poster, así no se descargan hasta que se ven.
 * Visualmente se comportan igual que antes (muted + loop + reproducción automática).
 */
(function () {
  function playSafe(video) {
    var p = video.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  }

  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (entry.isIntersecting) {
            playSafe(video);
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { rootMargin: "200px 0px", threshold: 0 })
    : null;

  function observe(root) {
    var videos = (root || document).querySelectorAll("video[data-lazy-video]");
    Array.prototype.forEach.call(videos, function (video) {
      if (video.__lazyVideoObserved) return;
      video.__lazyVideoObserved = true;
      video.muted = true;
      if (io) {
        io.observe(video);
      } else {
        playSafe(video);
      }
    });
  }

  window.lazyVideos = { observe: observe };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { observe(); });
  } else {
    observe();
  }
})();
