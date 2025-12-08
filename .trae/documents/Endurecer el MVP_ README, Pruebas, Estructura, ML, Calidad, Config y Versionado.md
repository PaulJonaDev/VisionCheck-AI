## README y Documentación
- Crear `README.md` en la raíz: objetivo (tamizaje no diagnóstico), alcance, features del MVP, requisitos, instalación, ejecución local (`npm run web`, `npm run ios/android`), build web (`expo export`), despliegue CI a Vercel, estructura de carpetas, disclaimers de seguridad/ética.
- Añadir enlaces a datasets y arquitectura técnica existente.

## Pruebas Automatizadas
- Instalar Jest + React Native Testing Library.
- Tests básicos:
  - Render de `App` y navegación sin errores.
  - `CaptureScreen`: muestra solicitud de permisos y botones.
  - Servicio `explanation`: genera hipótesis y recomendaciones.
  - Servicio `quality`: devuelve mensajes de guía.
- Configurar `npm test` y ejecutar en CI.

## Refactor de Estructura
- Confirmar y ordenar carpetas:
  - `VisionCheckAI/src/components` (UI reutilizable)
  - `VisionCheckAI/src/services` (quality, eyeDetection, explanation, futuro `ml/inference`)
  - `VisionCheckAI/src/config` (env y constantes)
  - `VisionCheckAI/src/app` (navegación y estado)
- Separar futuro backend (`server/`) como placeholder.

## Pipeline de Datos/ML
- Crear carpeta `ml/` en raíz con:
  - `data/` (vacía, no versionada – añadir `.gitkeep` y `.gitignore`)
  - `scripts/preprocess.py` (normalización, augmentaciones)
  - `train.py` (esqueleto con MobileNet/EfficientNet)
  - `README_ml.md` con pasos y métricas (no diagnóstico).

## Control de Calidad de Imagen (Frontend)
- Completar módulo con métricas reales:
  - Blur: varianza del Laplaciano (web: Canvas; móvil: estrategia compatible Expo).
  - Iluminación: luminancia y contraste local.
  - Encuadre: validar que los ojos estén dentro de los círculos guía (si `eyeBoxes`).
- Integrar feedback bloqueante antes de análisis y recaptura.

## Configuración y Secretos
- Añadir `.env.example` (variables como `VERCEL_TOKEN`, banderas de features).
- Actualizar `.gitignore` para `.env`, `ml/data/*`.
- `src/config/env.ts`: lectura segura con valores por defecto y no exponer secretos.
- Documentar en README qué no subir al repo (datos, secretos).

## Versionado y Changelog
- Añadir `CHANGELOG.md` con formato simple (fecha, cambios por área).
- Alinear commits a convención (feat/fix/chore/docs/test).
- Incluir paso de publicación en README (tag y release manual).

## CI/CD (Ajustes)
- Extender workflow para `npm test` y subir cobertura.
- Mantener build web y deploy Vercel (ya creado) con secretos.

¿Confirmas que implemente estos cambios ahora (creación de archivos, ajustes de código y CI)?