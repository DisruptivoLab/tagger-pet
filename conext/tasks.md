# Tareas de Desarrollo

Este documento desglosa las historias de usuario en tareas técnicas pequeñas (≤ 1 día) y accionables. Usa checklists y referencia a HUs donde aplica. Mantén consistencia con `general_context.md`, `requirements.md`, `design.md`, `rules.md` y `stories/app.md`.

Leyenda estado: `[ ] pendiente`, `[x] hecho`, `[-] no aplica`, `[~] en progreso`.

## Supuestos y decisiones previas (ajustables)

- Autenticación: se decidirá entre Auth0 y AWS Cognito antes de M1.
- ORM: **Prisma** elegido (por velocidad, DX y tipos). Para PostGIS usaremos migraciones SQL y `$queryRaw` en consultas espaciales.
- Push: se evaluará FCM vs OneSignal en M2 (email primero; push y WhatsApp después).
- Mapas: Leaflet + OpenStreetMap inicialmente (sin llaves), con opción a Mapbox a futuro.

---

## Hito M0 — Fundaciones (infra, diseño, i18n, base de datos)

### M0.1 Repo, tooling y CI/CD

- [x] Crear monorepo (Turborepo) con apps `web` (Next.js) y paquete `@tagger/shared`. (API NestJS se añade en M0.6)
- [x] Configurar ESLint + Prettier + EditorConfig en raíz.
- [x] Añadir Husky + lint-staged para pre-commit (lint y format).
- [~] Configurar CI (GitHub Actions): lint, build y tests para web y api. (web: lint/typecheck/build listos; tests y API pendientes)
- [x] Conectar `web` a Vercel (preview por PR y prod en main). Ver guía: docs/vercel.md

DoD M0.1:

- Scripts `lint`, `format` funcionando localmente.
- `npm run dev` arranca `apps/web` y `packages/shared` sin errores.

### M0.2 Variables de entorno y secretos

- [x] Definir `.env.example` para web y api (DB_URL, AWS, AUTH, EMAIL, etc.).
- [ ] Documentar manejo de secretos (Vercel env, GitHub Secrets, AWS SSM).

### M0.3 Diseño y theming (design.md)

- [x] Crear `apps/web/app/theme.css` con tokens base de M3 (colores/tipo/shape) según `design.md`.
- [x] Implementar selector de tema (`data-theme`) en layout raíz con Claro/Oscuro/Automático.
- [ ] Añadir verificación de contraste (WCAG AA) en diseño de componentes críticos (botón primario, texto cuerpo sobre surface).

DoD M0.3:

- Tema se ajusta a preferencia del sistema y toggle manual visible en la UI.
- Contraste AA validado en botón primario y texto principal.

### M0.4 Internacionalización (i18n)

- [x] Adoptar `next-intl` para Next.js.
- [x] Estructurar claves por dominio (`modulo.pantalla.accion`).
- [~] Cargar locales ES (fallback) y EN; detección por navegador; persistencia por cuenta cuando el usuario elija. (detección OK; persistencia pendiente)

### M0.5 Accesibilidad base (a11y)

- [x] Activar eslint-plugin-jsx-a11y en `web`.
- [ ] Crear pauta de focus visible y navegación por teclado en layout base.

### M0.DB Diseño y construcción de Base de Datos (PostgreSQL + PostGIS)

