export default function StatusBadge({ active }) {
  return <span className={`status-badge ${active ? 'active' : 'inactive'}`}><i />{active ? 'Activo' : 'Inactivo'}</span>;
}