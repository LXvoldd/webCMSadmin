import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSupabaseAdmin(table) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [table])

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: result, error: queryError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false })

      if (queryError) throw queryError
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const insert = async (newData) => {
    const { data: result, error } = await supabase.from(table).insert(newData).select()
    if (!error) setData(prev => [result[0], ...prev])
    return { data: result, error }
  }

  const update = async (id, updates) => {
    const { data: result, error } = await supabase.from(table).update(updates).eq('id', id).select()
    if (!error) setData(prev => prev.map(item => item.id === id ? result[0] : item))
    return { data: result, error }
  }

  const remove = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) setData(prev => prev.filter(item => item.id !== id))
    return { error }
  }

  return { data, loading, error, refetch: fetchData, insert, update, remove }
}