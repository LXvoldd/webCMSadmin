const activities = [
  { action: 'Menambahkan artikel baru', user: 'John Doe', time: '5 menit yang lalu', type: 'create' },
  { action: 'Mengupdate halaman About', user: 'Jane Smith', time: '1 jam yang lalu', type: 'update' },
  { action: 'Pesan baru dari contact form', user: 'System', time: '2 jam yang lalu', type: 'info' },
  { action: 'Menghapus testimoni', user: 'John Doe', time: '3 jam yang lalu', type: 'delete' },
  { action: 'Menambahkan lowongan baru', user: 'HR Admin', time: '5 jam yang lalu', type: 'create' },
]

const typeColors = {
  create: 'bg-green-500',
  update: 'bg-blue-500',
  delete: 'bg-red-500',
  info: 'bg-yellow-500',
}

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${typeColors[activity.type]} rounded-full`}></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">oleh {activity.user}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}