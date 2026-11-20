# nathalyhabich

Sitio estático de [nathalyhabich.me](https://nathalyhabich.me), publicado con GitHub Pages.

## Agregar o editar un proyecto

Cada proyecto vive en su carpeta (por ejemplo `/mecaigoderisa-peru-2026/`) con tres archivos:

- `index.html`: la página.
- `media.json`: título, excerpt, enlace y la lista de fotos y videos.
- `project-gallery.js`: el cuadro resumen (Cliente, Tipo de producción, Descripción, Resultado…) en español e inglés.

La versión en inglés está en `/en/<proyecto>/index.html` y usa los mismos `media.json` y `project-gallery.js`.

### Después de agregar o cambiar un proyecto: volver a correr el pre-render

El contenido de los proyectos (cuadro resumen, fotos y tarjetas del home y de proyectos) se escribe
como HTML estático para que Google lo pueda leer sin JavaScript. Cada vez que agregues un proyecto,
cambies un `media.json`, el cuadro resumen de un `project-gallery.js` o la lista de proyectos del
home / `proyectos.html`, corre desde la raíz del repo:

```bash
python scripts/prerender.py
```

El script:

1. Escribe el video principal, el cuadro resumen y la galería dentro de cada `/<proyecto>/index.html`
   y `/en/<proyecto>/index.html` (entre los comentarios `<!-- prerender:start … -->` y `<!-- prerender:end -->`).
2. Escribe las tarjetas de proyectos dentro de `#portfolio-grid` en `index.html`, `en/index.html`,
   `proyectos.html` y `en/proyectos.html`, siguiendo la lista `const projects = [...]` de cada página.
3. Agrega a cada página de proyecto su bloque de datos estructurados JSON-LD (schema.org `CreativeWork`)
   con nombre, descripción (el `excerpt` / `excerpt_en`), imagen y autora.

Se puede correr las veces que haga falta: reemplaza lo que generó la vez anterior. No edites a mano lo
que está entre esos comentarios, porque se sobrescribe.

Para un proyecto **nuevo**:

1. Crea la carpeta con `index.html`, `media.json` y `project-gallery.js` copiando un proyecto existente.
   El `index.html` debe tener `<div class="row" id="lightgallery"></div>` (vacío) donde va la galería.
2. Si tiene versión en inglés, crea `/en/<proyecto>/index.html` igual.
3. Agrega `'/<proyecto>/media.json'` a la lista `const projects = [...]` de las páginas donde debe aparecer la tarjeta.
4. Para cada video nuevo, genera su portada con el mismo nombre terminado en `-poster.webp`
   (ejemplo: `video.mp4` → `video-poster.webp`):

   ```bash
   ffmpeg -ss 1 -i video.mp4 -vf "thumbnail=50,scale='min(1280,iw)':-2" -frames:v 1 -c:v libwebp -quality 75 video-poster.webp
   ```

5. Corre `python scripts/prerender.py` y luego `python scripts/generate_sitemap.py`.

## Comprimir videos e imágenes nuevos

Videos (H.264, máx. 1280 px de ancho):

```bash
ffmpeg -i original.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k video.mp4
```

Imágenes (WebP calidad 80):

```bash
ffmpeg -i foto.jpg -c:v libwebp -quality 80 foto.webp
```

## Probar en local

```bash
python -m http.server 8000
```

y abre http://localhost:8000
