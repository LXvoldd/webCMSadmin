import { useState } from 'react'
import { adminDB } from '../lib/supabaseClient'
import toast from 'react-hot-toast'

export function useCrud(table) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAll = async (options = {}) => {
    setLoading(true)
    try {
      const { data: result, error: fetchError } = await adminDB.getAll(table, options)
      if (fetchError) throw fetchError
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      toast.error('Gagal memuat data')
      return null
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id) => {
    setLoading(true)
    try {
      const { data: result, error: fetchError } = await adminDB.getById(table, id)
      if (fetchError) throw fetchError
      return result
    } catch (err) {
      toast.error('Gagal memuat data')
      return null
    } finally {
      setLoading(false)
    }
  }

  const create = async (formData) => {
    setLoading(true)
    try {
      const { data: result, error: createError } = await adminDB.create(table, formData)
      if (createError) throw createError
      setData(prev => [...prev, result[0]])
      toast.success('Data berhasil ditambahkan')
      return result
    } catch (err) {
      toast.error('Gagal menambah data')
      return null
    } finally {
      setLoading(false)
    }
  }

  const update = async (id, formData) => {
    setLoading(true)
    try {
      const { data: result, error: updateError } = await adminDB.update(table, id, formData)
      if (updateError) throw updateError
      setData(prev => prev.map(item => item.id === id ? result[0] : item))
      toast.success('Data berhasil diupdate')
      return result
    } catch (err) {
      toast.error('Gagal mengupdate data')
      return null
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id) => {
    setLoading(true)
    try {
      const { error: deleteError } = await adminDB.delete(table, id)
      if (deleteError) throw deleteError
      setData(prev => prev.filter(item => item.id !== id))
      toast.success('Data berhasil dihapus')
    } catch (err) {
      toast.error('Gagal menghapus data')
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    fetchAll,
    getById,
    create,
    update,
    remove,
  }
}