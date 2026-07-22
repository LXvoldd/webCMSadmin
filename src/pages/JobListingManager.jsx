import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Judul', accessor: 'title' },
  { header: 'Lokasi', accessor: 'location' },
  { header: 'Tipe', accessor: 'job_type' },
  { header: 'Aktif', accessor: 'is_active', render: (item) => (item.is_active ? '✅ Ya' : '❌ Tidak') },
];

const formFields = [
  { name: 'title', label: 'Judul Lowongan', type: 'text', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'location', label: 'Lokasi', type: 'text' },
  { name: 'job_type', label: 'Tipe Pekerjaan', type: 'text' },
  { name: 'salary', label: 'Gaji (optional)', type: 'text' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
];

export default function JobListingManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('job_listings');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setActionLoading(true);
    const payload = { ...formData, is_active: formData.is_active || false };
    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload);
        if (error) throw error;
        toast.success('Lowongan berhasil diupdate');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Lowongan berhasil ditambahkan');
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
      toast.success('Lowongan berhasil dihapus');
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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Lowongan Pekerjaan</h1>
          <p className="text-slate-500 mt-1">Tambah, ubah, atau hapus lowongan kerja.</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Lowongan
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat lowongan...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</h2>
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
