# Infraestructura

## Objetivo
Estandarizar el entorno de desarrollo y despliegue: contenedores Docker, scripts de conveniencia y relación con CI/CD (Vercel).

## Estructura
- `docker/backend.Dockerfile`: imagen de API (Node + Express)
- `docker/frontend.Dockerfile`: build web de Expo y entrega con Nginx
- `docker/docker-compose.yml`: orquestación local
- `scripts/dev.sh`: levanta el stack local con Compose
- `scripts/seed.sh`: inserta datos de ejemplo en el backend
- `scripts/deploy.sh`: plantilla de despliegue (personalizable)

## Uso local
```bash
# Arrancar backend (Node 20) con Compose
bash infra/scripts/dev.sh
# Backend expuesto en 4000

# Frontend web (recomendado fuera de contenedor durante desarrollo)
cd frontend && npm install && npm run web

# Build web estático con Docker
docker build -f infra/docker/frontend.Dockerfile -t visioncheck-ai-web .
docker run --rm -p 8080:8080 visioncheck-ai-web
# Abrir: http://localhost:8080
```

## Variables de entorno
- Backend:
  - `PORT` (default `4000`)
  - `ML_SCRIPT_PATH`, `ML_MODEL_PATH`, `ML_TIMEOUT_MS`
  - `MAX_IMAGE_BYTES` (límite de imagen en bytes, default `6MB`)
- Frontend:
  - `EXPO_PUBLIC_BACKEND_URL` (default `http://localhost:4000`)
  - `EXPO_PUBLIC_FEATURE_EYE_GUIDE` (default `true`)

## CI/CD y Vercel
- CI construye y prueba backend y frontend, y publica el web en Vercel producción con `VERCEL_TOKEN`.
- Artefacto web: `frontend/dist` (generado por `npm run build:web`).
- Para vincular manualmente:
```bash
# Producción (desde CI):
vercel --token "$VERCEL_TOKEN" --prod --confirm frontend/dist
```

## Notas
- Expo dev server es más ágil fuera de contenedor; usar Docker solo para la entrega estática.
- Para entornos integrados, se puede extender `docker-compose.yml` con un contenedor de Nginx sirviendo `frontend/dist`.
