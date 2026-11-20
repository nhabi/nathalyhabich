# Sistema visual web — Nathaly Habich (v3)

Basado en el brandbook 2019 (`/brand/brandbook.pdf`), los archivos de `/brand/` y las animaciones de la publicación del branding en Behance (Lucero Pérez).
Página de prueba: `/brand/prueba.html`.

> **Estado: v3, pendiente de aprobación.**
>
> | Versión | Qué cambió |
> |---|---|
> | v2 | Más personalidad con los elementos del brandbook; tarjetas con video; hover magenta. |
> | v3 | Sin formas ni capas de color sobre fotos y videos; reel nítido; interacción con el cursor; dos momentos animados inspirados en los GIF del branding. |
>
> Quedan 2 decisiones abiertas (❓ al final).

---

## 1. Fuentes de inspiración

| Fuente | Elemento | Uso en la web |
|---|---|---|
| Brandbook, páginas 1–7 | Título con barra vertical, primera línea en negrita y segunda en peso normal | Todos los títulos ✅ *aprobado* |
| Brandbook, portada | Manchas orgánicas, racimo de puntos, líneas onduladas | Franja de marca, sección de valores, pie, cursor |
| Brandbook, página 4 | Paleta de 7 colores | Ver sección 2 |
| Behance, GIF 1 | Franja de 4 cuadros con patrones de la marca que se mueven y se transforman | **Franja de marca** animada |
| Behance, GIF 3 | Los valores de la marca junto a una forma que pasa de triángulo a mancha, con puntos amarillos | **Sección de valores** animada |

## 2. Colores

| Variable CSS | HEX | Uso |
|---|---|---|
| `--color-morado` | `#3d3183` | Texto, títulos y su barra, logo, etiqueta del reel, pie, cuadro de ondas. |
| `--color-blanco` | `#ffffff` | Fondo; botón "Hablemos" sobre el reel; texto sobre morado. |
| `--color-magenta` | `#ee3f75` | Acento: hover de botones, subrayados, número de tarjeta, cursor "VER", WhatsApp, palabra destacada. |
| `--color-amarillo` | `#fdba4d` | Fondos de cuadros de la franja; puntos de la sección de valores. |
| `--color-coral` | `#f47854` | Formas animadas. |
| `--color-verde` | `#22a36d` | Formas animadas. |
| `--color-rosa` | `#fabbaf` | Fondo de un cuadro de la franja. |

**Reglas:**
- Las fotos y los videos **se muestran tal cual**: sin capas, degradados ni formas encima.
- Los colores secundarios aparecen solo en la franja de marca, los valores y el pie, nunca como fondo detrás de texto.

### Contraste (WCAG AA)

| Combinación | Contraste | Resultado |
|---|---:|---|
| Morado sobre blanco / blanco sobre morado | 10,68 | ✅ |
| Etiqueta del reel: texto blanco sobre fondo morado sólido | 10,68 | ✅ Se lee sobre cualquier fotograma, sin oscurecer el video |
| "Hablemos" sobre el reel: morado sobre blanco | 10,68 | ✅ |
| Hover de "Hablemos": blanco sobre magenta | 3,75 | ⚠️ Solo texto grande. Elegido por ti. |
| Número de tarjeta en magenta sobre blanco | 3,75 | ⚠️ Decorativo, oculto para lectores de pantalla. |
| Cursor "VER": blanco sobre magenta, 14 px en negrita | 3,75 | ⚠️ Decorativo. |
| Valores en morado sobre blanco | 10,68 | ✅ |

## 3. Tipografías *(❓ pendiente: Jost e Inter)*

| Rol | Fuente del brandbook | Web |
|---|---|---|
| Títulos (MAYÚSCULAS, espaciado amplio) | Futura Md BT | Jost 400 / 700 |
| Nombres de proyecto, subtítulos | Futura Bold | Jost 700 |
| Valores y frase destacada | Futura | Jost 400–500 |
| Cuerpo | Helvetica LT Light | Inter 300 |

