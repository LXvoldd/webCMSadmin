import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const types = {
  success: { icon: FaCheckCircle, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', iconColor: 'text-green-400' },
  error: { icon: FaExclamationCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-400' },
  warning: { icon: FaExclamationCircle, bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', iconColor: 'text-yellow-400' },
  info: { icon: FaInfoCircle, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-400' },
}

export default function AlertMessage({ type = 'info', message, onClose }) {
  const config = types[type]
  const Icon = config.icon

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start`}>
      <Icon className={`h-5 w-5 ${config.iconColor} mt-0.5`} />
      <p className={`ml-3 text-sm ${config.text} flex-1`}>{message}</p>
      {onClose && (
        <button onClick={onClose} className={`ml-3 ${config.text} hover:opacity-75`}>
          <FaTimes className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}