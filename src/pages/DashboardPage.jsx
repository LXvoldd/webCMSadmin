import { useEffect, useState } from 'react'
import { Calendar, Users, Layers, MessageCircle, Briefcase, FileText, TrendingUp, Search, Archive, AlertCircle, Trash2, Star } from 'lucide-react'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { supabase } from '../lib/supabaseClient'

const statConfig = [
  {
    key: 'services',
    label: 'Layanan Aktif',
    description: 'Jumlah layanan yang aktif',
    icon: Layers,
    filter: (query) => query.eq('is_active', true),
  },
  {
    key: 'testimonials',
    label: 'Testimoni Aktif',
    description: 'Jumlah testimoni aktif',
    icon: MessageCircle,
    filter: (query) => query.eq('is_active', true),
  },
  {
    key: 'portfolios',
    label: 'Portofolio Aktif',
    description: 'Jumlah portofolio yang aktif',
    icon: Briefcase,
    filter: (query) => query.eq('is_active', true),
  },
  {
    key: 'blog_posts',
    label: 'Artikel Publik',
    description: 'Jumlah artikel yang dipublikasikan',
    icon: FileText,
    filter: (query) => query.eq('status', 'published'),
  },
  {
    key: 'team_members',
    label: 'Anggota Tim Aktif',
    description: 'Jumlah anggota tim aktif',
    icon: Users,
    filter: (query) => query.eq('is_active', true),
  },
]

// Dummy Data for Inbox
const dummyInbox = [
  { id: 1, name: 'Jullu Jalal', subject: 'Our Bachelor of Commerce program is ACBSP-accredited.', tag: 'Primary', time: '8:38 AM' },
  { id: 2, name: 'Minerva Barnett', subject: 'Get Best Advertiser In Your Side Pocket', tag: 'Work', time: '8:13 AM' },
  { id: 3, name: 'Peter Lewis', subject: 'Vacation Home Rental Success', tag: 'Friends', time: '7:52 PM' },
  { id: 4, name: 'Anthony Briggs', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', tag: '', time: '7:52 PM', starred: true },
  { id: 5, name: 'Clifford Morgan', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', tag: 'Social', time: '4:13 PM' },
  { id: 6, name: 'Cecilia Webster', subject: 'Always Look On The Bright Side Of Life', tag: 'Friends', time: '3:52 PM' },
  { id: 7, name: 'Harvey Manning', subject: 'Curling Irons Are As Individual As The Women Who Use Them', tag: '', time: '2:30 PM', starred: true },
]

const getTagColor = (tag) => {
  switch (tag) {
    case 'Primary': return 'bg-emerald-100 text-emerald-600'
    case 'Work': return 'bg-orange-100 text-orange-600'
    case 'Friends': return 'bg-purple-100 text-purple-600'
    case 'Social': return 'bg-blue-100 text-blue-600'
    default: return 'bg-slate-100 text-slate-600'
  }
}

const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function DashboardPage() {
  const [stats, setStats] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch all stats in parallel
        const statPromises = statConfig.map(async (item) => {
          let query = supabase.from(item.key).select('id', { count: 'exact', head: true })
          query = item.filter(query)
          const { count, error } = await query
          if (error) throw error
          return {
            key: item.key,
            label: item.label,
            description: item.description,
            value: count ?? 0,
            icon: item.icon,
          }
        })

        // Fetch latest published blog posts
        const latestPostsPromise = supabase
          .from('blog_posts')
          .select('id, title, author, published_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(5)

        const [statsResult, latestPostsResult] = await Promise.all([
          Promise.all(statPromises),
          latestPostsPromise
        ])

        if (latestPostsResult.error) throw latestPostsResult.error

        setStats(statsResult)
        setLatestPosts(latestPostsResult.data ?? [])
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        setError(err.message || 'Gagal memuat data dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Hitung total semua konten
  const totalContent = stats.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Hi, Admin. Welcome back to Dashboard Admin</p>
        </div>

        {/* Filter / Date Picker Dummy */}
        <button className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-800">Filter Periode</p>
            <p className="text-[10px] text-slate-400">17 April 2026 - 21 Mei 2026</p>
          </div>
          <svg className="w-4 h-4 text-slate-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner text="Memuat data Supabase..." />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
          <p className="font-semibold">Terjadi kesalahan saat memuat data dashboard</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {stats.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.key} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-2">{item.label}</p>
                      <h3 className="text-3xl font-bold text-slate-900">{item.value}</h3>
                    </div>
                    <div className="p-3 bg-slate-100 rounded-2xl text-slate-700">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            {/* Latest Articles */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Artikel Terbaru</h2>
                  <p className="text-sm text-slate-500">Daftar artikel yang baru dipublikasikan di Supabase</p>
                </div>
                <span className="text-xs uppercase tracking-[.18em] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {latestPosts.length} item
                </span>
              </div>

              {latestPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Belum ada artikel publik yang ditemukan.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {latestPosts.map((post) => (
                    <div key={post.id} className="rounded-3xl border border-slate-100 p-4 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900">{post.title}</h3>
                        <span className="text-[11px] uppercase tracking-[.18em] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                          Dipublikasikan
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-500 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{post.author || 'Admin'}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Summary */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Ringkasan Konten</h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Total: {totalContent}
                </span>
              </div>

              <div className="space-y-4">
                {['services', 'testimonials', 'portfolios', 'team_members'].map((key) => {
                  const item = stats.find((stat) => stat.key === key)
                  const label = {
                    services: 'Layanan',
                    testimonials: 'Testimoni',
                    portfolios: 'Portofolio',
                    team_members: 'Tim',
                  }[key]

                  const IconComponent = {
                    services: Layers,
                    testimonials: MessageCircle,
                    portfolios: Briefcase,
                    team_members: Users,
                  }[key]

                  return (
                    <div key={key} className="rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl">
                            <IconComponent className="w-4 h-4 text-slate-600" />
                          </div>
                          <p className="text-sm font-medium text-slate-600">{label}</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{item?.value ?? 0}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}


    </div>
  )
}