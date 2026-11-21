# TechStoreIS2

Aplicación web para la gestión de productos de una tienda. Cuenta con un Backend desarrollado en Python con FastAPI y un Frontend desarrollado con React y Vite.

## Tecnologías utilizadas

**Backend**
- Python
- FastAPI
- Uvicorn

**Frontend**
- React
- JavaScript
- Vite
- Axios

## Estructura del proyecto

TechStoreIS2/
├── Backend/
│   ├── 1. Requerimiento/
│   ├── 2. Arquitectura/
│   ├── 3. Diseño/
│   ├── 4. Desarrollo/
│   │   └── backend/
│   ├── 5. Pruebas/
│   └── 6. Despliegue/
├── Frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md

## Requisitos

- Python instalado.
- Node.js y npm instalados.

## Ejecución del proyecto

### 1. Backend

Abrir una terminal en la carpeta:

cd Backend\4. Desarrollo\backend

Instalar las dependencias:

python -m pip install fastapi uvicorn

Iniciar el servidor:

python main.py

La API estará disponible en:

- API: http://localhost:7000
- Documentación Swagger: http://localhost:7000/docs

### 2. Frontend

Abrir otra terminal desde la carpeta raíz del proyecto:

cd Frontend

Instalar las dependencias:

npm install

Iniciar la aplicación:

npm run dev

Abrir en el navegador la dirección que muestra Vite, normalmente:

http://localhost:5173

## Funcionalidades

- Consultar productos.
- Consultar productos por identificador.
- Registrar productos.
- Modificar productos.
- Eliminar productos.

Proyecto académico desarrollado para la asignatura IS2.
