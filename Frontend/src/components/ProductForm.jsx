import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyForm = { nombre: '', descripcion: '', categoria: '', precio: '', cantidad: '', estado: true };

export default function ProductForm({ product, onClose, onSave, saving }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(product ? {
      nombre: product.nombre ?? '',
      descripcion: product.descripcion ?? '',
      categoria: product.categoria ?? '',
      precio: String(product.precio ?? ''),
      cantidad: String(product.cantidad ?? ''),
      estado: Boolean(product.estado),
    } : emptyForm);
    setError('');
  }, [product]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const precio = Number(form.precio);
    const cantidad = Number(form.cantidad);
    if (!form.nombre.trim() || !form.descripcion.trim() || !form.categoria.trim()) {
      setError('Completa nombre, descripción y categoría.'); return;
    }
    if (!Number.isFinite(precio) || precio < 0) {
      setError('Ingresa un precio válido mayor o igual a cero.'); return;
    }
    if (!Number.isInteger(cantidad) || cantidad < 0) {
      setError('La cantidad debe ser un entero mayor o igual a cero.'); return;
    }
    setError('');
    await onSave({
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria.trim(),
      precio,
      cantidad,
      estado: Boolean(form.estado),
    });
  };

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title">
        <header className="modal-header">
          <div><span className="eyebrow">{product ? 'ACTUALIZAR REGISTRO' : 'NUEVO REGISTRO'}</span>
            <h2 id="product-form-title">{product ? 'Modificar producto' : 'Registrar producto'}</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
        </header>
        <form className="product-form" onSubmit={handleSubmit}>
          <label>Nombre del producto<input name="nombre" value={form.nombre} onChange={handleChange} required maxLength="120" placeholder="Ej. Laptop Lenovo" /></label>
          <label>Descripción<textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows="3" placeholder="Características del producto" /></label>
          <div className="form-grid">
            <label>Categoría<input name="categoria" value={form.categoria} onChange={handleChange} required placeholder="Ej. Computadores" /></label>
            <label>Precio (COP)<input name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={handleChange} required /></label>
            <label>Cantidad<input name="cantidad" type="number" min="0" step="1" value={form.cantidad} onChange={handleChange} required /></label>
            <label className="checkbox-label"><input name="estado" type="checkbox" checked={form.estado} onChange={handleChange} /> Producto activo</label>
          </div>
          {error && <p className="form-error">{error}</p>}
          <footer className="modal-actions">
            <button type="button" className="button button-light" onClick={onClose}>Cancelar</button>
            <button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Guardando...' : product ? 'Guardar cambios' : 'Registrar producto'}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}