# Reglas y Flujo de Trabajo del Proyecto Tagger Pet

## 0. Filosofía General

Este documento establece las reglas y principios fundamentales que rigen el desarrollo del proyecto Tagger Pet. El objetivo es construir un producto de software de alta calidad, mantenible y escalable, aplicando siempre una mentalidad de "desarrollador senior": pensando en el largo plazo, la robustez y la elegancia de la solución.

## 1. Documentos Rectores

Todo el trabajo realizado debe obedecer y ser consistente con los lineamientos establecidos en los siguientes documentos maestros:

1.  **`general_context.md`**: Contiene la visión, arquitectura funcional y reglas de negocio del proyecto. Es la fuente de verdad sobre **qué** estamos construyendo y **por qué**.
2.  **`requirements.md`**: Define el stack tecnológico, la infraestructura y las decisiones técnicas. Es la guía sobre **cómo** lo vamos a construir.
3.  **`design.md`**: Alberga los principios de diseño de UI/UX, paletas de colores, tipografías y la biblioteca de componentes.
4.  **`stories/`**: Carpeta con las Historias de Usuario por producto (`app.md`, `platform.md`).
5.  **`tasks.md`**: Desglosa las historias de usuario en tareas técnicas específicas y accionables para el equipo de desarrollo.

## 2. Principios Fundamentales de Desarrollo

*   **Modularidad y Reutilización:** El código debe ser organizado en módulos cohesivos y de bajo acoplamiento. Antes de crear una nueva función o componente, se debe verificar si algo similar ya existe y puede ser reutilizado o refactorizado para un uso más general.
*   **Escalabilidad Inteligente:** Cada decisión de diseño y codificación debe considerar el crecimiento futuro. Esto no significa sobre-ingeniería, sino construir de una manera que no impida la expansión. Por ejemplo, si un archivo de configuración o una lista de tareas se vuelve demasiado grande, debe ser fraccionado en una estructura de carpetas lógicas (ej. `tasks/general.md`, `tasks/backend.md`, etc.).
*   **Código Limpio y Refactorización Continua:** Se espera código legible, auto-explicativo y que siga las mejores prácticas del lenguaje/framework. No se tolera el "código espagueti". La refactorización no es una tarea aparte, sino una parte integral del proceso de desarrollo. Si ves una oportunidad de mejora, tómala.
*   **Documentación Precisa y Justa:** No se debe sobre-documentar el código con comentarios obvios. Los comentarios deben usarse para explicar el **porqué** de una decisión compleja, no el **qué** hace el código. La documentación principal reside en los archivos `.md` y en la claridad del propio código.
*   **Mentalidad Senior:** Codificar como un senior implica:
    *   Anticipar problemas y casos borde.
    *   Escribir pruebas para el código.
    *   Entender el impacto de las decisiones en el rendimiento y la seguridad.
    *   Priorizar la simplicidad y la mantenibilidad sobre soluciones innecesariamente complejas.

## 3. Gestión de Tareas e Historias de Usuario

*   **Granularidad:** Las tareas deben ser pequeñas y enfocadas. Una tarea no debe tomar más de un día de trabajo. Si es más grande, debe ser fraccionada en sub-tareas más pequeñas y controladas.
*   **Actualización Continua:** Los archivos `stories.md` y `tasks.md` son documentos vivos. Si durante el desarrollo se descubre una nueva historia de uso, una nueva tarea o una sub-tarea, **es obligatorio actualizar el documento correspondiente inmediatamente**.
*   **Marcado de Estado:** Para seguir el progreso, se utilizará la sintaxis de listas de tareas de Markdown.
    *   `[ ]` - Tarea pendiente.
    *   `[x]` - Tarea completada.
    *   Ejemplo: `[x] Crear el archivo rules.md`.

## 4. Organización y Limpieza

El orden es primordial. La estructura de archivos y carpetas debe ser lógica e intuitiva. Se debe mantener el repositorio limpio, eliminando archivos innecesarios y siguiendo una convención de nomenclatura consistente para archivos y variables.

## 5. Lineamientos Transversales (UI/UX y Plataforma)

- **Mobile-first:** Diseñamos para móvil primero; escritorio es mejora progresiva. Un CTA primario por pantalla.
- **Temas Día/Noche:** Toda UI debe soportar **Claro/Oscuro** y un modo **Automático**. No hardcodear colores; usar tokens de `design.md`. Cumplir contraste WCAG AA.
- **Internacionalización (i18n):** La app es multi-idioma (ES y EN iniciales). No concatenar textos; usar claves (`modulo.pantalla.accion`), ICU MessageFormat, y formateo de fecha/número/moneda por locale. Mantener `es` como fallback.
- **Reutilización Web/RN:** Diseñar componentes y tokens para **reuso** en React Native. Evitar APIs específicas del navegador en lógica compartida. Mantener paridad de patrones.
