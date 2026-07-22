import { useState } from 'react'
import DataTable from '../components/crud/DataTable'
import FormBuilder from '../components/crud/FormBuilder'
import DeleteConfirm from '../components/crud/DeleteConfirm'
import toast from 'react-hot-toast'
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin'

const columns = [
  { header: 'Judul Proyek', accessor: 'title' },
  { header: 'Klien', accessor: 'client_name' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Featured', accessor: 'is_featured', render: (item) => (
    item.is_featured ? '⭐ Ya' : 'Tidak'
  )},
  { header: 'Status', accessor: 'is_active', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {item.is_active ? 'Aktif' : 'Draft'}
    </span>
  )},
]

const formFields = [
  { name: 'title', label: 'Judul Proyek', type: 'text', required: true, placeholder: 'misal: Pembangunan PLTU Jawa 7' },
  { name: 'slug', label: 'Slug URL', type: 'text', required: true, placeholder: 'misal: pembangunan-pltu-jawa-7' },
  { name: 'client_name', label: 'Nama Klien', type: 'text', placeholder: 'PT. Pertamina' },
  { name: 'category', label: 'Kategori', type: 'text', placeholder: 'Power Plant' },
  { name: 'completion_date', label: 'Tanggal Selesai', type: 'text', placeholder: 'YYYY-MM-DD' },
  { name: 'description', label: 'Deskripsi Proyek', type: 'textarea' },
  { name: 'challenge', label: 'Tantangan (Challenge)', type: 'textarea' },
  { name: 'solution', label: 'Solusi (Solution)', type: 'textarea' },
  { name: 'results', label: 'Hasil (Results)', type: 'textarea' },
  { name: 'featured_image', label: 'URL Gambar Utama', type: 'text', placeholder: 'https://...' },
  { name: 'is_featured', label: 'Tampilkan di Beranda (Featured)', type: 'checkbox' },
  { name: 'is_active', label: 'Aktif (Published)', type: 'checkbox' },
]

export default function PortfolioManager() {
  const { data, loading: fetching, insert, update, remove } = useSupabaseAdmin('portfolios')
  
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setLoading(true)
    
    // Default fallback values
    const payload = {
      ...formData,
      is_featured: formData.is_featured || false,
      is_active: formData.is_active !== undefined ? formData.is_active : true,
      completion_date: formData.completion_date || null
    }

    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload)
        if (error) throw error
        toast.success('Portofolio berhasil diupdate')
      } else {
        const { error } = await insert(payload)
        if (error) throw error
        toast.success('Portofolio berhasil ditambahkan')
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
      toast.success('Portofolio berhasil dihapus')
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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Portofolio</h1>
          <p className="text-slate-500 mt-1">Atur data proyek dan portofolio perusahaan</p>
        </div>
        <button 
          onClick={() => { setEditItem(null); setShowForm(true) }} 
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tambah Proyek
        </button>
      </div>

      {fetching && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat data dari database...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editItem ? 'Edit Proyek' : 'Tambah Proyek Baru'}
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
