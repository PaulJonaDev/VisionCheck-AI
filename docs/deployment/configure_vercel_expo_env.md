## Objetivo
Habilitar deploy automático a Vercel con nombre/scope definidos y añadir variables de entorno públicas para features en build.

## Acciones necesarias del usuario (no editables desde repo)
- Añadir secreto `VERCEL_TOKEN` en GitHub: Settings → Secrets → Actions → New secret.
- (Opcional) Añadir secreto `VERCEL_SCOPE` con tu cuenta/organización: `PaulJonaDev`.

## Cambios que implementaré
- Actualizar el paso de deploy en `.github/workflows/ci.yml` para:
  - Forzar nombre del proyecto Vercel: `visioncheck-ai`.
  - Definir scope: usar `VERCEL_SCOPE` si existe; fallback `PaulJonaDev`.
- Añadir `EXPO_PUBLIC_FEATURE_EYE_GUIDE=true` en el entorno del paso de build.
- Documentar en `README.md` los secretos requeridos y el comportamiento de las variables públicas.

## Resultado
- Los builds web se generan con flags públicas de Expo.
- El deploy a Vercel publica bajo tu cuenta `PaulJonaDev` y nombre `visioncheck-ai`.

¿Confirmas que proceda con estas modificaciones del workflow y documentación?