| Elemento | Móvil | Escritorio |
|---|---:|---:|
| Título con barra (negrita / normal) | 26 / 22 px | 40 / 34 px |
| Etiqueta del reel | 13 px | 15 px |
| Nombre del proyecto | 15 px | 17 px |
| Lista de valores | 34 px | 56 px |
| Frase destacada | 21 px | 26 px |
| Cuerpo | 16 px | 17 px |

## 4. Logo

`/images/marca/logo-nathaly-habich.svg` (morado, encabezado) y `logo-nathaly-habich-blanco.svg` (blanco, pie).

## 5. Reel

- **Nítido en pantalla grande:** en pantallas de 1024 px o más se sirve un reel nuevo en **1920 × 1080, códec AV1** (`/reel3-av1.mp4`, 17 MB), con la calidad del original. En celulares, o en navegadores sin AV1, se usa el reel liviano actual (`/reel3.mp4`, 1280 px, 7,3 MB).
- **Sin capa de color.** La frase va en una **etiqueta morada sólida** y al lado el botón **"Hablemos"** blanco (hover magenta).
- El original del reel ya viene algo suave de fábrica; esta versión conserva toda la nitidez que tiene.

## 6. Tarjetas de proyecto

- **Video limpio en movimiento** (se reproduce al entrar en pantalla, con portada mientras carga).
- **Ritmo:** una ancha (21:9) y dos medianas (4:3); en móvil, una columna en 4:3.
- **Debajo del video:** número en magenta (`01`), **NOMBRE DEL PROYECTO** y el cliente en morado suave.
- **Con el cursor** (solo computadoras con mouse):
  - el puntero se convierte en una **mancha magenta que cambia de forma** con la palabra **VER**;
  - el video se agranda un 6 % y **se desplaza levemente siguiendo el mouse**;
  - el nombre se subraya en magenta de izquierda a derecha.
- En celulares no hay cursor especial; las tarjetas se tocan normal.

## 7. Momentos animados (inspirados en los GIF del branding)

| Momento | Qué se ve | Dónde iría |
|---|---|---|
| **Franja de marca** (GIF 1) | 4 cuadros a todo el ancho (2 × 2 en móvil): rosa con mancha magenta que se desplaza, morado con ondas blancas que ondulan, amarillo con capas verde, coral y magenta que suben y bajan, y amarillo con mancha morada y puntos blancos que laten. | Entre la grilla de proyectos y el pie del home; también como cierre de las páginas de categoría |
| **Valores** (GIF 3) | "equilibrio, frescura, originalidad, pasión, fuerza, libertad, expresividad, creatividad" se encienden uno a uno; al lado, una forma que se transforma de triángulo coral a mancha verde y luego magenta, con puntos amarillos. | Página Studio |

Todas las animaciones se detienen si el visitante tiene activado "reducir movimiento" en su sistema.

## 8. Botones

| | Principal — "Hablemos" | Secundario |
|---|---|---|
| Forma | Rectángulo, esquinas rectas, borde de 1 px | Texto con línea magenta de 2 px |
| Sobre el reel | Fondo blanco, texto morado | — |
| Sobre blanco | Borde y texto morados | Texto morado |
| Hover | **Fondo magenta, texto blanco** ✅ | Texto magenta |
| WhatsApp flotante | Círculo magenta con borde blanco; hover morado | — |

## 9. Espaciado y estructura

- Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.
- Márgenes laterales: 20 / 32 / 56 px. Encabezado: 64 / 72 / 84 px. Espacio entre secciones: 72 / 104 / 136 px.
- Ancho máximo 1440 px; texto máximo 640 px.
- **Encabezado:** blanco y fijo, logo morado; en móvil, CONTACTO visible + menú.
- **Pie:** morado, ondas blancas en movimiento suave, logo blanco, datos y legales.

---

## ❓ Decisiones abiertas

1. **Fuentes web:** ¿apruebas Jost (por Futura) e Inter (por Helvetica)?
2. **"Siempre en minúsculas":** ¿lo aplico como *nunca en MAYÚSCULAS sostenidas* ("Latina Televisión")?
