# Changelog

## [0.1.0] - MVP inicial
- App Expo con captura guiada y navegación.
- Motor explicativo con hipótesis y recomendaciones.
- Historial local.
- CI: typecheck y build web + deploy Vercel.

## [0.2.0] - 2025-12-08
- Frontend: recorte automático de región de ojos en captura; guía visual mejorada.
- Monorepo: estructura clara con `frontend/`, `backend/`, `ml/`, `docs/`.
- ML: plantilla de pipeline con `data/`, `preprocess/`, `train/`, `models/`, `inference/`.
- Calidad de imagen: cálculo de luminancia y feedback en captura web.
- Tests: Jest + Testing Library; cobertura publicada en CI.
- CI/CD: ajustes de instalación, deploy automático a Vercel, corrección de ESM en Jest.
- Docs: README ampliado y documentación en `docs/`.