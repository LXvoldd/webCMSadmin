import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminLayout from './components/layout/AdminLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MessagesPage from './pages/MessagesPage'
import ServicesManager from './pages/ServicesManager'
import PortfolioManager from './pages/PortfolioManager'
import BlogManager from './pages/BlogManager'
import HeroManager from './pages/HeroManager'
import ValuePropositionManager from './pages/ValuePropositionManager'
import ClientsManager from './pages/ClientsManager'
import JobListingManager from './pages/JobListingManager'
import ContactMessageManager from './pages/ContactMessageManager'
import CompanyInfoManager from './pages/CompanyInfoManager'
import PagesManager from './pages/PagesManager'
import TeamManager from './pages/TeamManager'
import TestimonialsManager from './pages/TestimonialsManager'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="portfolio" element={<PortfolioManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="value-props" element={<ValuePropositionManager />} />
            <Route path="clients" element={<ClientsManager />} />
            <Route path="jobs" element={<JobListingManager />} />
            <Route path="contact" element={<ContactMessageManager />} />
            <Route path="company" element={<CompanyInfoManager />} />
            <Route path="pages" element={<PagesManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />

            <Route path="settings" element={<div className="p-8"><h1>Settings Page (Dummy)</h1></div>} />
            <Route path="support" element={<div className="p-8"><h1>Support Page (Dummy)</h1></div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App