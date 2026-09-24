import { createPortal } from 'react-dom'
import { BELTS, FORMATS } from '../data/mock'

export function BeltBadge({ beltId, size = 'md' }) {
  const belt = BELTS.find((b) => b.id === beltId) || BELTS[0]
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide ${sizes[size]}`}
      style={{ background: belt.color, color: belt.text }}
    >
      {belt.label} Belt
    </span>
  )
}

export function FormatTag({ formatId, size = 'md' }) {
  const f = FORMATS.find((f) => f.id === formatId)
  if (!f) return null
  const sizes = { sm: 'text-[10px] px-2 py-0.5', md: 'text-xs px-2.5 py-1' }
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizes[size]}`}
      style={{ background: `${f.color}22`, color: f.color, border: `1px solid ${f.color}44` }}
    >
      {f.label}
    </span>
  )
}

export function ProgressBar({ value, max = 100, colorClass = 'bg-gold-500', trackClass = 'bg-ink-700', height = 'h-2' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={`w-full ${trackClass} rounded-full ${height} overflow-hidden`}>
      <div
        className={`${height} ${colorClass} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function Card({ children, className = '', onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`bg-ink-850 border border-ink-700/60 rounded-xl2 p-4 shadow-soft ${onClick ? 'active:scale-[0.98] cursor-pointer transition-transform' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-ink-100 font-semibold text-sm tracking-wide uppercase">{children}</h2>
      {action}
    </div>
  )
}

export function PillButton({ children, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active ? 'bg-gold-500 text-ink-950' : 'bg-ink-800 text-ink-300 border border-ink-700'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export function PrimaryButton({ children, onClick, className = '', disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 rounded-xl2 bg-gold-500 text-ink-950 font-semibold text-sm tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:active:scale-100 ${className}`}
    >
      {children}
    </button>
  )
}

export function GhostButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl2 border border-ink-600 text-ink-100 font-medium text-sm active:scale-[0.98] transition-all ${className}`}
    >
      {children}
    </button>
  )
}

export function Sheet({ open, onClose, children, title }) {
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-[390px] bg-ink-900 border-t border-ink-700 rounded-t-[1.75rem] p-5 pb-8 animate-slideUp max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="w-10 h-1 bg-ink-600 rounded-full mx-auto mb-4" />
        {title && <h3 className="text-ink-100 font-semibold text-lg mb-4">{title}</h3>}
        {children}
      </div>
    </div>,
    document.body
  )
}

export function LockBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-ink-300 bg-ink-800/80 border border-ink-600 rounded-full px-2 py-1">
      🔒 {label}
    </span>
  )
}
