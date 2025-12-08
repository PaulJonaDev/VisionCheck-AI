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
- Configura secreto `VERCEL_TOKEN` en GitHub.

## Estructura
- `VisionCheckAI/src/screens` pantallas.
- `VisionCheckAI/src/ui` tema y componentes.
- `VisionCheckAI/src/services` explicación, calidad e identificación de ojos.
- `VisionCheckAI/src/state` Redux.
- `ml/` pipeline de datos y entrenamiento.

## Configuración
- `.env` no versionado. Ejemplo en `.env.example`.
- Variables públicas Expo: `EXPO_PUBLIC_*`.

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

## Licencia
- Uso con fines de tamizaje no clínico.