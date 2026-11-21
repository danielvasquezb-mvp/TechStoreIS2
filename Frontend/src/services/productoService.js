import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

function readableError(error) {
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;
    return typeof detail === 'string' ? detail : 'La API rechazó la solicitud. Verifica los datos enviados.';
  }
  if (error.code === 'ECONNABORTED') return 'La solicitud tardó demasiado. Intenta nuevamente.';
  if (!error.response) return 'No fue posible conectar con la API. Verifica que FastAPI esté activo y que CORS esté configurado.';
  return `La API respondió con el estado HTTP ${error.response.status}.`;
}

async function execute(request) {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    throw new Error(readableError(error));
  }
}

export const productoService = {
  comprobarApi: () => execute(() => api.get('/')),
  obtenerTodos: async () => {
    const data = await execute(() => api.get('/api/productos'));
    return Array.isArray(data?.payload) ? data.payload : [];
  },
  obtenerUno: async (id) => {
    const data = await execute(() => api.get(`/api/productos/${encodeURIComponent(id)}`));
    if (!data?.payload) throw new Error(data?.mensaje || 'Producto no encontrado.');
    return data.payload;
  },
  crear: async (producto) => {
    const data = await execute(() => api.post('/api/productos', producto));
    if (!data?.payload) throw new Error(data?.mensaje || 'No se pudo registrar el producto.');
    return data.payload;
  },
  actualizar: async (id, producto) => {
    const data = await execute(() => api.put(`/api/productos/${encodeURIComponent(id)}`, producto));
    if (!data?.payload) throw new Error(data?.mensaje || 'No se pudo modificar el producto.');
    return data.payload;
  },
  eliminar: async (id) => {
    const data = await execute(() => api.delete(`/api/productos/${encodeURIComponent(id)}`));
    if (!data?.payload) throw new Error(data?.mensaje || 'No se pudo eliminar el producto.');
    return data.payload;
  },
};