import { X, Tag, DollarSign, Layers, Package } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function ProductDetails({ product, onClose }) {
  if (!product) return null;
  return <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true">
      <header className="modal-header"><div><span className="eyebrow">DETALLE · PRODUCTO #{product.id}</span><h2>{product.nombre}</h2></div>
        <button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={20} /></button></header>
      <p className="detail-description">{product.descripcion}</p>
      <div className="detail-grid">
        <div><Tag /><span>Categoría</span><strong>{product.categoria}</strong></div>
        <div><DollarSign /><span>Precio</span><strong>{currency.format(Number(product.precio) || 0)}</strong></div>
        <div><Layers /><span>Cantidad</span><strong>{product.cantidad}</strong></div>
        <div><Package /><span>Estado</span><strong><StatusBadge active={product.estado} /></strong></div>
      </div>
      <footer className="modal-actions"><button className="button button-primary" onClick={onClose}>Cerrar</button></footer>
    </section>
  </div>;
}