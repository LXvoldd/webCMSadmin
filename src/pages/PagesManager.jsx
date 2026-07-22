import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Judul', accessor: 'title' },
  { header: 'Slug', accessor: 'slug' },
  { header: 'Status', accessor: 'status', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      {item.status}
    </span>
  )},
  { header: 'Update', accessor: 'updated_at', render: (item) => item.updated_at ? new Date(item.updated_at).toLocaleDateString('id-ID') : '-' },
];

const formFields = [
  { name: 'title', label: 'Judul Halaman', type: 'text', required: true, placeholder: 'Masukkan judul halaman' },
  { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'tentang-kami' },
  { name: 'status', label: 'Status', type: 'select', options: [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ]},
  { name: 'meta_description', label: 'Meta Description', type: 'textarea', placeholder: 'Deskripsi untuk SEO' },
  { name: 'meta_keywords', label: 'Meta Keywords', type: 'text', placeholder: 'kata kunci, dipisahkan, koma' },
];

export default function PagesManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('pages');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setActionLoading(true);
    const payload = { ...formData, status: formData.status || 'draft' };
    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload);
        if (error) throw error;
        toast.success('Halaman berhasil diupdate');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Halaman berhasil ditambahkan');
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      toast.error('Gagal menyimpan: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const { error } = await remove(deleteItem.id);
      if (error) throw error;
      toast.success('Halaman berhasil dihapus');
    } catch (err) {
      toast.error('Gagal menghapus: ' + err.message);
    } finally {
      setActionLoading(false);
      setDeleteItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Halaman</h1>
          <p className="text-slate-500 mt-1">Atur halaman website Anda</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Halaman
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat halaman...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Halaman' : 'Tambah Halaman Baru'}</h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">Batal</button>
          </div>
          <FormBuilder fields={formFields} initialData={editItem} onSubmit={handleSubmit} loading={actionLoading} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <DataTable columns={columns} data={data} onEdit={(item) => { setEditItem(item); setShowForm(true); }} onDelete={setDeleteItem} />
        </div>
      )}

      <DeleteConfirm
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        itemName={deleteItem?.title}
        loading={actionLoading}
      />
    </div>
  );
}