# TechStoreIS2 - Frontend

Frontend desarrollado con React + Vite para consumir la API existente de TechStoreIS2 (FastAPI).

## Requisitos
- Node.js 18 o superior.
- npm.
- Backend FastAPI ejecutándose en `http://localhost:7000`.

## Instalación y ejecución
Abre una terminal en esta carpeta (`frontend`) y ejecuta:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para generar y revisar la compilación de producción:

```bash
npm run build
npm run preview
```

## Configuración de la API
La URL base predeterminada es `http://localhost:7000`. Para cambiarla, copia `.env.example` como `.env`, modifica `VITE_API_URL` y reinicia Vite.

Swagger: `http://localhost:7000/docs`.

## CORS
Si el navegador muestra un error CORS, agrega en `presentation/webapitechstore.py`, después de crear `app` y antes de las rutas:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Reinicia FastAPI después de realizar el cambio.

## Endpoints consumidos
- `GET /` - comprobar estado de la API.
- `GET /api/productos` - consultar todos.
- `GET /api/productos/{id_producto}` - consultar uno.
- `POST /api/productos` - registrar.
- `PUT /api/productos/{id_producto}` - modificar.
- `DELETE /api/productos/{id_producto}` - eliminar.

## Consideración sobre los datos
El Backend actual almacena los productos en una lista en memoria. Los datos se pierden al reiniciar FastAPI. Este frontend no agrega base de datos ni almacenamiento alternativo.
