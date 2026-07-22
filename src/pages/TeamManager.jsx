import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Jabatan', accessor: 'position' },
  { header: 'Management', accessor: 'is_management', render: (item) => item.is_management ? '✅ Ya' : '❌ Tidak' },
  { header: 'Status', accessor: 'is_active', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {item.is_active ? 'Aktif' : 'Nonaktif'}
    </span>
  )},
];

const formFields = [
  { name: 'name', label: 'Nama Lengkap', type: 'text', required: true, placeholder: 'John Doe' },
  { name: 'position', label: 'Jabatan', type: 'text', required: true, placeholder: 'CEO & Founder' },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Deskripsi singkat...' },
  { name: 'email', label: 'Email', type: 'text', placeholder: 'john@company.com' },
  { name: 'photo_url', label: 'URL Foto', type: 'text', placeholder: 'https://...' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'text', placeholder: 'https://linkedin.com/in/...' },
  { name: 'order_index', label: 'Urutan', type: 'number' },
  { name: 'is_management', label: 'Tim Manajemen', type: 'checkbox' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
];

export default function TeamManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('team_members');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setActionLoading(true);
    const payload = {
      ...formData,
      is_management: formData.is_management || false,
      is_active: formData.is_active !== undefined ? formData.is_active : true,
    };
    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload);
        if (error) throw error;
        toast.success('Anggota tim berhasil diupdate');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Anggota tim berhasil ditambahkan');
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
      toast.success('Anggota tim berhasil dihapus');
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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Tim</h1>
          <p className="text-slate-500 mt-1">Atur anggota tim dan manajemen perusahaan</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Anggota
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat data tim...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Anggota Tim' : 'Tambah Anggota Baru'}</h2>
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
        itemName={deleteItem?.name}
        loading={actionLoading}
      />
    </div>
  );
}