import { 
  FaHome, FaFileAlt, FaImage, FaCogs, FaBriefcase, 
  FaUsers, FaStar, FaUserTie, FaBlog, FaBriefcaseMedical, 
  FaEnvelope, FaCog 
} from 'react-icons/fa'

export const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: FaHome,
    path: '/admin/dashboard',
    roles: ['super_admin', 'admin', 'hr_admin', 'content_manager', 'editor'],
  },
  {
    id: 'pages',
    label: 'Halaman',
    icon: FaFileAlt,
    path: '/admin/pages',
    roles: ['super_admin', 'admin', 'content_manager', 'editor'],
  },
  {
    id: 'hero',
    label: 'Hero Section',
    icon: FaImage,
    path: '/admin/hero',
    roles: ['super_admin', 'admin', 'content_manager'],
  },
  {
    id: 'services',
    label: 'Layanan',
    icon: FaCogs,
    path: '/admin/services',
    roles: ['super_admin', 'admin', 'content_manager'],
  },
  {
    id: 'portfolio',
    label: 'Portofolio',
    icon: FaBriefcase,
    path: '/admin/portfolio',
    roles: ['super_admin', 'admin', 'content_manager'],
  },
  {
    id: 'clients',
    label: 'Klien',
    icon: FaUsers,
    path: '/admin/clients',
    roles: ['super_admin', 'admin', 'content_manager'],
  },
  {
    id: 'testimonials',
    label: 'Testimoni',
    icon: FaStar,
    path: '/admin/testimonials',
    roles: ['super_admin', 'admin', 'content_manager', 'editor'],
  },
  {
    id: 'team',
    label: 'Tim',
    icon: FaUserTie,
    path: '/admin/team',
    roles: ['super_admin', 'admin', 'hr_admin'],
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: FaBlog,
    path: '/admin/blog',
    roles: ['super_admin', 'admin', 'content_manager', 'editor'],
  },
  {
    id: 'career',
    label: 'Karir',
    icon: FaBriefcaseMedical,
    path: '/admin/career',
    roles: ['super_admin', 'admin', 'hr_admin'],
  },
  {
    id: 'messages',
    label: 'Pesan',
    icon: FaEnvelope,
    path: '/admin/messages',
    roles: ['super_admin', 'admin'],
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: FaCog,
    path: '/admin/settings',
    roles: ['super_admin', 'admin'],
  },
]