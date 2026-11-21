import { Eye, Pencil, Trash2, Package } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function ProductTable({ products, onView, onEdit, onDelete }) {
  if (!products.length) return (
    <div className="empty-state"><Package size={34} /><h3>No hay productos registrados</h3>
      <p>Registra un producto para que aparezca en este listado.</p></div>
  );

  return <div className="table-scroll"><table>
    <thead><tr><th>PRODUCTO</th><th>CATEGORÍA</th><th>PRECIO</th><th>CANTIDAD</th><th>ESTADO</th><th>ACCIONES</th></tr></thead>
    <tbody>{products.map((product) => <tr key={product.id}>
      <td><div className="product-cell"><span className="product-icon"><Package size={18} /></span>
        <span><strong>{product.nombre}</strong><small>ID #{product.id}</small></span></div></td>
      <td><span className="category-tag">{product.categoria}</span></td>
      <td className="price-cell">{currency.format(Number(product.precio) || 0)}</td>
      <td>{product.cantidad}</td><td><StatusBadge active={product.estado} /></td>
      <td><div className="row-actions">
        <button className="table-action" title="Consultar" onClick={() => onView(product)}><Eye size={17} /></button>
        <button className="table-action" title="Editar" onClick={() => onEdit(product)}><Pencil size={16} /></button>
        <button className="table-action danger" title="Eliminar" onClick={() => onDelete(product)}><Trash2 size={16} /></button>
      </div></td>
    </tr>)}</tbody>
  </table></div>;
}