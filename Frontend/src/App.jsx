import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, AlertCircle, Boxes, CheckCircle2, Plus, RefreshCw, Search, Wifi, WifiOff, Cpu } from 'lucide-react';
import ProductTable from './components/ProductTable.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import { productoService } from './services/productoService.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const notify = (type, message) => {
    setNotice({ type, message });
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setNotice(null), 4500);
  };

  const checkApi = useCallback(async () => {
    try {
      await productoService.comprobarApi();
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productoService.obtenerTodos();
      setProducts(data);
      setApiOnline(true);
    } catch (error) {
      setApiOnline(false);
      notify('error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkApi();
    loadProducts();
  }, [checkApi, loadProducts]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.nombre, product.descripcion, product.categoria, String(product.id)]
        .some((value) => String(value ?? '').toLowerCase().includes(term))
    );
  }, [products, search]);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (product) => { setEditing(product); setFormOpen(true); };

  const saveProduct = async (payload) => {
    setSaving(true);
    try {
      if (editing) {
        await productoService.actualizar(editing.id, payload);
        notify('success', 'Producto modificado correctamente.');
      } else {
        await productoService.crear(payload);
        notify('success', 'Producto registrado correctamente.');
      }
      setFormOpen(false);
      setEditing(null);
      await loadProducts();
    } catch (error) {
      notify('error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${product.nombre}"?`)) return;
    try {
      await productoService.eliminar(product.id);
      notify('success', 'Producto eliminado correctamente.');
      await loadProducts();
    } catch (error) {
      notify('error', error.message);
    }
  };

  const viewProduct = async (product) => {
    try {
      const detail = await productoService.obtenerUno(product.id);
      setSelected(detail);
    } catch (error) {
      notify('error', error.message);
    }
  };

  const activeCount = products.filter((product) => product.estado).length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-logo"><Cpu size={22} /></span>
          <span><b>TechStore</b><small>IS2 · Administración</small></span></div>
        <p className="nav-caption">MENÚ PRINCIPAL</p>
        <div className="nav-link active"><Activity size={18} /> Panel de productos</div>
        <div className="sidebar-note"><span className={`connection-dot ${apiOnline ? 'online' : 'offline'}`} />API REST · FastAPI</div>
        <div className="sidebar-footer">Proyecto académico<br /><b>TechStoreIS2</b></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><span className="breadcrumb">TechStoreIS2 <span>/</span> Productos</span><h1>Gestión de productos</h1></div>
          <div className={`api-status ${apiOnline ? 'connected' : 'disconnected'}`}>
            {apiOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            {apiOnline ? 'API conectada' : 'API desconectada'}
          </div>
        </header>

        {notice && <div className={`toast ${notice.type}`}>
          {notice.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{notice.message}</span><button onClick={() => setNotice(null)} aria-label="Cerrar">×</button>
        </div>}

        <section className="welcome-row">
          <div><span className="eyebrow">RESUMEN GENERAL</span><h2>Tu inventario tecnológico</h2>
            <p>Consulta y administra los productos registrados en la API.</p></div>
          <button className="button button-primary" onClick={openCreate}><Plus size={18} /> Nuevo producto</button>
        </section>

        <section className="stats-grid">
          <article className="stat-card"><span className="stat-icon blue"><Boxes size={20} /></span><div><small>Total de productos</small><strong>{products.length}</strong></div></article>
          <article className="stat-card"><span className="stat-icon green"><CheckCircle2 size={20} /></span><div><small>Productos activos</small><strong>{activeCount}</strong></div></article>
          <article className="stat-card"><span className="stat-icon violet"><Activity size={20} /></span><div><small>Productos inactivos</small><strong>{products.length - activeCount}</strong></div></article>
        </section>

        <section className="content-card">
          <div className="section-heading"><div><h2>Productos registrados</h2><p>Información consultada directamente desde FastAPI.</p></div>
            <button className="button button-outline" onClick={loadProducts} disabled={loading}><RefreshCw size={16} className={loading ? 'spin' : ''} /> Actualizar</button></div>
          <div className="toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre, categoría o ID..." /></div>
            <span className="result-count">{filteredProducts.length} resultado(s)</span></div>
          {loading ? <div className="loading-state"><span className="spinner" />Consultando productos...</div> :
            <ProductTable products={filteredProducts} onView={viewProduct} onEdit={openEdit} onDelete={deleteProduct} />}
        </section>
        <footer className="page-footer">TechStoreIS2 · Frontend React conectado a API REST FastAPI</footer>
      </main>

      {formOpen && <ProductForm product={editing} onClose={() => { setFormOpen(false); setEditing(null); }} onSave={saveProduct} saving={saving} />}
      {selected && <ProductDetails product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}