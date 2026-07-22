import { Menu, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Header({ onMenuClick }) {
  const { profile } = useAuth()

  return (
    <header className="sticky top-0 z-30 pt-8 pb-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 rounded-md bg-white mr-4 shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center w-full h-12 rounded-2xl bg-white shadow-sm px-4">
            <input
              type="text"
              placeholder="Search here"
              className="w-full bg-transparent border-none text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
            <Search className="h-4 w-4 text-slate-400 ml-2" />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 ml-6">
          <div className="hidden sm:block text-right">
            <p className="text-sm text-slate-500">
              Hello, <span className="font-semibold text-slate-800">{profile?.full_name || 'Admin'}</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Admin Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}