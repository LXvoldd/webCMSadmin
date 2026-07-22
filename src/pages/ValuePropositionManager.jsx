import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Title', accessor: 'title' },
  { header: 'Description', accessor: 'description' },
  { header: 'Icon', accessor: 'icon' },
  { header: 'Order', accessor: 'order_index' },
  { header: 'Active', accessor: 'is_active', render: (item) => (item.is_active ? '✅ Ya' : '❌ Tidak') },
];

const formFields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'icon', label: 'Icon (name)', type: 'text' },
  { name: 'order_index', label: 'Order Index', type: 'number' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
];

export default function ValuePropositionManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('value_propositions');
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
        toast.success('Value proposition updated');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Value proposition added');
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
      toast.success('Value proposition deleted');
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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Value Propositions</h1>
          <p className="text-slate-500 mt-1">Atur nilai proposisi yang ditampilkan di halaman utama</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Value Prop
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Loading value propositions...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Value Proposition' : 'Tambah Value Proposition Baru'}</h2>
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
