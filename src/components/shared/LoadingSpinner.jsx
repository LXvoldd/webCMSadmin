export default function LoadingSpinner({ text = 'Memuat...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      {text && <p className="mt-4 text-gray-500 text-sm">{text}</p>}
    </div>
  )
}