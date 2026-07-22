import { Calendar, Users, TrendingUp, Search, Archive, AlertCircle, Trash2, Star } from 'lucide-react'

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

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
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
            <p className="text-[10px] text-slate-400">17 April 2026 - 21 May 2026</p>
          </div>
          <svg className="w-4 h-4 text-slate-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Widget Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">Total Karyawan</p>
              <h3 className="text-3xl font-bold text-slate-800">40,689</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Users className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
            <span className="font-semibold text-emerald-500">8.5%</span>
            <span className="text-slate-400 ml-1.5">Up from yesterday</span>
          </div>
        </div>
      </div>

      {/* Inbox Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Inbox Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Search mail" 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-slate-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-2.5" />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"><Archive className="w-4 h-4" /></button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"><AlertCircle className="w-4 h-4" /></button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
        
        {/* Inbox List */}
        <div className="divide-y divide-slate-50">
          {dummyInbox.map((item) => (
            <div key={item.id} className="flex items-center p-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
              <input type="checkbox" className="mr-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <button className="mr-4 text-slate-300 hover:text-amber-400 focus:outline-none">
                <Star className={`w-5 h-5 ${item.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
              <div className="w-48 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-800">{item.name}</span>
              </div>
              {item.tag && (
                <div className="w-24 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${getTagColor(item.tag)}`}>
                    {item.tag}
                  </span>
                </div>
              )}
              <div className="flex-1 truncate pr-4">
                <span className="text-sm text-slate-600">{item.subject}</span>
              </div>
              <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}