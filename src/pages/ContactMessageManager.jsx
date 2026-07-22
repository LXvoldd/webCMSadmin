import { useState } from 'react';
import DataTable from '../components/crud/DataTable';
import DeleteConfirm from '../components/crud/DeleteConfirm';
import toast from 'react-hot-toast';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';

const columns = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Subjek', accessor: 'subject' },
  { header: 'Pesan', accessor: 'message', render: (item) => item.message?.slice(0, 30) + (item.message?.length > 30 ? '…' : '') },
  { header: 'Dibuat', accessor: 'created_at', render: (item) => new Date(item.created_at).toLocaleString('id-ID') },
];

export default function ContactMessageManager() {
  const { data, loading, remove } = useSupabaseAdmin('contact_messages');
  const [deleteItem, setDeleteItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const { error } = await remove(deleteItem.id);
      if (error) throw error;
      toast.success('Pesan berhasil dihapus');
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
        <h1 className="text-2xl font-bold text-slate-900">Inbox Pesan Kontak</h1>
        <p className="text-slate-500 mt-1">Kelola pesan yang dikirim melalui formulir kontak</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat pesan...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <DataTable columns={columns} data={data} onDelete={setDeleteItem} />
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
