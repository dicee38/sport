import { useState } from 'react'
import { Card, SectionTitle, Sheet } from '../ui'
import { ACHIEVEMENTS } from '../../data/gamification'

export default function AchievementsGrid() {
  const [selected, setSelected] = useState(null)
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length

  return (
    <div>
      <SectionTitle>7. Ачивки · {unlockedCount}/{ACHIEVEMENTS.length}</SectionTitle>
      <Card>
        <div className="grid grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-12 h-12 rounded-xl2 flex items-center justify-center text-xl border ${
                  a.unlocked
                    ? 'bg-gold-500/15 border-gold-500/40'
                    : 'bg-ink-800 border-ink-700 grayscale opacity-40'
                }`}
              >
                {a.icon}
              </div>
              <span className={`text-[9px] text-center leading-tight ${a.unlocked ? 'text-ink-300' : 'text-ink-600'}`}>
                {a.label}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.label}>
        {selected && (
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border ${
                selected.unlocked ? 'bg-gold-500/15 border-gold-500/40' : 'bg-ink-800 border-ink-700 grayscale opacity-50'
              }`}
            >
              {selected.icon}
            </div>
            <p className="text-ink-300 text-sm mb-1">{selected.desc}</p>
            <p className={`text-xs mt-2 font-medium ${selected.unlocked ? 'text-matcha-400' : 'text-ink-500'}`}>
              {selected.unlocked ? 'Разблокировано' : 'Заблокировано'}
            </p>
          </div>
        )}
      </Sheet>
    </div>
  )
}
