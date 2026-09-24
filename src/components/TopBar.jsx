import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, subtitle, onBack, right }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-20 bg-ink-950/90 backdrop-blur border-b border-ink-800/60 px-5 pt-6 pb-4 flex items-center gap-3">
      {onBack !== undefined && (
        <button
          onClick={() => (onBack ? onBack() : navigate(-1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-ink-800 text-ink-200 shrink-0"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-ink-50 font-semibold text-lg leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-ink-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
