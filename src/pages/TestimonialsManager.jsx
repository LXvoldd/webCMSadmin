import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Nama Klien', accessor: 'client_name' },
  { header: 'Perusahaan', accessor: 'company' },
  { header: 'Rating', accessor: 'rating', render: (item) => '⭐'.repeat(Number(item.rating) || 0) },
  { header: 'Featured', accessor: 'is_featured', render: (item) => item.is_featured ? '✅ Ya' : '❌ Tidak' },
];

const formFields = [
  { name: 'client_name', label: 'Nama Klien', type: 'text', required: true, placeholder: 'Budi Santoso' },
  { name: 'company', label: 'Perusahaan', type: 'text', placeholder: 'PT Maju Jaya' },
  { name: 'position', label: 'Jabatan', type: 'text', placeholder: 'CEO' },
  { name: 'content', label: 'Testimoni', type: 'textarea', required: true, placeholder: 'Tulis testimoni...' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'photo_url', label: 'URL Foto Klien', type: 'text' },
  { name: 'is_featured', label: 'Tampilkan di Home', type: 'checkbox' },
];

export default function TestimonialsManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('testimonials');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setActionLoading(true);
    const payload = {
      ...formData,
      rating: formData.rating ? parseInt(formData.rating) : 5,
      is_featured: formData.is_featured || false,
    };
    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload);
        if (error) throw error;
        toast.success('Testimoni berhasil diupdate');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Testimoni berhasil ditambahkan');
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
      toast.success('Testimoni berhasil dihapus');
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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Testimoni</h1>
          <p className="text-slate-500 mt-1">Atur testimoni dari klien perusahaan</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Testimoni
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat testimoni...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</h2>
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
        itemName={deleteItem?.client_name}
        loading={actionLoading}
      />
    </div>
  );
}