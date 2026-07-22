import { useState } from 'react'
import DataTable from '../components/crud/DataTable'
import FormBuilder from '../components/crud/FormBuilder'
import DeleteConfirm from '../components/crud/DeleteConfirm'
import toast from 'react-hot-toast'
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin'

const columns = [
  { header: 'Judul Layanan', accessor: 'title' },
  { header: 'Slug', accessor: 'slug' },
  { header: 'Featured', accessor: 'is_featured', render: (item) => (
    item.is_featured ? '⭐ Ya' : 'Tidak'
  )},
  { header: 'Status', accessor: 'is_active', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {item.is_active ? 'Aktif' : 'Nonaktif'}
    </span>
  )},
]

const formFields = [
  { name: 'title', label: 'Nama Layanan', type: 'text', required: true, placeholder: 'Misal: EPC Engineering' },
  { name: 'slug', label: 'Slug URL', type: 'text', required: true, placeholder: 'misal: epc-engineering' },
  { name: 'short_description', label: 'Deskripsi Singkat', type: 'textarea', required: true },
  { name: 'full_description', label: 'Deskripsi Lengkap', type: 'textarea' },
  { name: 'icon', label: 'Icon (Lucide/React Icons)', type: 'text', placeholder: 'FaTools / FaBuilding / FaCog' },
  { name: 'image', label: 'URL Gambar', type: 'text', placeholder: 'https://...' },
  { name: 'order_index', label: 'Urutan Tampil', type: 'number', placeholder: '0' },
  { name: 'is_featured', label: 'Tampilkan di Beranda (Featured)', type: 'checkbox' },
  { name: 'is_active', label: 'Aktif', type: 'checkbox' },
]

export default function ServicesManager() {
  const { data, loading: fetching, insert, update, remove } = useSupabaseAdmin('services', { orderBy: 'order_index', ascending: true })
  
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setLoading(true)
    
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const payload = {
      ...formData,
      slug,
      order_index: formData.order_index ? parseInt(formData.order_index) : 0,
      is_featured: !!formData.is_featured,
      is_active: formData.is_active !== undefined ? !!formData.is_active : true,
      updated_at: new Date().toISOString(),
    }

    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload)
        if (error) throw error
        toast.success('Layanan berhasil diupdate')
      } else {
        const { error } = await insert(payload)
        if (error) throw error
        toast.success('Layanan berhasil ditambahkan')
      }
      setShowForm(false)
      setEditItem(null)
    } catch (err) {
      toast.error('Gagal menyimpan data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const { error } = await remove(deleteItem.id)
      if (error) throw error
      toast.success('Layanan berhasil dihapus')
    } catch (err) {
      toast.error('Gagal menghapus data: ' + err.message)
    } finally {
      setLoading(false)
      setDeleteItem(null)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Layanan</h1>
          <p className="text-slate-500 mt-1">Atur layanan EPC dan infrastruktur</p>
        </div>
        <button 
          onClick={() => { setEditItem(null); setShowForm(true) }} 
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Layanan
        </button>
      </div>

      {fetching && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat data dari database...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editItem ? 'Edit Layanan' : 'Tambah Layanan Baru'}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">Batal</button>
          </div>
          <FormBuilder fields={formFields} initialData={editItem} onSubmit={handleSubmit} loading={loading} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <DataTable columns={columns} data={data} onEdit={(item) => { setEditItem(item); setShowForm(true) }} onDelete={setDeleteItem} />
        </div>
      )}

      <DeleteConfirm isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} itemName={deleteItem?.title} loading={loading} />
    </div>
  )
}