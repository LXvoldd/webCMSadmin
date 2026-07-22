import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import FormBuilder from '../components/crud/FormBuilder';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Title', accessor: 'title' },
  { header: 'Subtitle', accessor: 'subtitle' },
  { header: 'Button Text', accessor: 'button_text' },
  { header: 'Active', accessor: 'is_active', render: (item) => (item.is_active ? '✅ Ya' : '❌ Tidak') },
];

const formFields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'subtitle', label: 'Subtitle', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'button_text', label: 'Button Text', type: 'text' },
  { name: 'button_link', label: 'Button Link', type: 'text' },
  { name: 'secondary_button_text', label: 'Secondary Button Text', type: 'text' },
  { name: 'secondary_button_link', label: 'Secondary Button Link', type: 'text' },
  { name: 'background_image', label: 'Background Image URL', type: 'text' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
];

export default function HeroManager() {
  const { data, loading, insert, update, remove } = useSupabaseAdmin('hero_sections');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleSubmit = async (formData) => {
    setLoadingAction(true);
    const payload = { ...formData, is_active: formData.is_active || false };
    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload);
        if (error) throw error;
        toast.success('Hero section updated');
      } else {
        const { error } = await insert(payload);
        if (error) throw error;
        toast.success('Hero section added');
      }
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      toast.error('Failed to save: ' + err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    setLoadingAction(true);
    try {
      const { error } = await remove(deleteItem.id);
      if (error) throw error;
      toast.success('Hero section deleted');
    } catch (err) {
      toast.error('Failed to delete: ' + err.message);
    } finally {
      setLoadingAction(false);
      setDeleteItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Hero Sections</h1>
          <p className="text-slate-500 mt-1">Atur konten hero pada homepage</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Hero
        </button>
      </div>

      {loading && !showForm ? (
        <div className="text-center py-12 text-slate-500">Loading hero sections...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{editItem ? 'Edit Hero' : 'Tambah Hero Baru'}</h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">Batal</button>
          </div>
          <FormBuilder fields={formFields} initialData={editItem} onSubmit={handleSubmit} loading={loadingAction} />
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
        loading={loadingAction}
      />
    </div>
  );
}
