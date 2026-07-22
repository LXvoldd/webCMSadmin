import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Mail,
  Settings,
  HelpCircle,
  X,
  Briefcase,
  BookOpen,
  Image,
  Users,
  MessageSquare,
  Star,
  Lightbulb,
  Building2,
  Newspaper,
  FileText,
  LogOut,
} from 'lucide-react';

const mainMenus = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'pages', label: 'Halaman', icon: FileText, path: '/admin/pages' },
  { id: 'hero', label: 'Hero Section', icon: Image, path: '/admin/hero' },
  { id: 'value-props', label: 'Value Props', icon: Lightbulb, path: '/admin/value-props' },
  { id: 'services', label: 'Layanan', icon: Settings, path: '/admin/services' },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase, path: '/admin/portfolio' },
  { id: 'clients', label: 'Clients', icon: Building2, path: '/admin/clients' },
  { id: 'testimonials', label: 'Testimoni', icon: Star, path: '/admin/testimonials' },
  { id: 'team', label: 'Tim', icon: Users, path: '/admin/team' },
  { id: 'blog', label: 'Blog', icon: BookOpen, path: '/admin/blog' },
  { id: 'jobs', label: 'Lowongan', icon: Newspaper, path: '/admin/jobs' },
  { id: 'contact', label: 'Pesan Masuk', icon: MessageSquare, path: '/admin/contact' },
  { id: 'company', label: 'Info Perusahaan', icon: Building2, path: '/admin/company' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header / Logo */}
        <div className="flex flex-col px-8 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Admin</h1>
              <p className="text-xs text-slate-400 mt-1">Akmi Karya Solusi</p>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {mainMenus.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r-full" />
                )}
                <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="px-4 py-6 border-t border-slate-100 space-y-1">
          <Link
            to="/admin/settings"
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <Settings className="h-4 w-4 mr-3 text-slate-400" />
            Settings
          </Link>
          <Link
            to="/admin/support"
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <HelpCircle className="h-4 w-4 mr-3 text-slate-400" />
            Support
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 mt-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}