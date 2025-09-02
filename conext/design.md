# Diseño de UI/UX y Sistema de Componentes: Material Design 3

## 1. Sistema de Diseño Principal

Tagger Pet adoptará **Material Design 3 (M3)**, el sistema de diseño de código abierto de Google, como la única fuente de verdad para la interfaz de usuario (UI) y la experiencia de usuario (UX).

**Referencia Principal:** [https://m3.material.io/](https://m3.material.io/)

## 2. Filosofía de Diseño: "Design with Emotion"

Nuestra filosofía se basa en crear experiencias atractivas y memorables mediante:

- **Colores Vibrantes**
- **Movimiento Intuitivo**
- **Componentes Adaptables**
- **Tipografía Flexible**
- **Formas Contrastantes**

## 3. El Sistema de Theming: Design Tokens

Material Design 3 se personaliza a través de **Design Tokens**. Un "token" es una variable que almacena una decisión de diseño (ej. el color primario, el tamaño de la fuente del cuerpo de texto). En lugar de codificar valores fijos como `#FFFFFF`, usamos tokens como `var(--md-sys-color-primary)`.

Esto nos permite:

1.  Tener una única fuente de verdad para nuestros estilos.
2.  Cambiar un estilo en un solo lugar (`token`) y que se actualice en toda la aplicación.
3.  Mantener la consistencia visual de forma sencilla.

## 4. Definiciones del Tema "Tagger Pet"

Aquí se definen las decisiones de diseño específicas para nuestra marca.

### 4.1. Paleta de Colores

| Rol del Color            | Nombre del Token (Ejemplo)  | Valor Hex (Propuesta Inicial) | Descripción                                                |
| :----------------------- | :-------------------------- | :---------------------------- | :--------------------------------------------------------- |
| **Primario**             | `--md-sys-color-primary`    | `#6750A4`                     | Color principal para botones, enlaces y elementos activos. |
| **Secundario**           | `--md-sys-color-secondary`  | `#958DA5`                     | Para elementos de menor énfasis, como filtros o chips.     |
| **Terciario**            | `--md-sys-color-tertiary`   | `#B58392`                     | Para acentos y elementos decorativos.                      |
| **Error**                | `--md-sys-color-error`      | `#B3261E`                     | Para indicar errores y alertas destructivas.               |
| **Superficie**           | `--md-sys-color-surface`    | `#FFFBFE`                     | Color de fondo para tarjetas, menús y hojas.               |
| **Texto sobre Primario** | `--md-sys-color-on-primary` | `#FFFFFF`                     | Color del texto que va sobre el color primario.            |

### 4.2. Tipografía

| Atributo                 | Nombre del Token (Ejemplo)                   | Valor (Propuesta Inicial) |
| :----------------------- | :------------------------------------------- | :------------------------ |
| **Fuente Principal**     | `--md-ref-typeface-brand`                    | `'Poppins', sans-serif`   |
| **Tamaño Título Grande** | `--md-sys-typescale-headline-large-size`     | `2rem`                    |
| **Tamaño Cuerpo Texto**  | `--md-sys-typescale-body-medium-size`        | `1rem`                    |
| **Altura de Línea**      | `--md-sys-typescale-body-medium-line-height` | `1.5rem`                  |

### 4.3. Forma (Bordes)

Adoptaremos una estética predominantemente redondeada para dar una sensación amigable y moderna.

| Nivel de Redondez      | Nombre del Token (Ejemplo)          | Valor (Propuesta Inicial) |
| :--------------------- | :---------------------------------- | :------------------------ |
| **Pequeño**            | `--md-sys-shape-corner-small`       | `8px`                     |
| **Medio**              | `--md-sys-shape-corner-medium`      | `12px`                    |
| **Grande**             | `--md-sys-shape-corner-large`       | `16px`                    |
| **Extra Grande**       | `--md-sys-shape-corner-extra-large` | `28px`                    |
| **Completo (Píldora)** | `--md-sys-shape-corner-full`        | `9999px`                  |

### 4.4. Aplicación de la Forma a Componentes Clave

Para asegurar la consistencia, aplicaremos la escala de formas de la siguiente manera:

| Componente                         | Nivel de Forma a Utilizar | Token Correspondiente               | Apariencia Resultante                             |
| :--------------------------------- | :------------------------ | :---------------------------------- | :------------------------------------------------ |
| **Botones**                        | `Full`                    | `--md-sys-shape-corner-full`        | Forma de píldora, muy redondeada.                 |
| **Chips**                          | `Full`                    | `--md-sys-shape-corner-full`        | Pequeñas píldoras para filtros y etiquetas.       |
| **Tarjetas (Cards)**               | `Large`                   | `--md-sys-shape-corner-large`       | Esquinas suaves y visiblemente redondeadas.       |
| **Diálogos / Modales**             | `Extra Large`             | `--md-sys-shape-corner-extra-large` | Esquinas muy pronunciadas, dando un look moderno. |
| **Botón de Acción Flotante (FAB)** | `Circular` (por defecto)  | -                                   | Un círculo perfecto, alineado con la estética.    |
| **Campos de Texto**                | `Small`                   | `--md-sys-shape-corner-small`       | Un redondez sutil y elegante.                     |

## 5. Guía de Implementación Técnica (Para Desarrolladores)

Para aplicar el tema de Tagger Pet, el desarrollador definirá los tokens en un archivo CSS global (ej. `styles/theme.css`) que se cargue en la aplicación Next.js.

**Ejemplo de implementación en CSS:**

```css
/* styles/theme.css */
:root {
  /* 1. Definir la fuente de referencia */
  --md-ref-typeface-brand: 'Poppins', sans-serif;
  --md-ref-typeface-plain: 'Poppins', sans-serif;

  /* 2. Definir los colores del sistema usando nuestra paleta */
  --md-sys-color-primary: #6750a4;
  --md-sys-color-secondary: #958da5;
  --md-sys-color-tertiary: #b58392;
  --md-sys-color-error: #b3261e;
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-primary: #ffffff;
  /* ...y así sucesivamente para todos los tokens de color. */

  /* 3. Definir la forma de las esquinas */
  --md-sys-shape-corner-medium: 8px;
  /* ...etc. */
}
```

Una vez definidos estos tokens, los componentes de Material Web los usarán automáticamente. Para personalizaciones específicas, se pueden sobreescribir los tokens de un componente en particular:

```css
/* Sobreescribir un botón específico para que sea de error */
md-filled-button.error {
  --md-filled-button-container-color: var(--md-sys-color-error);
  --md-filled-button-label-text-color: var(--md-sys-color-on-error);
}
```

## 6. Modo Claro/Oscuro (Day/Night)

Estrategia:

- Soportamos tres modos: **Claro**, **Oscuro** y **Automático** (respeta `prefers-color-scheme`).
- El modo se almacena (localStorage/cuenta) y puede cambiarse en tiempo real sin recargar.
- Los tokens de color se sobreescriben por tema usando un selector de atributo `data-theme`.

Ejemplo técnico (CSS tokens con selector de tema):

```css
:root {
  /* Tema Claro (por defecto) */
  --md-sys-color-primary: #6750a4;
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-primary: #ffffff;
}

/* Tema Oscuro */
:root[data-theme='dark'] {
  --md-sys-color-primary: #d0bcff;
  --md-sys-color-surface: #121212;
  --md-sys-color-on-primary: #381e72;
}
```

Accesibilidad y contraste:

- Cumplir **WCAG AA** (contraste ≥ 4.5:1 texto normal, 3:1 títulos grandes).
- Evitar “puro negro” en oscuro; preferir superficies en `#121212`/`#1E1E1E` para fatiga visual.
- Ajuste aplicado (Dark): `--md-sys-color-on-surface-variant` se define como `#E2DDEE` sobre `#49454F` (≈ 7.04:1) para asegurar AA.

Comportamiento automático:

- Si el usuario elige **Automático**, la app aplica el tema según el sistema y **escucha cambios** del media query.

## 7. Internacionalización Visual (i18n) y RTL

- Todo texto externo al código (no hardcode). Claves con notación de puntos: `profile.edit.name`.
- Usar **ICU MessageFormat** para pluralización y variables.
- Evitar concatenación de strings; usar placeholders. Ajustar **espaciado flexible** para textos largos.
- Preparado para **RTL** (usar `logical properties` en CSS y no asumir direcciones).

## 8. Reutilización Web / React Native

- Los **tokens** (colores, tipografía, espaciado) son la **fuente común** para Web y RN.
- Paridad de componentes clave (botones, chips, cards). En RN se mapearán a librerías equivalentes y estilos con los mismos tokens.
- Evitar dependencias del DOM en la **lógica** compartida para portabilidad.