- [ ] Provisionamiento local: contenedor Postgres 16 con PostGIS (docker-compose) y usuario/DB del proyecto.
- [ ] Provisionamiento cloud: RDS PostgreSQL con PostGIS habilitado (Parameter Group) y backups automáticos.
- [ ] Extensiones: activar `postgis` y `pg_trgm` en todos los entornos.
- [ ] Modelado (tablas y relaciones):
  - `users`: email único, nombre, teléfono, `locale`, `timezone`, `theme_preference` (light/dark/auto), preferencias notificación, `role` (user/admin_global).
  - `pets`: dueño (`owner_id`), nombre, especie, raza, sexo, nacimiento, estado (active/lost), `primary_device_id` (nullable).
  - `files`: `pet_id`, `owner_id`, `s3_key`, tipo (doc/imagen/video), nombre, descripción, `deleted_at` (borrado lógico).
  - `medical_entries`: `pet_id`, `created_by_user_id`, `created_by_ally_id` (nullable), tipo (enum), notas, `occurred_at`.
  - `medical_entry_files` (join): `medical_entry_id`, `file_id`.
  - `reminders`: `pet_id`, tipo, título/notas, `due_at`, `completed_at`, `created_by`.
  - `reminder_channels`: `user_id`, `channel` (push/email/whatsapp), `enabled` (bool).
  - `devices`: `pet_id`, tipo (QR/MICROCHIP), alias, estado (active/disabled/lost), `is_primary`, `identifier` (serial/chip), `replaced_by_id` (nullable).
  - `device_reads`: `device_id`, `read_at`, `source` (qr/web), `location` (geography(Point,4326)), `ip_hash` (nullable), `meta` JSONB.
  - `allies` (entidades/negocios): nombre legal, tipo (vet/petshop/entidad_publica), `verified_at`, `status`, datos de contacto.
  - `ally_users`: `ally_id`, `user_id`, `role` (ally_admin/staff), estado.
  - `pet_allies`: vínculo por consentimiento `pet_id` ↔ `ally_id`, `status` (pending/approved/revoked), `requested_at`, `resolved_at`, `expires_at` (opcional).
  - `org_addresses`: `ally_id`, dirección textual, `location` (geography(Point,4326)), `service_area` (geometry(MultiPolygon,4326) opcional).
  - `audit_logs`: `actor_type` (user/ally_user/system), `actor_id`, `action`, `entity`, `entity_id`, `at`, `meta` JSONB.
  - `rate_limits` (opcional): `key`, `window`, `count`, `reset_at`.
- [ ] Restricciones y reglas:
  - FKs con `ON DELETE` acorde: mascotas borran en cascada `files` y vistas; entradas clínicas pueden ser `RESTRICT`.
  - Unicidad: `users.email`, `devices.identifier` (global), un solo `is_primary=true` por `pet_id` (índice parcial), `ally_users` único por (`ally_id`,`user_id`).
  - Checks: enums de tipo/estado/sexo válidos; `org_addresses.location` SRID=4326.
- [ ] Índices:
  - Búsqueda: `pets(name)` con `pg_trgm` para LIKE/ILIKE; filtros por `species`, `sex`, `status`.
  - `medical_entries (pet_id, occurred_at DESC)`; `reminders (due_at, pet_id)`; `device_reads (device_id, read_at DESC)`.
  - Geoespacial: `GIST` sobre `device_reads.location` y `org_addresses.location`/`service_area`.
- [ ] Migraciones: usar **Prisma Migrate**; para columnas PostGIS crear **migraciones SQL personalizadas** (seeds y rollbacks incluidos). Pipeline en CI (preview y prod con gates).
- [ ] Prisma setup: `npx prisma init`, `schema.prisma` con modelos; mapear tipos no soportados (geography/geometry) con `Unsupported("geography")`; añadir consultas espaciales con `prisma.$queryRaw`.
- [ ] Seeds: script de semillas para dev (usuario y mascota demo, aliado demo, dirección con coordenadas, dispositivo QR, lecturas ficticias).
- [ ] Backups y mantenimiento: snapshots automáticos, PITR, política de retención; VACUUM/ANALYZE programado.
- [ ] Privacidad: cifrado en reposo (RDS), minimizar PII; redondeo/ruido en coordenadas de `device_reads` si se expone públicamente.
- [ ] ERD: generar diagrama de entidades y relaciones y guardarlo en `docs/erd.png`.
- [ ] Pruebas espaciales: `EXPLAIN ANALYZE` de consultas con `ST_DWithin` y verificación de uso de índice GIST.

