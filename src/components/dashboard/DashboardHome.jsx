import { FaUsers, FaFileAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa'
import StatsCard from './StatsCard'
import RecentActivity from './RecentActivity'

const stats = [
  { label: 'Total Halaman', value: '12', change: '+2', up: true, icon: FaFileAlt, color: 'bg-blue-500' },
  { label: 'Total Klien', value: '48', change: '+5', up: true, icon: FaUsers, color: 'bg-green-500' },
  { label: 'Pesan Baru', value: '7', change: '+3', up: true, icon: FaEnvelope, color: 'bg-yellow-500' },
  { label: 'Lowongan Aktif', value: '5', change: '-1', up: false, icon: FaBriefcase, color: 'bg-purple-500' },
]

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a href="/admin/pages" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
              📄 Kelola Halaman
            </a>
            <a href="/admin/blog" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
              ✍️ Tulis Artikel
            </a>
            <a href="/admin/messages" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
              ✉️ Lihat Pesan
            </a>
            <a href="/admin/settings" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
              ⚙️ Pengaturan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}