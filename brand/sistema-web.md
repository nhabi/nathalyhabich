# Sistema visual web — Nathaly Habich (v2)

Basado en el brandbook 2019 (`/brand/brandbook.pdf`, 9 páginas) y los archivos de `/brand/`.
Página de prueba: `/brand/prueba.html`.

> **Estado: v2, pendiente de aprobación.**
> Cambios desde la v1, por tu feedback: más personalidad con los elementos gráficos del brandbook, tarjetas con video en movimiento y hover magenta en el botón.
> Quedan 2 decisiones abiertas (❓ al final).

---

## 1. Lo que dice el brandbook (resumen)

| Página | Contenido | Cómo se usa en la web |
|---|---|---|
| Portada | Manchas orgánicas (magenta, coral, amarillo), racimo de puntos rosa y líneas onduladas blancas sobre morado | Reel del home y pie de página |
| 1 | Logotipo NATHALY + Habich, en morado | Encabezado |
| 2 | Futura Bold + Golden Plains modificada | El logo va como SVG |
| 3 | Logo responsive NH (solo formatos pequeños) | Favicon |
| 1–7 | **Título con barra vertical**: primera línea en negrita, segunda en peso normal ("TIPOGRAFÍAS / LOGOTIPO") | Todos los títulos de página y sección |
| 1–7 | **Número de página dentro de una mancha de color** en la esquina superior derecha | Número de cada tarjeta de proyecto |
| 4 | Paleta de 7 colores | Ver sección 2 |
| 5–6 | Combinaciones permitidas del logo sobre color | Color del número sobre cada mancha |
| 7 | Tipografías: títulos, subtítulos y cuerpo | Ver sección 3 |

---

## 2. Colores

| Variable CSS | HEX | Uso en la web |
|---|---|---|
| `--color-morado` | `#3d3183` | Principal: texto, títulos y su barra, logo, menú, fondo del pie, capa sobre videos. |
| `--color-blanco` | `#ffffff` | Fondo de las páginas; texto sobre morado y sobre videos. |
| `--color-magenta` | `#ee3f75` | **Acento:** hover del botón "Hablemos", subrayados, botón de WhatsApp, palabra destacada, mancha principal del reel. |
| `--color-amarillo` | `#fdba4d` | Detalles gráficos: mancha del reel, número de tarjeta. |
| `--color-coral` | `#f47854` | Detalles gráficos: mancha del reel, número de tarjeta. |
| `--color-verde` | `#22a36d` | Detalles gráficos: número de tarjeta. |
| `--color-rosa` | `#fabbaf` | Racimo de puntos, número de tarjeta. |

Regla: **ningún color se usa como fondo de una sección entera**, salvo el morado del pie. Amarillo, coral, verde y rosa solo aparecen en formas gráficas (manchas, puntos, números).

**Derivados** (el mismo color con transparencia): texto suave = morado 80 % (`#645a9c`), líneas = morado 15 %, capa del reel = morado 15 % → 70 %, capa de tarjetas = morado 0 % → 78 %.

### Contraste (WCAG AA: 4,5:1 texto normal · 3:1 texto grande y gráficos)

| Combinación | Contraste | Resultado |
|---|---:|---|
| Morado sobre blanco / blanco sobre morado | 10,68 | ✅ |
| Morado 80 % sobre blanco | 6,02 | ✅ |
| Blanco sobre video con capa morada (peor caso) | ≈ 4,6 | ✅ |
| Morado sobre amarillo / rosa (números de tarjeta) | 6,26 / 6,51 | ✅ |
| Blanco sobre verde (número, texto grande en negrita) | 3,22 | ✅ texto grande |
| **Blanco sobre magenta** (hover de "Hablemos", número 01) | **3,75** | ⚠️ Cumple como texto grande; no como texto normal. Elegiste mantenerlo. |
| Blanco sobre coral (número 04) | 2,74 | ⚠️ No cumple, pero el brandbook usa esta misma combinación para sus números. El número es decorativo y está oculto para lectores de pantalla. |
| Coral, verde, amarillo o rosa como texto sobre blanco | 1,6 – 3,2 | ❌ No se usan como color de texto. |

---

## 3. Tipografías

| Rol (brandbook) | Fuente del brandbook | Propuesta web (Google Fonts) |
|---|---|---|
| Títulos — MAYÚSCULAS, espaciado amplio | Futura Md BT | **Jost** 400 y 700 (versión libre de Futura) |
| Subtítulos y nombres de proyecto | Futura Bold | **Jost** 700 |
| Frase destacada | Futura | **Jost** 400 |
| Cuerpo de texto | Helvetica LT Light | **Inter** 300 |

Futura y Helvetica no tienen licencia web (las de `/brand/fonts` son de escritorio).

