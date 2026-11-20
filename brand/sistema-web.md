# Sistema visual web — Nathaly Habich

Basado en el brandbook 2019 (`/brand/brandbook.pdf`, 9 páginas) y los archivos de `/brand/`.
Página de prueba: `/brand/prueba.html`.

> **Estado: propuesta pendiente de aprobación.** Hay 4 decisiones marcadas con ❓ al final.

---

## 1. Lo que dice el brandbook (resumen)

| Página | Contenido |
|---|---|
| 1 | Logotipo: **NATHALY** (mayúsculas, con raya inferior partida) + **Habich** (manuscrita). Color morado. |
| 2 | Fuentes del logo: **Futura Bold** (NATHALY) y **Golden Plains modificada** (Habich). |
| 3 | Logo responsive **NH**: *solo para formatos pequeños o redes sociales*. Tamaño mínimo 2 cm de alto. |
| 4 | Paleta de 7 colores, *tamaños por relevancia de color* (de más a menos importante). |
| 5–6 | Logo sobre fondos de color: combinaciones permitidas y prohibidas. |
| 7 | Tipografías en piezas: títulos, subtítulos y cuerpo de texto. |
| Portada | Elementos gráficos: manchas orgánicas, puntos y líneas onduladas. |

---

## 2. Colores

El brandbook ordena los colores por relevancia: el morado y el blanco son los principales; el resto es acento o detalle.

| Variable CSS | HEX | Uso en la web |
|---|---|---|
| `--color-morado` | `#3d3183` | Color principal: texto, títulos, logo, menú, bordes de botones, fondo del pie de página. |
| `--color-blanco` | `#ffffff` | Fondo de todas las páginas. Texto y logo sobre morado o sobre el reel. |
| `--color-magenta` | `#ee3f75` | **Acento, con moderación:** relleno del botón "Hablemos" al pasar el mouse, subrayados en hover, anillo de foco. Nunca como fondo de secciones. |
| `--color-amarillo` | `#fdba4d` | Reservado. No se usa por ahora (solo detalles puntuales si se aprueba). |
| `--color-coral` | `#f47854` | Reservado. |
| `--color-verde` | `#22a36d` | Reservado. |
| `--color-rosa` | `#fabbaf` | Reservado. |

**Tonos derivados** (el mismo color con transparencia, sin colores nuevos):

| Variable CSS | Valor | Uso |
|---|---|---|
| `--color-texto-suave` | morado al 80 % → `#645a9c` | Texto secundario (cliente en las tarjetas, notas). |
| `--color-linea` | morado al 15 % | Líneas divisorias y borde inferior del encabezado. |
| `--overlay-reel` | degradado de morado (0 % → 70 %) | Capa sobre el reel para que el texto blanco se lea. |

### Contraste (WCAG AA: 4,5:1 texto normal · 3:1 texto grande ≥ 24 px, o ≥ 18,7 px en negrita, y elementos gráficos)

| Combinación | Contraste | Resultado |
|---|---:|---|
| Morado sobre blanco | 10,68 | ✅ Cumple (incluso AAA) |
| Blanco sobre morado | 10,68 | ✅ Cumple |
| Morado 80 % sobre blanco | 6,02 | ✅ Cumple |
| Blanco 80 % sobre morado | 7,46 | ✅ Cumple |
| Morado sobre amarillo | 6,26 | ✅ Cumple |
| Morado sobre rosa | 6,51 | ✅ Cumple |
| Blanco sobre reel con degradado morado al 70 % | ≈ 4,6 (peor caso: fotograma blanco) | ✅ Cumple |
| **Blanco sobre magenta** | **3,75** | ⚠️ Solo texto grande. **No cumple para texto normal.** |
| **Magenta sobre blanco** | **3,75** | ⚠️ Solo texto grande. No usar magenta para texto chico ni enlaces. |
| Blanco sobre verde | 3,22 | ⚠️ Solo texto grande |
| Blanco sobre coral | 2,74 | ❌ No cumple |
| Morado sobre magenta | 2,85 | ❌ No cumple |
| Blanco sobre amarillo / rosa | 1,71 / 1,64 | ❌ No cumple |
| Coral, verde, amarillo o rosa como texto sobre blanco | 1,6 – 3,2 | ❌ No cumplen |

