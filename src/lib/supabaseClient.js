import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const auth = {
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },
  
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },
  
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },
  
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Admin CRUD functions
export const adminDB = {
  // Generic CRUD
  getAll: async (table, options = {}) => {
    let query = supabase.from(table).select(options.select || '*')
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false })
    }
    if (options.limit) query = query.limit(options.limit)
    if (options.range) query = query.range(options.range.from, options.range.to)
    
    const { data, error, count } = await query
    return { data, error, count }
  },
  
  getById: async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    return { data, error }
  },
  
  create: async (table, data) => {
    const { data: result, error } = await supabase.from(table).insert(data).select()
    return { data: result, error }
  },
  
  update: async (table, id, data) => {
    const { data: result, error } = await supabase.from(table).update(data).eq('id', id).select()
    return { data: result, error }
  },
  
  delete: async (table, id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    return { error }
  },
  
  // Upload file
  uploadFile: async (bucket, path, file) => {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file)
    return { data, error }
  },
  
  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }
}