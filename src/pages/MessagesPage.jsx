import { Search, Archive, AlertCircle, Trash2, Star } from 'lucide-react'

const dummyInbox = [
  { id: 1, name: 'Jullu Jalal', subject: 'Our Bachelor of Commerce program is ACBSP-accredited.', tag: 'Primary', time: '8:38 AM' },
  { id: 2, name: 'Minerva Barnett', subject: 'Get Best Advertiser In Your Side Pocket', tag: 'Work', time: '8:13 AM' },
  { id: 3, name: 'Peter Lewis', subject: 'Vacation Home Rental Success', tag: 'Friends', time: '7:52 PM' },
  { id: 4, name: 'Anthony Briggs', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', tag: '', time: '7:52 PM', starred: true },
  { id: 5, name: 'Clifford Morgan', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', tag: 'Social', time: '4:13 PM' },
  { id: 6, name: 'Cecilia Webster', subject: 'Always Look On The Bright Side Of Life', tag: 'Friends', time: '3:52 PM' },
  { id: 7, name: 'Harvey Manning', subject: 'Curling Irons Are As Individual As The Women Who Use Them', tag: '', time: '2:30 PM', starred: true },
  { id: 8, name: 'Willie Blake', subject: 'Our Bachelor of Commerce program is ACBSP-accredited.', tag: 'Primary', time: '8:38 AM' },
  { id: 9, name: 'Minerva Barnett', subject: 'Get Best Advertiser In Your Side Pocket', tag: 'Work', time: '8:13 AM' },
  { id: 10, name: 'Fanny Weaver', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', tag: '', time: '7:52 PM', starred: true },
  { id: 11, name: 'Olga Hogan', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', tag: 'Social', time: '4:13 PM' },
  { id: 12, name: 'Lora Houston', subject: 'Vacation Home Rental Success', tag: 'Friends', time: '7:52 PM' },
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

export default function MessagesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pesan</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola dan tanggapi pertanyaan yang masuk.</p>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-1">Total Pesan</p>
          <h3 className="text-4xl font-bold text-slate-800 mb-2">1,258</h3>
          <p className="text-xs font-semibold text-slate-400">+12% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-1">Belum Dibaca</p>
          <h3 className="text-4xl font-bold text-slate-800 mb-2">52</h3>
          <p className="text-xs font-semibold text-slate-400">+12% from last month</p>
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
