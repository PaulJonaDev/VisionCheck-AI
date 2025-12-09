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