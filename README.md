# VisionCheck AI

Tamizaje visual inteligente en dispositivos móviles. Detecta patrones y cambios oculares comunes sin realizar diagnósticos médicos.

Consulta el documento maestro `docs/MASTER.md` y el overview `docs/OVERVIEW.md` para más contexto.

## Arquitectura del Monorepo
- `VisionCheckAI/` frontend (Expo React Native)
- `backend/` API (Node + Express)
- `ml/` módulo de ML (Python + TensorFlow/Keras)
- `infra/` Dockerfiles, compose y scripts
- `docs/` documentación central y temática

```mermaid
flowchart LR
  A[Frontend (Expo)] -- POST /upload --> B[Backend (Express)]
  B -- spawn python --> C[ML predict.py]
  C -- JSON preds --> B
  B -- explanation + item --> A
```

## Backend: cómo correr
```bash
cd backend
npm install
npm start
# Salud: GET http://localhost:4000/health
```

## Frontend: cómo correr
```bash
cd visioncheck-frontend
npm install
npm run web
# iOS: npm run ios  |  Android: npm run android
```

## ML: cómo correr
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r ml/requirements.txt
python ml/inference/predict.py <ruta_imagen> <ruta_modelo>
# ejemplo: python ml/inference/predict.py sample.jpg ml/models/mobilenet_v1/model.h5
```

## Variables de Entorno
- Backend (`backend/src/config/env.js`):
  - `PORT` (default `4000`)
  - `ML_SCRIPT_PATH` (default `ml/inference/predict.py` relativo al repo)
  - `ML_MODEL_PATH` (default `ml/models/mobilenet_v1/model.h5`)
  - `ML_TIMEOUT_MS` (default `5000`)
- Frontend (`visioncheck-frontend/src/config/env.ts`):
  - `EXPO_PUBLIC_BACKEND_URL` (default `http://localhost:4000`)
  - `EXPO_PUBLIC_FEATURE_EYE_GUIDE` (default `true`)

## Desarrollo con contenedores
```bash
bash infra/scripts/dev.sh
# Backend en 3001, Frontend web en 8080 (exportado por Nginx)
```

## Pruebas
- Backend integración:
```bash
cd backend
npm test
```
-- Frontend (si aplica):
```bash
cd visioncheck-frontend
npm test
```

## Despliegue CI
- Requiere secretos en GitHub Actions:
  - `VERCEL_TOKEN` obligatorio
  - `VERCEL_SCOPE` opcional (default `PaulJonaDev`)
- El build web se publica como `visioncheck-ai` en Vercel.

## Contribuir
- PRs pequeños y enfocados hacia `main`.
- Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- No subir datos ni secretos; usar `.env` y seguir `.env.example`.
