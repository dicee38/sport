// ============================================================
// Mock-данные для слоя геймификации. Всё захардкожено, без бэкенда.
// ============================================================

export const LEAGUE_TIERS = [
  { id: 'white', name: 'White Belt League', color: '#f5f2ea', text: '#141416' },
  { id: 'yellow', name: 'Yellow Belt League', color: '#e8c547', text: '#141416' },
  { id: 'green', name: 'Green Belt League', color: '#6f9c5b', text: '#0d0f0a' },
  { id: 'blue', name: 'Blue Belt League', color: '#3f6fa8', text: '#eef3fa' },
  { id: 'black', name: 'Black Belt League', color: '#1a1a1a', text: '#c9a35f' },
]

export const CURRENT_LEAGUE_INDEX = 2 // Green Belt League

export const LEAGUE_PLAYERS = [
  { id: 'p1', name: 'Мана Ямагути', points: 890, you: false },
  { id: 'p2', name: 'Екатерина Волкова', points: 845, you: false },
  { id: 'p3', name: 'Aya Fujimoto', points: 790, you: false },
  { id: 'p4', name: 'Хана Мидзогути', points: 742, you: true },
  { id: 'p5', name: 'Rin Okada', points: 710, you: false },
  { id: 'p6', name: 'Юкари Хонда', points: 688, you: false },
  { id: 'p7', name: 'Hina Suzuki', points: 654, you: false },
  { id: 'p8', name: 'Aisha Al Farsi', points: 601, you: false },
  { id: 'p9', name: 'Noor Al Suwaidi', points: 560, you: false },
  { id: 'p10', name: 'Саяка Мураками', points: 512, you: false },
  { id: 'p11', name: 'Fatima Al Marri', points: 470, you: false },
  { id: 'p12', name: 'Мария Соколова', points: 402, you: false },
].sort((a, b) => b.points - a.points)

export const PROMOTION_ZONE = 3
export const DEMOTION_ZONE = 3

export const ACHIEVEMENTS = [
  { id: 'a1', label: '7 дней подряд', icon: '🔥', unlocked: true },
  { id: 'a2', label: 'Первый Boxing', icon: '🥊', unlocked: true },
  { id: 'a3', label: '5 форматов', icon: '🎯', unlocked: true },
  { id: 'a4', label: 'Пригласила подругу', icon: '🤝', unlocked: false },
  { id: 'a5', label: '30 дней подряд', icon: '⚡', unlocked: false },
  { id: 'a6', label: 'Синий пояс', icon: '🥋', unlocked: true },
  { id: 'a7', label: '100 тренировок', icon: '💯', unlocked: false },
  { id: 'a8', label: 'Ночная сова', icon: '🌙', unlocked: true, desc: 'Тренировка после 20:00' },
  { id: 'a9', label: 'Ранняя пташка', icon: '🌅', unlocked: false, desc: 'Тренировка до 07:30' },
  { id: 'a10', label: 'Путешественница', icon: '🗺️', unlocked: true, desc: 'Тренировка в другом городе' },
  { id: 'a11', label: 'Командный дух', icon: '🏆', unlocked: false, desc: 'Участие в Team Cup' },
  { id: 'a12', label: 'Идеальная неделя', icon: '✨', unlocked: false, desc: 'Выполнена недельная цель 4 недели подряд' },
].map((a) => ({
  ...a,
  desc: a.desc || defaultDesc(a.label),
}))

function defaultDesc(label) {
  const map = {
    '7 дней подряд': 'Тренируйся 7 дней без перерыва',
    'Первый Boxing': 'Посети свой первый класс Boxing',
    '5 форматов': 'Попробуй 5 разных форматов тренировок',
    'Пригласила подругу': 'Пригласи подругу на пробную тренировку',
    '30 дней подряд': 'Тренируйся 30 дней без перерыва',
    'Синий пояс': 'Получи синий пояс',
    '100 тренировок': 'Посети 100 тренировок суммарно',
  }
  return map[label] || label
}

