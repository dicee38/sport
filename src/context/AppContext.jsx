import { createContext, useContext, useMemo, useState } from 'react'
import { USER, CITIES, buildSchedule, SEASON } from '../data/mock'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [onboarded, setOnboarded] = useState(false)
  const [onboardingAnswers, setOnboardingAnswers] = useState({})
  const [user] = useState(USER)
  const [cityId, setCityId] = useState(USER.homeCity)
  const [checkinDone, setCheckinDone] = useState(false)
  const [lastCheckin, setLastCheckin] = useState(null)
  const [bookedClassIds, setBookedClassIds] = useState(['cls-0-4-4'])
  const [waitlistedClassIds, setWaitlistedClassIds] = useState([])
  const [cart, setCart] = useState([])
  const [seasonTasks, setSeasonTasks] = useState(SEASON.challenge.tasks)

  const citySeed = useMemo(() => CITIES.findIndex((c) => c.id === cityId), [cityId])
  const schedule = useMemo(() => buildSchedule(Math.max(citySeed, 0) + 1), [citySeed])
  const city = useMemo(() => CITIES.find((c) => c.id === cityId), [cityId])

  function toggleBook(classId) {
    setBookedClassIds((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    )
  }

  function toggleWaitlist(classId) {
    setWaitlistedClassIds((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    )
  }

  function addToCart(item) {
    setCart((prev) => [...prev, item])
  }

  function toggleSeasonTask(taskId) {
    setSeasonTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    )
  }

  const value = {
    onboarded, setOnboarded,
    onboardingAnswers, setOnboardingAnswers,
    user,
    cityId, setCityId, city,
    schedule,
    checkinDone, setCheckinDone,
    lastCheckin, setLastCheckin,
    bookedClassIds, toggleBook,
    waitlistedClassIds, toggleWaitlist,
    cart, addToCart,
    seasonTasks, toggleSeasonTask,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
