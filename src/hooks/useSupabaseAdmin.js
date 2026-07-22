import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSupabaseAdmin(table, options = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const orderBy = options.orderBy || 'created_at'
  const ascending = options.ascending ?? false

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const { data: result, error: queryError } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending })

      if (queryError) throw queryError
      setData(result || [])
      setError(null)
    } catch (err) {
      console.error(`Error fetching ${table}:`, err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [table, orderBy, ascending])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const insert = async (newData) => {
    const { data: result, error } = await supabase.from(table).insert(newData).select()
    if (!error && result?.[0]) {
      setData(prev => [result[0], ...prev])
    }
    return { data: result, error }
  }

  const update = async (id, updates) => {
    const { data: result, error } = await supabase.from(table).update(updates).eq('id', id).select()
    if (!error && result?.[0]) {
      setData(prev => prev.map(item => item.id === id ? result[0] : item))
    }
    return { data: result, error }
  }

  const remove = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) {
      setData(prev => prev.filter(item => item.id !== id))
    }
    return { error }
  }

  return { data, loading, error, refetch: fetchData, insert, update, remove }
}