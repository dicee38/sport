import { useGamification } from '../../context/GamificationContext'

export default function GemsBadge() {
  const { gems } = useGamification()
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-800 border border-ink-700 text-sm font-semibold text-ink-100 shrink-0">
      <span>💎</span>
      <span>{gems}</span>
    </div>
  )
}
