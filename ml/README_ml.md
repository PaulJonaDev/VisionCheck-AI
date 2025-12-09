# Pipeline de Datos y Entrenamiento

## Datos
- Coloca datasets en `ml/data/` (no versionado).
- Estructura: `ml/data/raw/` y `ml/data/processed/`.

## Preprocesamiento
- Normalizar tamaño, color y aplicar augmentaciones.
- Script: `ml/preprocess/resize_normalize.py`.
 - Runner CLI: `python ml/cli/preprocess.py` (usa `train/config.json`).

## Entrenamiento
- MobileNet/EfficientNet para clasificación de patrones visibles.
- Configuración en `ml/train/config.json`.
- Entrenamiento en `ml/train/train_mobilenet.py`.
 - Runner CLI: `python ml/cli/train.py` (genera `models/mobilenet_v1/metadata.json` y placeholder `model.h5`).

## Inferencia
- Script: `ml/inference/predict.py` (ejemplo / stub).
- Modelos en `ml/models/mobilenet_v1/` (no versionar binarios grandes; usar `metadata.json`).

## Utils
- `ml/utils/augment.py`, `ml/utils/visualize.py`.

## Requisitos
- `ml/requirements.txt`.