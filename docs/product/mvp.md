## Alcance y Hallazgos
- No diagnostica; detecta 3–5 patrones: `enrojecimiento`, `opacidad`, `reflejo irregular`, `posible inflamación`, `fatiga ocular`.
- Resultados en probabilidades por patrón y severidad baja/media/alta.

## Datasets y Legal
- Usar el documento listo: `/Users/jonathanpaul/VisionCheck-AI/.trae/documents/datasets_vision_ocular.md` para selección inicial.
- Combinar datasets que cubran ojos sanos, signos comunes, variaciones de iluminación y videos cortos de movimientos.
- Registrar licencias y restricciones de uso; mantener trazabilidad de fuentes y citaciones.

## Preparación de Datos
- Normalizar tamaño (p. ej. 224x224) y color (RGB, estandarizar canal).
- Aumentos: blur gaussiano leve, cambios de luz (gamma/brightness), rotaciones ±10°, flips controlados.
- Split estratificado: `train/val/test` (70/15/15) por patrón.
- Etiquetado: “patrones visibles” y severidad; evitar etiquetas de patologías.

## Entrenamiento del Modelo
- Modelo base: MobileNetV3-Small o EfficientNet-B0 (priorizar MobileNetV3 por rendimiento móvil).
- Framework: TensorFlow/Keras.
- Head multi-salida por patrón con clasificación 3 clases (baja/media/alta) + confidencia.
- Hiperparámetros: batch 64, lr 1e-3 con cos-decay, early stopping, class weights.
- Métricas: precisión, recall, F1 por patrón; matriz de confusión.
- Exportación: TFLite con cuantización int8 (post-training o QAT).

## Inferencia en Móvil
- Librería: TensorFlow Lite (RN bridge).
- Preprocesamiento en dispositivo: resize, normalización.
- Salidas: confidencias por patrón y severidad; umbralización configurable.
- Rendimiento objetivo: <2s por inferencia, modelo <50MB.

## Control de Calidad de Imagen
- Blur: varianza del Laplaciano; umbral para recaptura.
- Iluminación: promedio de luminancia y contraste local.
- Distancia: tamaño relativo de cara/ojos usando `MediaPipe Face/Eye` o `vision-camera` + modelo liviano.
- Feedback en tiempo real: “Acerca el celular”, “Mejor luz”, “No te muevas”.

## Motor Explicativo
- Regla determinística sobre probabilidades: textos tipo “Probabilidad de enrojecimiento: X%”.
- Plantillas con lenguaje claro y disclaimer obligatorio: “No es un diagnóstico”.
- Localización y severidad reflejadas en el texto cuando disponible.

## Historial y Comparación Temporal
- Almacenamiento local cifrado: SQLite + paths de imágenes en filesystem.
- Guardar: fecha, calidad, resultados del modelo.
- Comparaciones semana a semana: deltas de probabilidades por patrón y gráficas simples.

## Interfaz de Usuario
- Pantallas: Captura guiada, Resultado, Recomendaciones no clínicas, Historial.
- Cámara: `react-native-vision-camera` con overlay de guía.
- Estado: Redux Toolkit (+ RTK Query si se añade sync opcional).
- Accesibilidad: textos claros, alto contraste, guías auditivas opcionales.

## Panel Profesional (Opcional)
- Lista de capturas y patrones detectados.
- Vista detalle con imagen, heatmaps (si se añaden), y comentarios del profesional.
- Sync opcional con Supabase (Auth + Storage) bajo consentimiento.

## Validación
- Pruebas con usuarios: tasa de recaptura, tiempos de flujo.
- Métricas: falsos positivos/negativos por patrón en `test`.
- Ajuste de umbrales y UX según hallazgos antes de cualquier piloto.

## Seguridad y Ética
- Disclaimers en onboarding y en resultados; nunca sugerir diagnósticos.
- Cifrado de imágenes (AES-256) y datos locales; sin envío sin consentimiento.
- Controles parentales y no uso en menores; cumplimiento GDPR/privacidad.

## Entregables del MVP
- App RN funcional (iOS/Android) con captura guiada y control de calidad.
- Modelo TFLite integrado para los 3–5 patrones con explicaciones claras.
- Historial local con comparación semanal y visualización de tendencias.
- Suite básica de pruebas y reporte de métricas (precisión/recall por patrón).

¿Confirmas este plan para comenzar con la implementación del MVP (app, modelo y calidad de imagen)?
