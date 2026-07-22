import { useState } from 'react'
import FormBuilder from '../components/crud/FormBuilder'
import toast from 'react-hot-toast'

const formFields = [
  { name: 'company_name', label: 'Nama Perusahaan', type: 'text', required: true, placeholder: 'PT Company Name' },
  { name: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Solusi Teknologi Terdepan' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', fullWidth: true },
  { name: 'address', label: 'Alamat', type: 'textarea', fullWidth: true },
  { name: 'phone', label: 'Telepon', type: 'text', placeholder: '+62 21 1234 5678' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'info@company.com' },
]

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)

  const initialData = {
    company_name: 'Company Name',
    tagline: 'Solusi Teknologi Terdepan',
    description: 'Perusahaan teknologi terkemuka di Indonesia.',
    address: 'Jl. Contoh No. 123, Jakarta Selatan',
    phone: '+62 21 1234 5678',
    email: 'info@company.com',
  }

  const handleSubmit = async (formData) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Pengaturan berhasil disimpan')
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 mt-1">Atur informasi perusahaan</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Informasi Perusahaan</h2>
        <FormBuilder fields={formFields} initialData={initialData} onSubmit={handleSubmit} loading={loading} submitLabel="Simpan Pengaturan" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h2>
        <FormBuilder
          fields={[
            { name: 'facebook', label: 'Facebook URL', type: 'text', placeholder: 'https://facebook.com/...' },
            { name: 'twitter', label: 'Twitter URL', type: 'text', placeholder: 'https://twitter.com/...' },
            { name: 'instagram', label: 'Instagram URL', type: 'text', placeholder: 'https://instagram.com/...' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'text', placeholder: 'https://linkedin.com/...' },
          ]}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Simpan Social Media"
        />
      </div>
    </div>
  )
}