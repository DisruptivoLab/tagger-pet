# Tagger Pet

[![CI](https://github.com/DisruptivoLab/tagger-pet/actions/workflows/ci.yml/badge.svg)](https://github.com/DisruptivoLab/tagger-pet/actions/workflows/ci.yml)

Plataforma unificada para el cuidado de mascotas: dos frontends (App Dueños y Plataforma de Gestión) sobre un backend único con base de datos global.

## 📚 Documentación principal

- Contexto general: [conext/general_context.md](conext/general_context.md)
- Requerimientos y stack: [conext/requirements.md](conext/requirements.md)
- Reglas de trabajo: [conext/rules.md](conext/rules.md)
- Diseño y theming (M3): [conext/design.md](conext/design.md)
- Tareas y roadmap: [conext/tasks.md](conext/tasks.md)
- Despliegue en Vercel: [docs/vercel.md](docs/vercel.md)
- Historias de usuario (App Dueños): [conext/stories/app.md](conext/stories/app.md)
- Historias de usuario (Plataforma): [conext/stories/platform.md](conext/stories/platform.md)

> Nota: Los archivos originales en la raíz y en `stories/` fueron reemplazados por punteros a `conext/`.

## 🗂️ Estructura del repo (actual y prevista)

- `conext/` — Documentación fuente del proyecto
  - `general_context.md`, `requirements.md`, `rules.md`, `design.md`, `tasks.md`
  - `stories/` — Historias por producto
- `apps/` — (previsto) Aplicaciones
  - `web/` — Next.js (Material 3)
  - `api/` — NestJS (Prisma + PostgreSQL/PostGIS)
- `packages/` — (previsto) Paquetes compartidos (`@tagger/shared`)
- `.github/` — Workflows de CI/CD

## 🚀 Próximos pasos sugeridos

1. M0.1 — Monorepo y tooling: Turborepo/Nx, apps `web`/`api`, `@tagger/shared`, ESLint/Prettier, CI básico.
2. M0.DB — PostgreSQL + PostGIS con Prisma (migraciones y seeds).
3. Decidir proveedor de autenticación (Auth0 vs Cognito) para M1.

Consulta los detalles en [conext/tasks.md](conext/tasks.md).

## 🌐 Deploy

Producción (Vercel): https://tagger-pet-web.vercel.app/

## 🤝 Contribuir

- Sigue las pautas de `conext/rules.md` (modularidad, documentación concisa, checklists).
- Mantén los tokens/estilos alineados a `conext/design.md`.
- Refuerza i18n, a11y y mobile-first en cada entrega.