### M0.6 Backend base (API NestJS)

- [ ] Crear proyecto NestJS modular: `auth`, `users`, `pets`, `files`, `devices`, `medical`, `reminders`.
- [ ] **Prisma**: inicializar cliente, configurar conexión, generar tipos y repositorios básicos.
- [ ] Consumir el esquema definido en M0.DB (modelos/tablas/índices) y exponer repositorios/servicios.
- [ ] Semillas mínimas (dev): usuario demo y mascota demo.

### M0.7 Integraciones cloud

- [ ] S3: bucket para Casillero Digital; política y CORS mínimos.
- [ ] SES: dominio verificado y plantilla de emails transaccionales.

---

## Hito M1 — Módulo 1: Gestión de Perfiles (HU1.x)

### M1.1 Autenticación y cuenta (HU1.1.1–HU1.1.4)

- [ ] Decidir proveedor (Auth0 vs Cognito) y crear tenant/user-pool.
- [ ] Flujo email+password: registro, login, logout; persistencia de sesión segura.
- [ ] Endpoints `GET/PUT /me` para editar perfil (nombre, teléfono).
- [ ] UI: pantallas Registro, Login, Perfil; validaciones inline y mensajes simples.

### M1.2 Mascotas (HU1.2.x)

- [ ] API: CRUD `pets` (con ownership por `userId`).
- [ ] Listado con búsqueda por nombre/alias; filtros por especie/sexo/estado; orden por nombre/edad.
- [ ] UI: Lista y Detalle de Mascota; estados vacíos con atajos.

### M1.3 Casillero Digital (HU1.3.x)

- [ ] API: presigned URLs S3 (upload/download), metadatos (nombre/descripción), borrado lógico.
- [ ] UI: galería por mascota; subir/renombrar/eliminar; filtros por tipo y orden por fecha; búsqueda por nombre/descr.
- [ ] Seguridad: validar acceso a archivos por dueño/mascota.

---

## Hito M2 — Salud y Bienestar (Historial + Recordatorios) (HU2.x)

### M2.1 Historial Clínico (HU2.1.x)

- [ ] Modelo y endpoints: crear/listar/leer entradas con atribución (profesional/negocio opcional) y tipo.
- [ ] Asociar archivos del Casillero a entradas; subir desde ficha de detalle.
- [ ] Filtros por tipo y rango de fechas; búsqueda por texto.
- [ ] UI: timeline inverso, ficha de detalle con fecha/hora, notas, indicaciones y archivos.
- [ ] Entradas rápidas: nota, medicamento, peso (con unidad) y foto opcional.
- [ ] Exportar PDF filtrable (rango/ tipo) y compartir.
- [ ] Gráficos básicos: evolución de peso y vacunas al día vs pendientes.

### M2.2 Recordatorios (HU2.2.x)

- [ ] Modelo y endpoints: crear/listar/actualizar completar.
- [ ] Preferencias de notificación por usuario: push/email/WhatsApp.
- [ ] Planificación: job scheduler (cron) para envíos; primero email (SES); luego push (FCM/OneSignal) y evaluar WhatsApp.
- [ ] UI: lista consolidada, filtros por mascota/tipo, orden por “próximo a vencer”.
- [ ] Configurar resúmenes (digest) diario/semanal (email/WhatsApp).

---

## Hito M3 — Tagger Alert (Dispositivos y Alertas) (HU3.x)

### M3.1 Dispositivos (HU3.1.x)

- [ ] Modelo y endpoints `devices`: tipos (QR, microchip), alias, estado, principal, reemplazo y transferencia intra-cuenta.
- [ ] Regla: microchip único por mascota con flujo de reemplazo conservando histórico.
- [ ] UI: listado por mascota con tipo/alias/estado/última lectura; set principal; activar/desactivar; marcar perdido.