**Conclusión:** todo el texto va en morado sobre blanco o en blanco sobre morado. El magenta queda para rellenos y detalles gráficos (para los gráficos alcanza 3:1). Los logos de las páginas 5 y 6 del brandbook (blanco sobre magenta, verde o coral) son válidos porque un logo no tiene requisito de contraste, pero no los usaré con texto.

---

## 3. Tipografías

| Rol (brandbook, p. 7) | Fuente del brandbook | ¿Hay versión web? | Propuesta para la web |
|---|---|---|---|
| **Títulos** — siempre en MAYÚSCULAS, espaciado 100 | Futura Md BT | ❌ Es comercial. Las de `/brand/fonts` tienen licencia de escritorio: no se pueden publicar en la web. | **Jost 500** (Google Fonts), una versión libre de Futura con el mismo dibujo geométrico. |
| **Subtítulos** — siempre en minúsculas | Futura Bold | ❌ Igual | **Jost 700** |
| Subtítulos (alternativa) | Helvetica 65 Medium | ❌ Comercial | **Inter 500** |
| **Cuerpo de texto** — siempre en minúsculas | Helvetica LT Light | ❌ Comercial (solo viene instalada en Mac/iPhone) | **Inter 300** (Google Fonts): la grotesca libre más cercana a Helvetica con peso Light. |
| Logo | Futura Bold + Golden Plains modificada | — | El logo se usa como imagen SVG; no necesita la fuente. |

"Siempre en minúsculas" lo interpreto como **nunca en MAYÚSCULAS sostenidas**: los nombres propios conservan su mayúscula inicial (ver ❓ 3).

General Sans (la fuente que hoy usan los títulos de la web) **no está en el brandbook**: sale.

### Escala

| Elemento | Fuente | Móvil | Escritorio | Estilo |
|---|---|---:|---:|---|
| Título de página (H1: "TV", "Studio", "Contacto") | Jost 500 | 26 px | 36 px | MAYÚSCULAS, espaciado 0,1 em, interlineado 1,2 |
| Título de sección (H2: "El estudio", "Clientes") | Jost 500 | 16 px | 18 px | MAYÚSCULAS, espaciado 0,14 em |
| Línea del reel ("Sets y experiencias de marca · Perú") | Jost 500 | 13 px | 15 px | MAYÚSCULAS, espaciado 0,2 em, blanco |
| Menú | Jost 500 | 12 px | 13 px | MAYÚSCULAS, espaciado 0,12 em |
| Nombre del proyecto (tarjeta) | Jost 500 | 13 px | 14 px | MAYÚSCULAS, espaciado 0,1 em |
| Cliente (tarjeta) | Inter 300 | 14 px | 14 px | Color texto suave |
| Subtítulo | Jost 700 | 16 px | 18 px | Minúsculas |
| Cuerpo de texto | Inter 300 | 16 px | 17 px | Interlineado 1,7, máximo 640 px de ancho |
| Pie de página | Inter 300 | 13 px | 13 px | Legales a 11 px |

---

## 4. Logo

Archivos web nuevos, recortados del `Logotipo.svg` del brandbook (mismo trazo, sin el margen vacío):

| Archivo | Color | Va sobre |
|---|---|---|
| `/images/marca/logo-nathaly-habich.svg` | Morado `#3d3183` | Fondo blanco (encabezado de todas las páginas). |
| `/images/marca/logo-nathaly-habich-blanco.svg` | Blanco | Morado (pie de página) y el reel del home (con su capa morada). |

- **Tamaño en el encabezado:** 34 px de alto en móvil y 42 px en escritorio.
- **NH (logo responsive):** según el brandbook, solo para formatos pequeños. En la web lo usaría como favicon (ícono de la pestaña). No hay SVG del NH; está `logo corto.png`.
- **Nunca:** logo en magenta, coral, verde o amarillo sobre fondos de color (página 6 del brandbook).

---

## 5. Botones

| | Principal — "Hablemos" | Secundario — enlace de acción |
|---|---|---|
| Uso | WhatsApp en el reel, Studio y Contacto | "Ver todos los proyectos", "Escríbenos", etc. |
| Forma | Rectángulo, esquinas rectas, borde de 1 px, sin fondo | Solo texto con línea inferior de 1 px |
| Texto | Jost 500, 13 px, MAYÚSCULAS, espaciado 0,14 em | Jost 500, 12 px, MAYÚSCULAS, espaciado 0,14 em |
| Relleno | 14 px × 30 px | — |
| Sobre blanco | Borde y texto morados | Texto y línea morados |
| Sobre el reel / morado | Borde y texto blancos | Texto y línea blancos |
| **Hover** | Fondo y borde magenta, texto blanco (transición de 0,25 s) | La línea pasa a magenta y se engrosa a 2 px |
| Foco (teclado) | Anillo magenta de 2 px, separado 3 px | Igual |

