import { useState, useRef, useEffect } from 'react'
import TopBar from '../../components/TopBar'
import { AI_COACH_SCENARIOS } from '../../data/mock'
import { Sparkles } from 'lucide-react'

export default function AICoach() {
  const [messages, setMessages] = useState([
    { id: 'intro', from: 'ai', text: 'Привет! Я твой AI Coach. Спроси о тренировке, прогрессе или восстановлении — выбери один из вопросов ниже.' },
  ])
  const [usedIds, setUsedIds] = useState([])
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function ask(scenario) {
    setMessages((prev) => [...prev, { id: `${scenario.id}-q`, from: 'user', text: scenario.prompt }])
    setUsedIds((prev) => [...prev, scenario.id])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { id: `${scenario.id}-a`, from: 'ai', text: scenario.reply }])
    }, 900)
  }

  const available = AI_COACH_SCENARIOS.filter((s) => !usedIds.includes(s.id))

  return (
    <div className="min-h-full flex flex-col">
      <TopBar title="AI Coach" subtitle="Заготовленные сценарии · демо" onBack={null} />
      <div className="flex-1 px-5 py-4 flex flex-col gap-3 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeUp`}>
            {m.from === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mr-2 shrink-0 mt-0.5">
                <Sparkles size={13} className="text-gold-400" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'bg-gold-500 text-ink-950 rounded-br-sm'
                  : 'bg-ink-850 text-ink-100 border border-ink-700 rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-ink-400 text-xs pl-9 animate-fadeIn">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-pulse [animation-delay:300ms]" />
            </span>
            печатает…
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="px-5 pb-6 pt-2 border-t border-ink-800/60">
        {available.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-ink-500 text-[11px] uppercase tracking-wide mb-1">Быстрые вопросы</p>
            {available.map((s) => (
              <button
                key={s.id}
                onClick={() => ask(s)}
                className="text-left px-4 py-3 rounded-xl2 bg-ink-850 border border-ink-700 text-ink-200 text-sm active:scale-[0.98] transition-transform"
              >
                {s.prompt}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-ink-500 text-xs text-center py-2">Демо-сценарии закончились — в реальном приложении здесь был бы свободный ввод.</p>
        )}
      </div>
    </div>
  )
}
