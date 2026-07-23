export default function StatsCard({ label, value, change, up, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className={`flex items-center text-sm font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
          {up ? '↑' : '↓'} {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}