⚠️ El hover del botón principal pone texto blanco sobre magenta (3,75:1), que solo cumple AA como texto grande. Ver ❓ 1.

---

## 6. Espaciado y grilla

**Escala de espacios:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.

| | Móvil (< 768 px) | Tablet (768–1199 px) | Escritorio (≥ 1200 px) |
|---|---:|---:|---:|
| Margen lateral | 20 px | 32 px | 56 px |
| Alto del encabezado | 64 px | 72 px | 84 px |
| Columnas de la grilla de proyectos | 1 | 2 | 2 |
| Separación horizontal entre tarjetas | — | 24 px | 40 px |
| Separación vertical entre tarjetas | 40 px | 56 px | 72 px |
| Espacio entre secciones | 64 px | 96 px | 128 px |

- **Ancho máximo del contenido:** 1440 px, centrado.
- **Ancho máximo del texto:** 640 px, para que las líneas no se vuelvan largas.
- **Dos columnas en escritorio, no tres:** así cada proyecto se ve grande, como en los referentes. Son 12 proyectos, es decir, 6 filas.

---

## 7. Fotos y videos

- **Reel del home:** pantalla completa (100 % del alto visible), recortado para cubrir y con el degradado morado abajo, donde van la línea y el botón.
- **Tarjetas de proyecto:**
  - Proporción **3:2** para todas, con `object-fit: cover`, así la grilla queda pareja aunque los videos sean 16:9 y las fotos 4:3.
  - Esquinas rectas, sin sombra ni marco: el brandbook es plano.
  - Debajo de la imagen, a 14 px: **NOMBRE DEL PROYECTO** — Cliente, en una sola línea (dos en móvil si no cabe).
  - Hover: la imagen crece un 3 % en 0,6 s y aparece una línea magenta de 2 px bajo el nombre.
  - Los videos siguen con portada y reproducción al entrar en pantalla (ya implementado).
- **Fotos de Studio:** retrato con la misma proporción natural de la foto, sin recorte ni bordes.
- **Logos de clientes:** todos en un solo color (morado), a la misma altura (36 px móvil / 44 px escritorio), en grilla de 2 columnas en móvil y 4 en escritorio.

---

## 8. Elementos de interfaz

- **Encabezado:** fondo blanco, logo morado, línea inferior al 15 %. En el home empieza transparente sobre el reel (logo y menú blancos) y pasa a blanco al hacer scroll.
  - Móvil: logo a la izquierda; a la derecha, **CONTACTO** siempre visible y el ícono del menú (que abre TV, Streaming, Esports y eventos, Studio y ES | EN).
- **Pie de página:** fondo morado, logo blanco, texto blanco en Inter 300. Los enlaces legales quedan pequeños al lado.
- **WhatsApp flotante:** círculo de 52 px, fondo morado, ícono blanco y borde blanco de 2 px (para que se vea también sobre el pie morado). Hover: fondo magenta. Abajo a la derecha, a 20 px.
- **Elementos gráficos del brandbook** (manchas, puntos, ondas): no se usan en la web, para mantenerla sobria. Ver ❓ 4.

---

## ❓ Decisiones que necesito antes de aplicar

1. **Hover del botón "Hablemos".**
   - **A (recomendada):** fondo magenta con texto blanco, fiel al acento de marca. Contraste 3,75:1: no llega a AA para texto chico, aunque solo se ve mientras pasas el mouse.
   - **B:** fondo morado con texto blanco (10,68:1), cumple AA en todo; el magenta queda solo en el anillo de foco y en los subrayados.
2. **Fuentes web:** ¿apruebas **Jost** (por Futura) e **Inter** (por Helvetica)? La otra opción es comprar la licencia web de Futura PT y Helvetica Now (pago anual, en Adobe Fonts o MyFonts).
3. **"Siempre en minúsculas"** (subtítulos y cuerpo): ¿lo interpreto como *nunca en mayúsculas sostenidas* (propuesta) o como todo en minúscula, incluso nombres propios ("latina televisión")?
4. **Elementos gráficos** (manchas, puntos, ondas): ¿fuera de la web (propuesta) o como un detalle mínimo, por ejemplo solo en el pie de página o en la página 404?