export const FRIENDS = [
  { id: 'f1', name: 'Мана', level: 30, streak: 21, weekSessions: [1, 1, 0, 1, 1, 1, 0], cheered: false },
  { id: 'f2', name: 'Юкари', level: 22, streak: 5, weekSessions: [1, 0, 1, 0, 1, 0, 0], cheered: false },
  { id: 'f3', name: 'Hina', level: 18, streak: 2, weekSessions: [0, 1, 0, 0, 1, 0, 0], cheered: false },
  { id: 'f4', name: 'Rin', level: 26, streak: 0, weekSessions: [1, 0, 0, 0, 0, 0, 0], cheered: false },
]

export const DAILY_QUESTS = [
  { id: 'dq1', label: 'Сделай чек-ин сегодня', progress: 1, target: 1, reward: 15, rewardType: 'xp' },
  { id: 'dq2', label: 'Заверши 1 тренировку', progress: 0, target: 1, reward: 20, rewardType: 'xp' },
  { id: 'dq3', label: 'Набери 50 XP', progress: 30, target: 50, reward: 5, rewardType: 'gems' },
]

export const WEEKLY_QUESTS = [
  { id: 'wq1', label: 'Выполни 3 тренировки на этой неделе', progress: 2, target: 3, reward: 40, rewardType: 'gems' },
  { id: 'wq2', label: 'Попробуй новый формат', progress: 0, target: 1, reward: 25, rewardType: 'gems' },
  { id: 'wq3', label: 'Пригласи подругу', progress: 0, target: 1, reward: 60, rewardType: 'gems' },
]

export const NOTIFICATIONS_PREVIEW = [
  {
    id: 'n1',
    icon: '⏰',
    title: 'Пора на тренировку',
    text: 'Boxing с Haruka Ito начинается через 60 минут в EN Omotesando.',
    time: '18:15',
  },
  {
    id: 'n2',
    icon: '🔥',
    title: 'Стрик под угрозой!',
    text: 'Ты не тренировалась вчера — заверши тренировку сегодня, чтобы не потерять streak 12 дней.',
    time: '09:00',
  },
  {
    id: 'n3',
    icon: '🏆',
    title: 'Тебя обогнали в лиге',
    text: 'Rin Okada обогнала тебя в Green Belt League. Тренировка вернёт тебе позицию.',
    time: 'вчера',
  },
  {
    id: 'n4',
    icon: '⚡',
    title: 'Двойные XP только сегодня!',
    text: 'Все тренировки сегодня дают x2 XP. Не пропусти.',
    time: '07:30',
  },
  {
    id: 'n5',
    icon: '🎯',
    title: 'Квест почти закрыт',
    text: 'Осталась 1 тренировка, чтобы выполнить недельный квест и получить 40 💎.',
    time: 'вчера',
  },
  {
    id: 'n6',
    icon: '🧊',
    title: 'Заморозка спасла стрик',
    text: 'Мы автоматически применили streak freeze — твои 12 дней подряд в безопасности.',
    time: '3 дня назад',
  },
  {
    id: 'n7',
    icon: '💌',
    title: 'Мана подбодрила тебя',
    text: '«Давай, ты справишься! 💪» — Мана прислала тебе поддержку перед вечерней тренировкой.',
    time: '2 дня назад',
  },
]

export const MASCOT_MESSAGES = {
  streakHigh: { emoji: '🔥', text: 'Двенадцать дней подряд! Ты в огне — не останавливайся.' },
  streakThreat: { emoji: '😟', text: 'Вчера тренировки не было... стрик в опасности!' },
  warmup: { emoji: '🌱', text: 'Отличное начало! Ещё пара дней — и стрик станет постоянным.' },
  questDone: { emoji: '🎉', text: 'Квест выполнен! Забери награду.' },
  idle: { emoji: '🙂', text: 'Готова к сегодняшней тренировке?' },
}
