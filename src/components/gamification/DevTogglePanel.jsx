import { useGamification } from '../../context/GamificationContext'
import { ChevronDown, ChevronUp, FlaskConical } from 'lucide-react'

export default function DevTogglePanel() {
  const { toggles, setToggle, TOGGLE_LABELS, devPanelOpen, setDevPanelOpen } = useGamification()

  return (
    <div className="mx-5 mt-4 mb-2 rounded-xl2 border border-dashed border-gold-500/40 bg-gold-500/5">
      <button
        onClick={() => setDevPanelOpen(!devPanelOpen)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wide">
          <FlaskConical size={14} /> Dev: гейм-механики
        </span>
        {devPanelOpen ? <ChevronUp size={16} className="text-gold-400" /> : <ChevronDown size={16} className="text-gold-400" />}
      </button>
      {devPanelOpen && (
        <div className="px-4 pb-4 grid grid-cols-2 gap-x-3 gap-y-2">
          {Object.keys(TOGGLE_LABELS).map((key) => (
            <label key={key} className="flex items-center gap-2 text-[11px] text-ink-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={toggles[key]}
                onChange={(e) => setToggle(key, e.target.checked)}
                className="w-3.5 h-3.5 accent-gold-500"
              />
              {TOGGLE_LABELS[key]}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
