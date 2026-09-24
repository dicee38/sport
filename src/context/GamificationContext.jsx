import { createContext, useContext, useState, useCallback, useRef } from 'react'
import {
  LEAGUE_TIERS, CURRENT_LEAGUE_INDEX, DAILY_QUESTS, WEEKLY_QUESTS,
} from '../data/gamification'

const GamificationCtx = createContext(null)

export const DEFAULT_TOGGLES = {
  leagues: true,
  streak: true,
  warmup: true,
  xp: true,
  quests: true,
  gems: true,
  achievements: true,
  friends: true,
  mascot: true,
  notifications: true,
  weeklyGoal: true,
}

const TOGGLE_LABELS = {
  streak: '2. Streak + заморозка · Journey',
  warmup: '3. Прогревочный стрик · Journey',
  weeklyGoal: '11. Недельная цель · Journey',
  mascot: '9. Маскот-реакции · Journey',
  gems: '6. Gems в шапке · Journey',
  xp: '4. XP / x2 события · Train',
  quests: '5. Квесты · Train',
  leagues: '1. Лиги · Season',
  friends: '8. Друзья · Community',
  achievements: '7. Ачивки · Profile',
  notifications: '10. Push-уведомления · Profile',
}

export function GamificationProvider({ children }) {
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES)
  const [devPanelOpen, setDevPanelOpen] = useState(false)

  const [gems, setGems] = useState(180)
  const addGems = useCallback((n) => setGems((g) => g + n), [])

  const [sessionXp, setSessionXp] = useState(0)
  const [xpGainEvents, setXpGainEvents] = useState([])
  const xpEventId = useRef(0)
  const triggerXpGain = useCallback((amount, label) => {
    const id = ++xpEventId.current
    setXpGainEvents((prev) => [...prev, { id, amount, label }])
    setSessionXp((prev) => prev + amount)
    setTimeout(() => {
      setXpGainEvents((prev) => prev.filter((e) => e.id !== id))
    }, 1600)
  }, [])
  const [doubleXpActive, setDoubleXpActive] = useState(true)

  const [streakFreezes, setStreakFreezes] = useState(2)
  const [freezeUsedToday, setFreezeUsedToday] = useState(false)
  const applyStreakFreeze = useCallback(() => {
    setStreakFreezes((n) => Math.max(0, n - 1))
    setFreezeUsedToday(true)
  }, [])
  const [streakThreatDismissed, setStreakThreatDismissed] = useState(false)

  const [warmupActive, setWarmupActive] = useState(true)
  const [warmupDay] = useState(3)
  const warmupTarget = 5
  const [justGraduated, setJustGraduated] = useState(false)
  const completeWarmup = useCallback(() => {
    setWarmupActive(false)
    setJustGraduated(true)
    setTimeout(() => setJustGraduated(false), 2400)
  }, [])

  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState(4)
  const [weeklyGoalDone] = useState(3)

  const [leagueIndex, setLeagueIndex] = useState(CURRENT_LEAGUE_INDEX)
  const [promotionAnim, setPromotionAnim] = useState(false)
  const promoteLeague = useCallback(() => {
    if (leagueIndex >= LEAGUE_TIERS.length - 1) return
    setPromotionAnim(true)
    setTimeout(() => {
      setLeagueIndex((i) => Math.min(LEAGUE_TIERS.length - 1, i + 1))
    }, 900)
    setTimeout(() => setPromotionAnim(false), 2600)
  }, [leagueIndex])

  const [dailyQuests, setDailyQuests] = useState(DAILY_QUESTS)
  const [weeklyQuests, setWeeklyQuests] = useState(WEEKLY_QUESTS)
  const claimQuest = useCallback((listSetter, id) => {
    listSetter((prev) =>
      prev.map((q) => {
        if (q.id !== id || q.claimed || q.progress < q.target) return q
        if (q.rewardType === 'gems') addGems(q.reward)
        else triggerXpGain(q.reward, 'Quest')
        return { ...q, claimed: true }
      })
    )
  }, [addGems, triggerXpGain])
  const claimDailyQuest = (id) => claimQuest(setDailyQuests, id)
  const claimWeeklyQuest = (id) => claimQuest(setWeeklyQuests, id)

  const [mascotVariant, setMascotVariant] = useState('character')

  function setToggle(key, value) {
    setToggles((prev) => ({ ...prev, [key]: value }))
  }

  const value = {
    toggles, setToggle, TOGGLE_LABELS,
    devPanelOpen, setDevPanelOpen,
    gems, addGems,
    sessionXp, xpGainEvents, triggerXpGain,
    doubleXpActive, setDoubleXpActive,
    streakFreezes, freezeUsedToday, applyStreakFreeze,
    streakThreatDismissed, setStreakThreatDismissed,
    warmupActive, warmupDay, warmupTarget, justGraduated, completeWarmup,
    weeklyGoalTarget, setWeeklyGoalTarget, weeklyGoalDone,
    leagueIndex, promotionAnim, promoteLeague, leagueTiers: LEAGUE_TIERS,
    dailyQuests, weeklyQuests, claimDailyQuest, claimWeeklyQuest,
    mascotVariant, setMascotVariant,
  }

  return <GamificationCtx.Provider value={value}>{children}</GamificationCtx.Provider>
}

export function useGamification() {
  const ctx = useContext(GamificationCtx)
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider')
  return ctx
}
