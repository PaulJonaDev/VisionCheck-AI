# VisionCheck AI

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

## Estructura
- `frontend/` aplicación (ubicada en `VisionCheckAI`).
- `backend/` API (placeholder).
- `ml/` pipeline de datos y entrenamiento.
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