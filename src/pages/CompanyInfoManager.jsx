import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const FIELDS = [
  { name: 'company_name', label: 'Nama Perusahaan', type: 'text' },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'description', label: 'Deskripsi Singkat', type: 'textarea' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'No. Telepon', type: 'text' },
  { name: 'address', label: 'Alamat', type: 'textarea' },
  { name: 'website', label: 'Website URL', type: 'text' },
  { name: 'logo_url', label: 'URL Logo', type: 'text' },
  { name: 'facebook', label: 'Facebook URL', type: 'text' },
  { name: 'instagram', label: 'Instagram URL', type: 'text' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { name: 'twitter', label: 'Twitter/X URL', type: 'text' },
  { name: 'youtube', label: 'YouTube URL', type: 'text' },
  { name: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
  { name: 'business_hours', label: 'Jam Operasional', type: 'text' },
  { name: 'founded_year', label: 'Tahun Berdiri', type: 'number' },
];

export default function CompanyInfoManager() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setRecordId(data.id);
        setFormData(data);
      }
    } catch (err) {
      toast.error('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData };
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;

      let error;
      if (recordId) {
        ({ error } = await supabase.from('company_info').update(payload).eq('id', recordId));
      } else {
        ({ error } = await supabase.from('company_info').insert(payload));
      }
      if (error) throw error;
      toast.success('Data perusahaan berhasil disimpan');
      fetchData();
    } catch (err) {
      toast.error('Gagal menyimpan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Memuat data perusahaan...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Informasi Perusahaan</h1>
        <p className="text-slate-500 mt-1">Kelola data utama perusahaan yang ditampilkan di footer, halaman kontak, dan lainnya.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIELDS.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
