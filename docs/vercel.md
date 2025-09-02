# Despliegue en Vercel (apps/web)

Esta guía conecta el proyecto a Vercel con previews por PR y producción en `main`.

## Requisitos

- Permisos para conectar el repo de GitHub a Vercel.
- Cuenta en Vercel (gratuita) y acceso a `DisruptivoLab/tagger-pet`.

## Pasos (UI de Vercel)

1. Importar el repositorio
   - Ir a https://vercel.com/new
   - Elegir “Import Git Repository” y seleccionar `DisruptivoLab/tagger-pet`.
2. Configurar proyecto (monorepo)
   - Root Directory: `apps/web`
   - Framework Preset: Next.js (auto)
   - Install Command: `npm ci`
   - Build Command: dejar vacío (auto) o `next build`
   - Output Directory: `.next`
   - Node: predeterminado (>= 18)
3. Asignar ramas
   - Production Branch: `main`
   - Preview Deployments: habilitados para todas las PRs
4. Variables de entorno (opcional por ahora)
   - No requeridas para la home actual.
   - Añadir cuando se integre API/auth.
5. Deploy
   - Click “Deploy”. La URL de producción quedará asociada a `main`.

## Pasos (CLI opcional en PowerShell)

- Autenticarse: `vercel login`
- Vincular proyecto a `apps/web`: `vercel link --cwd apps/web`
- Desplegar preview manual: `vercel --cwd apps/web`
- Promover a prod: `vercel --prod --cwd apps/web`

## Buenas prácticas

- Activar Remote Caching de Turborepo (opcional) si builds multi-paquete crecen.
- Configurar dominios personalizados cuando estén disponibles.

## Troubleshooting

- Si el build falla buscando `packages/shared`, publique ese paquete o consuma sólo lo compilado.
- Si hay errores de i18n por rutas, confirme `apps/web/i18n/request.ts` y que `messages/*.json` esté en la raíz.

### El repositorio no aparece en la lista de Import

1. En la pantalla de Import, haz clic en “Adjust GitHub App Permissions”.
2. En GitHub, elige la organización correcta (DisruptivoLab).
3. En “Repository access”, selecciona:
   - “All repositories” o
   - “Only select repositories” y marca `tagger-pet`.
4. Guarda los cambios y vuelve a Vercel; recarga la página o usa el buscador.
5. Verifica el menú de la izquierda: Team/Scope debe ser la organización correcta.
6. Si aún no aparece, reinstala la integración desde Vercel → Integrations → GitHub (o desde GitHub → Settings → Applications → Vercel) y repite los pasos.
