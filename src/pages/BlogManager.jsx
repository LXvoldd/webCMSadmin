import { useState } from 'react'
import DataTable from '../components/crud/DataTable'
import FormBuilder from '../components/crud/FormBuilder'
import DeleteConfirm from '../components/crud/DeleteConfirm'
import toast from 'react-hot-toast'
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin'

const columns = [
  { header: 'Judul', accessor: 'title' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Author', accessor: 'author' },
  { header: 'Status', accessor: 'status', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      {item.status}
    </span>
  )},
  { header: 'Tanggal', accessor: 'created_at', render: (item) => new Date(item.created_at).toLocaleDateString('id-ID') },
]

const formFields = [
  { name: 'title', label: 'Judul Artikel', type: 'text', required: true, placeholder: 'Masukkan judul artikel' },
  { name: 'slug', label: 'Slug URL', type: 'text', required: true, placeholder: 'judul-artikel' },
  { name: 'category', label: 'Kategori', type: 'text', required: true, placeholder: 'Teknologi' },
  { name: 'author', label: 'Penulis', type: 'text', required: true, placeholder: 'John Doe' },
  { name: 'featured_image', label: 'URL Gambar Utama', type: 'text', placeholder: 'https://...' },
  { name: 'excerpt', label: 'Ringkasan', type: 'textarea', placeholder: 'Ringkasan singkat artikel' },
  { name: 'content', label: 'Konten Lengkap', type: 'textarea', placeholder: 'Isi artikel lengkap...' },
  { name: 'status', label: 'Status', type: 'select', options: [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ]},
  { name: 'is_featured', label: 'Tampilkan di Beranda (Featured)', type: 'checkbox' },
]

export default function BlogManager() {
  const { data, loading: fetching, insert, update, remove } = useSupabaseAdmin('blog_posts')
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
      status: formData.status || 'draft',
      is_featured: !!formData.is_featured,
      published_at: formData.status === 'published' ? (editItem?.published_at || new Date().toISOString()) : null,
      updated_at: new Date().toISOString()
    }

    try {
      if (editItem) {
        const { error } = await update(editItem.id, payload)
        if (error) throw error
        toast.success('Artikel berhasil diupdate')
      } else {
        const { error } = await insert(payload)
        if (error) throw error
        toast.success('Artikel berhasil ditambahkan')
      }
      setShowForm(false)
      setEditItem(null)
    } catch (err) {
      toast.error('Gagal menyimpan artikel: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const { error } = await remove(deleteItem.id)
      if (error) throw error
      toast.success('Artikel berhasil dihapus')
    } catch (err) {
      toast.error('Gagal menghapus artikel: ' + err.message)
    } finally {
      setLoading(false)
      setDeleteItem(null)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Blog</h1>
          <p className="text-slate-500 mt-1">Atur artikel dan konten berita perusahaan</p>
        </div>
        <button 
          onClick={() => { setEditItem(null); setShowForm(true) }} 
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          + Tulis Artikel
        </button>
      </div>

      {fetching && !showForm ? (
        <div className="text-center py-12 text-slate-500">Memuat artikel dari database...</div>
      ) : showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editItem ? 'Edit Artikel' : 'Tulis Artikel Baru'}
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