### M3.2 Lecturas y alertas (HU3.2.x)

- [ ] Endpoint público de escaneo (QR): registrar `device_read` con geo aproximada.
- [ ] Notificación multicanal al dueño al escaneo (email primero; push/WhatsApp después).
- [ ] UI: historial de lecturas por mascota y por dispositivo, con mapa (Leaflet) y filtros por fecha/origen.
- [ ] Modo “Mascota Perdida”: activar/desactivar y exponer perfil público con caducidad opcional; privacidad por dispositivo.
- [ ] Cerrar alerta con motivo (recuperada/falso positivo).
- [ ] Consultas espaciales: filtrar lecturas por radio (p.ej., `ST_DWithin(location, :center, :radius)`) y agrupar por zona para mapas de calor.

---

## Hito M4 — Social y Aliados (HU4.x, HU5.x)

- [ ] Compartir perfil público de mascota (solo lectura) con alcance configurable.
- [ ] Listado de Aliados vinculados y gestión de solicitudes (aprobar/rechazar) por mascota.
- [ ] Revocar vínculo con Aliado por mascota.

---

## Hito M5 — Configuración, A11y, Seguridad y Datos (HU6.x, HU7.x, HU8.x)

### M5.1 Configuración (HU6.x)

- [ ] Tema Claro/Oscuro/Automático con persistencia por cuenta y recordatorio de sistema.
- [ ] Idioma y zona horaria; autodetección al primer uso; cambio manual con persistencia.
- [ ] Sesiones activas: listar y cerrar sesión remota.
- [ ] Descargar mis datos y eliminar cuenta (GDPR-like) con confirmaciones.

### M5.2 A11y e i18n (HU7.x)

- [ ] Lectores de pantalla: roles y labels, foco visible consistente.
- [ ] Tamaños de fuente del sistema y modo alto contraste.
- [ ] Preparar RTL (propiedades lógicas CSS, espejado donde aplique).

### M5.3 Seguridad y privacidad (HU8.x)

- [ ] Restablecer contraseña vía email (flujo proveedor auth elegido).
- [ ] Rate limiting y audit logs en endpoints sensibles (usar tablas `rate_limits` y `audit_logs`).

---

## Calidad y pruebas

- [ ] Lint + typecheck en CI (web y api) verdes.
- [ ] Pruebas unitarias backend (servicios y guards) y frontend (componentes y hooks críticos).
- [ ] Pruebas de integración de API (auth, pets, files, medical, reminders, devices).
- [ ] Smoke test e2e mínimos: registro → crear mascota → subir archivo → crear entrada clínica → crear recordatorio.

---

## Mapeo rápido HU → entregables

- HU1.1.x: auth básica + perfil (`/me`) + pantallas registro/login/perfil.
- HU1.2.x: CRUD pets + listado con buscar/filtrar/ordenar.
- HU1.3.x: Casillero con S3 (presigned) + filtros/orden/búsqueda.
- HU2.1.x: Historial con filtros, detalle, adjuntos, rápidas, export y gráficos.
- HU2.2.x: Recordatorios con preferencias y notificaciones (email→push→WhatsApp).
- HU3.1.x: Registro/gestión dispositivos con reglas de principal y microchip único.
- HU3.2.x: Alertas por escaneo, historial con mapa, modo perdido y privacidad.
- HU4.x: Compartir perfil público.
- HU5.x: Red de Aliados y gestión de vínculos.
- HU6.x: Config/tema/idioma/sesiones/datos.
- HU7.x: A11y+i18n/RTL.
- HU8.x: Seguridad básica (reset password).

---

## Notas de implementación

- Mobile-first: priorizar rendimiento e interacción táctil; escritorio como mejora progresiva.
- Tokens como única fuente de verdad visual. No hardcodear colores ni textos.
- Lógica compartida sin dependencias del DOM para futura reutilización en React Native.