| Elemento | Móvil | Escritorio | Estilo |
|---|---:|---:|---|
| Título con barra, línea 1 | 26 px | 40 px | Jost 700, MAYÚSCULAS, espaciado 0,22 em, barra morada de 3 px |
| Título con barra, línea 2 | 22 px | 34 px | Jost 400, MAYÚSCULAS, espaciado 0,2 em |
| Línea del reel | 14 px | 17 px | Jost 500, MAYÚSCULAS, espaciado 0,22 em, blanco |
| Menú y ES/EN | 12 px | 13 px | Jost 500, MAYÚSCULAS, espaciado 0,12 em |
| Nombre del proyecto (sobre el video) | 15 px | 17 px (22 px en tarjeta ancha) | Jost 700, MAYÚSCULAS, espaciado 0,14 em, blanco |
| Cliente (sobre el video) | 14 px | 14 px | Inter 300, blanco |
| Frase destacada | 21 px | 26 px | Jost 400; una palabra clave en magenta |
| Cuerpo | 16 px | 17 px | Inter 300, interlineado 1,7, máx. 640 px |

---

## 4. Logo

| Archivo | Color | Va sobre |
|---|---|---|
| `/images/marca/logo-nathaly-habich.svg` | Morado | Encabezado blanco |
| `/images/marca/logo-nathaly-habich-blanco.svg` | Blanco | Pie morado |

Recortados del `Logotipo.svg` original (mismo trazo). Alto: 34 px móvil, 42 px escritorio, 52 px en el pie.

## 5. Elementos gráficos (de la portada del brandbook)

| Elemento | Archivo / forma | Dónde |
|---|---|---|
| Manchas orgánicas | 3 formas SVG en magenta, coral y amarillo | Esquinas del reel (flotan despacio) y mancha magenta en el pie |
| Racimo de puntos | `/images/marca/puntos-rosa.svg` | Junto a la mancha magenta del reel y bajo el título de bloques de texto (solo escritorio) |
| Líneas onduladas | `/images/marca/ondas-blanco.svg` y `ondas-morado.svg` | Esquina inferior derecha del reel y del pie |
| Mancha de esquina con número | Forma SVG | Esquina superior derecha de cada tarjeta, colores en rotación |

Si el visitante tiene activado "reducir movimiento" en su sistema, las manchas no se mueven.

## 6. Botones

| | Principal — "Hablemos" | Secundario |
|---|---|---|
| Forma | Rectángulo de esquinas rectas, borde de 1 px, sin fondo | Texto con línea magenta de 2 px debajo |
| Texto | Jost 500, 13 px, MAYÚSCULAS, espaciado 0,16 em | Jost 500, 12 px, MAYÚSCULAS, espaciado 0,16 em |
| Color | Blanco sobre el reel; morado sobre blanco | Morado |
| **Hover** | **Fondo magenta, texto blanco** ✅ (elegido) | El texto pasa a magenta |
| WhatsApp flotante | Círculo de 54 px, magenta con borde blanco; hover: morado | — |

## 7. Grilla y tarjetas de proyecto

- **Videos en movimiento**, como antes: cada tarjeta reproduce su video (con portada mientras carga) cuando entra en pantalla.
- **Ritmo:** una tarjeta ancha (21:9) y luego dos medianas (4:3), y se repite. En móvil, una columna en 4:3.
- **Encima del video:** capa morada abajo, **NOMBRE DEL PROYECTO** en blanco y debajo el cliente.
- **Número** 01, 02, 03… en una mancha de color en la esquina, rotando magenta, verde, amarillo, coral, rosa y morado.
- **Hover:** el video crece un 4 %, la mancha del número crece y aparece la línea magenta bajo el nombre.
- Separación entre tarjetas: 16 px móvil, 20 px tablet, 24 px escritorio.

## 8. Espaciado

Escala 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.

| | Móvil | Tablet (≥ 768 px) | Escritorio (≥ 1200 px) |
|---|---:|---:|---:|
| Margen lateral | 20 px | 32 px | 56 px |
| Encabezado | 64 px | 72 px | 84 px |
| Espacio entre secciones | 72 px | 104 px | 136 px |

Ancho máximo del contenido: 1440 px. Ancho máximo del texto: 640 px.

## 9. Encabezado y pie

- **Encabezado:** blanco, fijo al hacer scroll, logo morado, menú en Jost con subrayado magenta en hover y en la página actual. En móvil, **CONTACTO** siempre visible + ícono de menú.
- **Pie:** morado, mancha magenta asomando arriba a la izquierda, ondas blancas abajo a la derecha, logo blanco, datos de contacto y enlaces legales pequeños.

---

## ❓ Decisiones que siguen abiertas

1. **Fuentes web:** ¿apruebas **Jost** (por Futura) e **Inter** (por Helvetica)?
2. **"Siempre en minúsculas":** lo aplico como *nunca en MAYÚSCULAS sostenidas* (por ejemplo, "Latina Televisión"). ¿O lo quieres todo en minúscula?
