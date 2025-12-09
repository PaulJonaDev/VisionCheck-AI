API para sincronización opcional y panel profesional.

- `src/` código fuente
- `__tests__/` pruebas
- `.env` variables de entorno

Comandos:
```bash
cd backend
npm install
npm start
npm test
```

Próximos pasos:
- Endpoints de autenticación y carga de capturas.
- Almacenamiento seguro y reglas de acceso.

Estructura:
- `src/api/routes/*.routes.js`
- `src/api/controllers/*.controller.js`
- `src/services/*.service.js`
- `src/core/response.js`, `src/core/errorHandler.js`, `src/core/logger.js`
- `src/config/env.js`
- `src/app.js`, `src/index.js`

Integración ML:
- Servicio: `src/services/ml.service.js` ejecuta `python3 ml/inference/predict.py`.
- Contrato:
  - Entrada: `{ imageUri: string, modelPath?: string }`.
  - Salida: `{ enrojecimiento, opacidad, reflejo_irregular, inflamacion, fatiga, image?, model? }`.
  - Errores: `ML_SCRIPT_NOT_FOUND`, `ML_PROCESS_ERROR`, `ML_TIMEOUT`, `ML_OUTPUT_PARSE_ERROR`.
- Configuración por entorno (`src/config/env.js`):
  - `ML_SCRIPT_PATH` (ruta al script de inferencia).
  - `ML_MODEL_PATH` (ruta al modelo).
  - `ML_TIMEOUT_MS` (timeout de proceso).
