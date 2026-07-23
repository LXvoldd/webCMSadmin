import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Login berhasil!')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error.message || 'Login gagal. Periksa email dan password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Kolom Kiri: Form Login */}
      <div className="flex w-full flex-col justify-center bg-white px-8 py-12 md:w-1/2 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-md">
          {/* Header/Logo section */}
          <div className="mb-10 flex items-center gap-3">
            <div className="w-20">
               {/* Dummy Logo Hexagon */}
              <img 
              src="https://cdn.projects.co.id/upload/usrbd5947/2024021565cd7fe35a28a.jpg" 
              alt="" 
              className="w-36 h-auto object-contain hover:scale-105 transition-transform"
            />
            </div>
            <span className="font-bold text-slate-900 tracking-wide text-sm md:text-base">PT. AKMI KARYA GLOBAL</span>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-slate-900">Selamat Datang</h1>
          <p className="mb-8 text-slate-500">Masuk ke Admin Dashboard untuk melanjutkan</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-colors"
                  placeholder="Masukan email Anda"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-colors"
                  placeholder="Masukan password"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <label htmlFor="show-password" className="ml-2 block text-xs text-slate-400">
                Tampilkan Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-[#0a1630] py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>

      {/* Kolom Kanan: Visual Branding (Hanya Desktop) */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-[#0a1630] md:flex relative overflow-hidden">
        {/* Background Decorative Pattern (Opsional, untuk estetika) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-48 w-48 items-center justify-center rounded-2xl bg-white pt-3 shadow-2xl">
              <img 
              src="https://cdn.projects.co.id/upload/usrbd5947/2024021565cd7fe35a28a.jpg" 
              alt="" 
              className="w-36 h-auto object-contain hover:scale-105 transition-transform"
            />
          </div>
          <h2 className="text-4xl font-bold text-white tracking-wide">
            <h1>Selamat Datang</h1>
            <p className='text-[25px] pt-3'>di Sistem Admin</p>
          </h2>
        </div>
      </div>
    </div>
  )
}