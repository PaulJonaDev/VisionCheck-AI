# VisionCheck AI — Documento Maestro

## Objetivo
Tamizaje visual inteligente en móviles. Detecta patrones visibles y genera explicaciones y recomendaciones no diagnósticas.

## Alcance
- No diagnostica ni reemplaza profesionales.
- Señales: enrojecimiento, opacidad, reflejo irregular, posible inflamación y fatiga.

## Arquitectura (Monorepo)
- `frontend/` UI Expo RN (ubicada en `VisionCheckAI`).
- `backend/` API Express (rutas limpias, servicios, core, config).
- `ml/` pipeline profesional (datos, preprocesamiento, entrenamiento, inferencia, utils).
- `infra/` Dockerfiles, compose y scripts.
- `docs/` documentación.
- `tests/` pruebas globales.
- `data/` datasets locales (ignorados por git).

## Frontend
- Directorio: `VisionCheckAI`
- Comandos: `npm run web`, `npm run ios`, `npm run android`, `npm run build:web`
- Características:
  - Captura guiada y recorte automático de región de ojos.
  - Control de calidad: luminancia media y feedback.
  - Explicaciones y recomendaciones.
  - Historial local.
- Flags públicas: `EXPO_PUBLIC_FEATURE_EYE_GUIDE=true`

## Backend
- Directorio: `backend`
- Estructura:
  - `src/api/routes/*.routes.js`
  - `src/api/controllers/*.controller.js`
  - `src/services/*.service.js`
  - `src/core/response.js`, `src/core/errorHandler.js`, `src/core/logger.js`
  - `src/config/env.js`, `src/app.js`, `src/index.js`
- Endpoints:
  - `GET /health` → `{ ok: true }`
  - `POST /upload` → guarda captura en memoria
  - `POST /analysis` → devuelve análisis stub
  - `GET /analysis` → lista en memoria
- Comandos: `npm install`, `npm start`, `npm test`

## ML Pipeline
- Datos: `ml/data/raw/`, `ml/data/processed/` (no versionar datos reales)
- Preprocesamiento: `ml/preprocess/resize_normalize.py`
  - Runner: `python ml/cli/preprocess.py`
- Entrenamiento: `ml/train/train_mobilenet.py`, `ml/train/config.json`
  - Runner: `python ml/cli/train.py`
  - Salidas: `ml/models/mobilenet_v1/metadata.json`, `model.h5` (placeholder)
- Inferencia: `ml/inference/predict.py`
- Utils: `ml/utils/augment.py`, `ml/utils/visualize.py`
- Requisitos: `ml/requirements.txt`

## Infraestructura
- Dockerfiles:
  - `infra/docker/backend.Dockerfile` (Node 18, `PORT=3001`)
  - `infra/docker/frontend.Dockerfile` (build web → Nginx)
- Compose: `infra/docker/docker-compose.yml`
  - Servicios: `backend:3001`, `frontend:8080`
- Scripts:
  - `infra/scripts/dev.sh` levanta stack
  - `infra/scripts/seed.sh` inserta datos de ejemplo
  - `infra/scripts/deploy.sh` placeholder

## CI/CD
- Workflows: `.github/workflows/ci.yml`, `release.yml`
- CI: typecheck, tests, build web, artifact y deploy a Vercel.
- Secrets:
  - `VERCEL_TOKEN` obligatorio
  - `VERCEL_SCOPE` opcional (por defecto `PaulJonaDev`)
- Releases: crear tag `vX.Y.Z` → genera Release con `web-dist.zip`.

## Flujo Front → Back → ML
- Frontend: `CaptureScreen` toma foto y hace `POST /upload`.
- Backend `/upload`: valida imagen, guarda temporalmente, invoca ML `predict.py` y compone explicación.
- Backend `/analysis`: lista o recibe resultados para historial.
- Módulo ML: recibe imagen → `preprocess` → `modelo` → retorna predicciones.

## Pruebas
- Frontend: Jest + Testing Library (`VisionCheckAI/__tests__`)
- Backend: Jest + Supertest (`backend/__tests__`)
- Cobertura: subida como artifact en CI.

## Seguridad y Privacidad
- `.env` no versionado (`.env.example` de guía).
- No subir datos sensibles; `data/` y `ml/models/` ignorados.
- Resultados no diagnósticos.

## Cómo contribuir
- PRs pequeños y enfocados a `main`.
- Convención de commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- Añadir pruebas para cambios en lógica.

## Roadmap
- Detección de ojos on-device en iOS/Android.
- Modelo TFLite on-device y métricas de calidad completas.
- Persistencia real (SQLite/Postgres) y autenticación.
- Panel profesional y sincronización segura.
