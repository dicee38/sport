import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useGamification } from '../../context/GamificationContext'
import { BeltBadge, ProgressBar, Card, SectionTitle, Sheet, PrimaryButton, FormatTag } from '../../components/ui'
import { DAILY_CHECKIN_OPTIONS, CHECKIN_RECOMMENDATIONS } from '../../data/mock'
import { Moon, ChevronRight, MessageCircle, Check } from 'lucide-react'

import DevTogglePanel from '../../components/gamification/DevTogglePanel'
import GemsBadge from '../../components/gamification/GemsBadge'
import StreakSection from '../../components/gamification/StreakSection'
import WarmupStreak from '../../components/gamification/WarmupStreak'
import MascotReaction from '../../components/gamification/MascotReaction'
import WeeklyGoalRing from '../../components/gamification/WeeklyGoalRing'

export default function Journey() {
  const navigate = useNavigate()
  const { user, checkinDone, setCheckinDone, setLastCheckin, schedule } = useApp()
  const { toggles } = useGamification()
  const [sheetOpen, setSheetOpen] = useState(!checkinDone)
  const [selectedMood, setSelectedMood] = useState(null)

  const nextClass = schedule.flatMap((d) => d.classes.map((c) => ({ ...c, day: d.day }))).find((c) => c.recommended) ||
    schedule[0].classes[0]

  function confirmMood(mood) {
    setSelectedMood(mood)
    setLastCheckin(mood)
  }

  function closeCheckin() {
    setCheckinDone(true)
    setSheetOpen(false)
  }

  const rec = selectedMood ? CHECKIN_RECOMMENDATIONS[selectedMood] : null
  const hasGamification = toggles.streak || toggles.warmup || toggles.weeklyGoal || toggles.mascot

  return (
    <div className="pb-8">
      <DevTogglePanel />

      <div className="px-5 pt-6 pb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-ink-400 text-sm">Привет,</p>
          <h1 className="text-ink-50 text-2xl font-semibold truncate">{user.name} 👋</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {toggles.gems && <GemsBadge />}
          <button onClick={() => navigate('/profile')} className="w-11 h-11 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-ink-100 font-semibold shrink-0">
            {user.name[0]}
          </button>
        </div>
      </div>

      <div className="px-5 mb-5">
        <Card className="bg-gradient-to-br from-ink-850 to-ink-900">
          <div className="flex items-center justify-between mb-3">
            <BeltBadge beltId={user.belt} />
            <span className="text-ink-400 text-xs">Level {user.level} · {user.levelLabel}</span>
          </div>
          <ProgressBar value={user.xp} max={user.xpToNext} colorClass="bg-gradient-to-r from-gold-600 to-gold-400" height="h-2.5" />
          <p className="text-ink-400 text-xs mt-2">{user.xp} / {user.xpToNext} XP до следующего уровня</p>
        </Card>
      </div>

      {toggles.mascot && (
        <div className="px-5 mb-5">
          <MascotReaction />
        </div>
      )}

      {hasGamification && (
        <div className="px-5 mb-5 flex flex-col gap-5">
          {toggles.weeklyGoal && <WeeklyGoalRing />}
          {toggles.streak && <StreakSection />}
          {toggles.warmup && <WarmupStreak />}
        </div>
      )}

      <div className="px-5 mb-5">
        <SectionTitle>Ближайшая тренировка</SectionTitle>
        <Card onClick={() => navigate('/train')}>
          <div className="flex items-start justify-between">
            <div>
              <FormatTag formatId={nextClass.format} />
              <p className="text-ink-50 font-semibold mt-2">{nextClass.day}, {nextClass.time}</p>
              <p className="text-ink-400 text-xs mt-1">Тренер: {nextClass.trainer}</p>
            </div>
            <ChevronRight className="text-ink-500" size={18} />
          </div>
        </Card>
      </div>

      <div className="px-5 mb-5">
        <Card onClick={() => navigate('/journey/coach')} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
            <MessageCircle className="text-gold-400" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-ink-50 font-medium text-sm">AI Coach</p>
            <p className="text-ink-400 text-xs">Спроси про тренировку, восстановление или прогресс</p>
          </div>
          <ChevronRight className="text-ink-500" size={18} />
        </Card>
      </div>

      <div className="px-5">
        <SectionTitle>Sleep & Recovery</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <Moon className="text-blue-300 mb-2" size={18} />
            <p className="text-ink-50 font-semibold text-xl">{user.sleep.hours}ч</p>
            <p className="text-ink-400 text-xs">{user.sleep.quality} · {user.sleep.trend}</p>
          </Card>
          <Card>
            <div className="w-[18px] h-[18px] rounded-full border-2 border-matcha-400 mb-2" />
            <p className="text-ink-50 font-semibold text-xl">{user.recovery.score}/100</p>
            <p className="text-ink-400 text-xs">{user.recovery.label}</p>
          </Card>
        </div>
      </div>

      <Sheet open={sheetOpen} onClose={closeCheckin} title="Как ты себя чувствуешь сегодня?">
        {!selectedMood ? (
          <div className="grid grid-cols-2 gap-3">
            {DAILY_CHECKIN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => confirmMood(opt.id)}
                className="flex flex-col items-center gap-2 py-5 rounded-xl2 bg-ink-850 border border-ink-700 active:scale-[0.97] transition-transform"
              >
                <span className="text-3xl">{opt.emoji}</span>
                <span className="text-ink-200 text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-fadeUp">
            <div className="flex items-center gap-2 mb-4 text-ink-400 text-xs uppercase tracking-wide">
              <Check size={14} className="text-matcha-400" /> AI-рекомендация
            </div>
            <Card className="mb-5">
              <FormatTag formatId={rec.format} />
              <p className="text-ink-50 font-semibold mt-2">{rec.title}</p>
              <p className="text-ink-400 text-sm mt-2 leading-relaxed">{rec.reason}</p>
            </Card>
            <PrimaryButton onClick={closeCheckin}>Отлично, записаться позже</PrimaryButton>
          </div>
        )}
      </Sheet>
    </div>
  )
}
