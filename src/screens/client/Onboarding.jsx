import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PrimaryButton, BeltBadge, ProgressBar } from '../../components/ui'
import { Sparkles } from 'lucide-react'

const STEPS = [
  {
    key: 'goal',
    title: 'Какая у тебя главная цель?',
    options: [
      { id: 'strength', label: 'Стать сильнее' },
      { id: 'weight', label: 'Снизить вес и держать тонус' },
      { id: 'technique', label: 'Освоить технику бокса' },
      { id: 'balance', label: 'Баланс тела и разума' },
    ],
  },
  {
    key: 'format',
    title: 'Какой формат тебе ближе?',
    options: [
      { id: 'boxing', label: 'Boxing' },
      { id: 'latin', label: 'Latin Flow' },
      { id: 'strength', label: 'Strength' },
      { id: 'mobility', label: 'Mobility / Recovery' },
    ],
  },
  {
    key: 'frequency',
    title: 'Как часто планируешь тренироваться?',
    options: [
      { id: '1-2', label: '1–2 раза в неделю' },
      { id: '3-4', label: '3–4 раза в неделю' },
      { id: '5+', label: '5+ раз в неделю' },
    ],
  },
  {
    key: 'motivation',
    title: 'Что тебя мотивирует больше всего?',
    options: [
      { id: 'progress', label: 'Видимый прогресс' },
      { id: 'competition', label: 'Соревнование и команда' },
      { id: 'calm', label: 'Спокойствие и дисциплина' },
    ],
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { setOnboarded, setOnboardingAnswers } = useApp()
  const [step, setStep] = useState(-1) // -1 = intro
  const [answers, setAnswers] = useState({})

  function selectOption(key, id) {
    const next = { ...answers, [key]: id }
    setAnswers(next)
    setTimeout(() => {
      if (step + 1 < STEPS.length) {
        setStep(step + 1)
      } else {
        setOnboardingAnswers(next)
        setOnboarded(true)
        setStep(STEPS.length)
      }
    }, 220)
  }

  if (step === -1) {
    return (
      <div className="min-h-full flex flex-col justify-between px-6 pt-16 pb-10 bg-gradient-to-b from-ink-900 to-ink-950">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mb-8">
            <Sparkles className="text-gold-400" size={26} />
          </div>
          <h1 className="font-serif-jp text-3xl text-ink-50 leading-tight mb-4">
            Сила.<br />Дисциплина.<br />Твой путь.
          </h1>
          <p className="text-ink-400 text-sm leading-relaxed max-w-[280px]">
            Ответь на несколько вопросов — мы соберём твой персональный профиль тренировок в EN.
          </p>
        </div>
        <PrimaryButton onClick={() => setStep(0)}>Начать</PrimaryButton>
      </div>
    )
  }

  if (step === STEPS.length) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-b from-ink-900 to-ink-950">
        <div className="w-20 h-20 rounded-full bg-ink-800 border border-gold-500/40 flex items-center justify-center mb-6 animate-scaleIn">
          <Sparkles className="text-gold-400" size={32} />
        </div>
        <h1 className="text-ink-50 font-semibold text-2xl mb-2 animate-fadeUp">Твой профиль создан</h1>
        <p className="text-ink-400 text-sm mb-8 max-w-[280px] animate-fadeUp">
          Мы подобрали стартовый уровень и рекомендации на основе твоих ответов.
        </p>
        <div className="bg-ink-850 border border-ink-700 rounded-xl2 p-5 w-full mb-8 animate-fadeUp">
          <div className="flex items-center justify-between mb-3">
            <span className="text-ink-300 text-sm">Стартовый пояс</span>
            <BeltBadge beltId="white" />
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-ink-300 text-sm">Уровень</span>
            <span className="text-ink-50 font-semibold">1</span>
          </div>
          <ProgressBar value={5} max={100} />
        </div>
        <PrimaryButton onClick={() => navigate('/journey')}>Перейти в приложение</PrimaryButton>
      </div>
    )
  }

  const current = STEPS[step]
  return (
    <div className="min-h-full flex flex-col px-6 pt-10 pb-10 bg-ink-950">
      <div className="flex gap-1.5 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.key} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-gold-500' : 'bg-ink-800'}`} />
        ))}
      </div>
      <p className="text-ink-400 text-xs mb-2 tracking-wide uppercase">Шаг {step + 1} из {STEPS.length}</p>
      <h1 className="text-ink-50 font-semibold text-2xl mb-8 leading-tight">{current.title}</h1>
      <div className="flex flex-col gap-3">
        {current.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => selectOption(current.key, opt.id)}
            className={`text-left px-5 py-4 rounded-xl2 border transition-all active:scale-[0.98] ${
              answers[current.key] === opt.id
                ? 'border-gold-500 bg-gold-500/10 text-ink-50'
                : 'border-ink-700 bg-ink-850 text-ink-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="text-ink-400 text-sm mt-8 self-start">
          ← Назад
        </button>
      )}
    </div>
  )
}
