import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Nama Client', accessor: 'name' },
  { header: 'Website', accessor: 'website' },
  { header: 'Aktif', accessor: 'is_active', render: (item) => (item.is_active ? '✅ Ya' : '❌ Tidak') },
];

const formFields = [
  { name: 'name', label: 'Nama Client', type: 'text', required: true },
  { name: 'logo_url', label: 'URL Logo', type: 'text' },
  { name: 'website', label: 'Website', type: 'text' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
];

export default function ClientsManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('clients');
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
        toast.success('Client updated');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Client added');
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      toast.error('Failed to save: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const { error } = await remove(deleteItem.id);
      if (error) throw error;
      toast.success('Client deleted');
    } catch (err) {
      toast.error('Failed to delete: ' + err.message);
    } finally {
      setActionLoading(false);
      setDeleteItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Clients / Partners</h1>
          <p className="text-slate-500 mt-1">Tambah, edit, atau hapus data client/partner.</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Client
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Loading clients...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Client' : 'Tambah Client Baru'}</h2>
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
