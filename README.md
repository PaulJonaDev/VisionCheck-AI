# VisionCheck AI

Consulta el documento maestro en `docs/MASTER.md` para una visión completa del producto, arquitectura, comandos y CI/CD.

Tamizaje visual inteligente en dispositivos móviles. Detecta patrones y cambios oculares comunes sin realizar diagnósticos médicos.

## Alcance
- No diagnostica ni reemplaza profesionales. Detecta patrones: enrojecimiento, opacidad, reflejo irregular, posible inflamación y fatiga ocular.

## Características
- Captura guiada con círculos de alineación.
- Control de calidad básico: guía de iluminación/estabilidad; detección de ojos en web.
- Explicaciones en lenguaje claro, hipótesis no diagnósticas y recomendaciones.
- Historial local con comparaciones.

## Requisitos
- Node 20+, npm.
- Expo SDK 54.

## Instalación
```bash
cd VisionCheckAI
npm install
```

## Ejecución
- Web: `npm run web` → http://localhost:8081/
- iOS: `npm run ios`
- Android: `npm run android`

## Build Web
```bash
npm run build:web
# artefacto en VisionCheckAI/dist
```

## Despliegue CI
- GitHub Actions construye y despliega a Vercel.
- Configura secreto `VERCEL_TOKEN` en GitHub (Settings → Secrets → Actions).
- Opcional: `VERCEL_SCOPE` para publicar bajo tu cuenta/organización (por defecto `PaulJonaDev`).
- El proyecto se publica con nombre `visioncheck-ai`.

## Releases
- Los tags `v*` disparan el workflow de Release que:
  - Construye el web (`VisionCheckAI/dist`) y sube `web-dist.zip` como asset.
  - Crea el Release automáticamente usando el `GITHUB_TOKEN` del workflow.
- Para publicar una versión:
  - Actualiza `CHANGELOG.md`.
  - Crea el tag: `git tag -a vX.Y.Z -m "Notas" && git push --tags`.

## Estructura
- `frontend/` UI (por ahora ubicada en `VisionCheckAI`).
- `backend/` API Express (servidor básico `/health`, `/captures`).
- `ml/` pipeline de datos y entrenamiento.
- `data/` datasets (no versionados, ignorados por git).
- `tests/` pruebas globales y de integración.
- `VisionCheckAI/src/screens` pantallas.
- `VisionCheckAI/src/ui` tema y componentes.
- `VisionCheckAI/src/services` explicación, calidad e identificación de ojos.
- `VisionCheckAI/src/state` Redux.

## Configuración
- `.env` no versionado. Ejemplo en `.env.example`.
- Variables públicas Expo: `EXPO_PUBLIC_*`.
  - `EXPO_PUBLIC_FEATURE_EYE_GUIDE=true` activa la guía de alineación en build.

## Seguridad y Ética
- Resultados no diagnósticos.
- Imágenes locales por defecto.

## Pruebas
```bash
npm test
```

## Despliegue móvil (EAS)
- iOS/Android con `eas build` (requiere cuentas).

## Backend
- Arranque: `cd backend && npm install && npm start`
- Salud: `GET http://localhost:4000/health`

## Contenedores
- `docker-compose up -d` para levantar el backend en Node 20.
- El frontend Expo se recomienda ejecutarlo en host durante desarrollo.

## Datasets
- Ver `/.trae/documents/datasets_vision_ocular.md`.

## Qué falta / próximos pasos
- Modelo on-device (TFLite) y calidad de imagen completa (blur/iluminación/distancia).
- Backend para sincronización opcional y panel profesional.
- Pipeline ML con datos reales y validación.

## Cómo contribuir
- Haz fork y PR hacia `main` con cambios pequeños y enfocados.
- Usa commits tipo: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- Añade pruebas cuando afectes lógica.
- No subas datos ni secretos; usa `.env` y sigue `.env.example`.

## Licencia
- Uso con fines de tamizaje no clínico.
