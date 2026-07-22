import { createContext, useContext, useState, useEffect } from 'react'
import { auth, supabase } from '../lib/supabaseClient'
import { PERMISSIONS } from '../config/roles'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek session saat pertama load
    checkSession()

    // Listen auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkSession = async () => {
    try {
      const { session } = await auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }
    } catch (error) {
      console.error('Session check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!error && data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Fetch profile error:', error)
    }
  }

  const login = async (email, password) => {
    const { data, error } = await auth.signIn(email, password)
    if (error) throw error
    
    if (data.user) {
      await fetchProfile(data.user.id)
    }
    
    return data
  }

  const logout = async () => {
    await auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const hasPermission = (action) => {
    if (!profile?.role) return false
    const permissions = PERMISSIONS[profile.role]
    if (!permissions) return false
    return permissions[action] || permissions.canManageAll || false
  }

  const canAccessMenu = (menuId) => {
    if (!profile?.role) return false
    const permissions = PERMISSIONS[profile.role]
    if (!permissions) return false
    if (permissions.canManageAll) return true
    return permissions.allowedMenus?.includes(menuId) || false
  }

  const value = {
    user,
    profile,
    loading,
    login,
    logout,
    hasPermission,
    canAccessMenu,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}