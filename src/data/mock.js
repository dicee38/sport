// ============================================================
// Полностью статичные mock-данные. Никаких сетевых вызовов.
// ============================================================

export const BELTS = [
  { id: 'white', label: 'White', color: '#f5f2ea', text: '#141416' },
  { id: 'yellow', label: 'Yellow', color: '#e8c547', text: '#141416' },
  { id: 'orange', label: 'Orange', color: '#d67d3e', text: '#141416' },
  { id: 'green', label: 'Green', color: '#6f9c5b', text: '#0d0f0a' },
  { id: 'blue', label: 'Blue', color: '#3f6fa8', text: '#eef3fa' },
  { id: 'purple', label: 'Purple', color: '#7a5ca8', text: '#f2eefa' },
  { id: 'brown', label: 'Brown', color: '#6b4a34', text: '#f5ece5' },
  { id: 'black', label: 'Black', color: '#1a1a1a', text: '#c9a35f' },
]

export const CITIES = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    studios: ['EN Omotesando', 'EN Nakameguro'],
  },
  {
    id: 'osaka',
    name: 'Osaka',
    country: 'Japan',
    studios: ['EN Umeda'],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    studios: ['EN DIFC', 'EN Jumeirah'],
  },
  {
    id: 'moscow',
    name: 'Moscow',
    country: 'Russia',
    studios: ['EN Patriki'],
  },
]

export const FORMATS = [
  { id: 'boxing', label: 'Boxing', color: '#c1573f', icon: 'Swords' },
  { id: 'latin', label: 'Latin Flow', color: '#c9a35f', icon: 'Music' },
  { id: 'mobility', label: 'Mobility', color: '#7c8f6e', icon: 'Wind' },
  { id: 'strength', label: 'Strength', color: '#6b7280', icon: 'Dumbbell' },
  { id: 'recovery', label: 'Recovery', color: '#3f6fa8', icon: 'Moon' },
  { id: 'hiit', label: 'HIIT', color: '#a8452f', icon: 'Flame' },
]

export const TRAINERS = [
  { id: 't1', name: 'Aiko Tanaka', specialties: ['boxing', 'hiit'], bio: '8 лет в боксе, экс-сборница Японии по кикбоксингу.' },
  { id: 't2', name: 'Rina Sato', specialties: ['latin'], bio: 'Хореограф, ставила номера для студий Токио и Осаки.' },
  { id: 't3', name: 'Mei Kobayashi', specialties: ['mobility', 'recovery'], bio: 'Сертификат по функциональному растяжению и дыхательным практикам.' },
  { id: 't4', name: 'Yuna Kim', specialties: ['strength'], bio: 'Пауэрлифтер-любитель, тренирует силовую базу 6 лет.' },
  { id: 't5', name: 'Haruka Ito', specialties: ['boxing', 'strength'], bio: 'Экс-профи боксёр, ведёт продвинутые группы.' },
  { id: 't6', name: 'Nozomi Endo', specialties: ['recovery', 'mobility'], bio: 'Йога-тичер, специалист по восстановлению после травм.' },
]

function trainerFor(specialty, seed = 0) {
  const list = TRAINERS.filter((t) => t.specialties.includes(specialty))
  return list[seed % list.length]
}

export function buildSchedule(citySeed = 0) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const template = [
    ['07:00', 'boxing', 60, 45 + citySeed],
    ['09:00', 'mobility', 50, 30],
    ['12:30', 'latin', 45, 40],
    ['18:00', 'strength', 55, 50],
    ['19:15', 'boxing', 60, 48],
    ['20:30', 'recovery', 40, 20],
  ]
  return days.map((day, di) => ({
    day,
    classes: template.map(([time, format, duration, capacity], ci) => {
      const seedNum = di * 6 + ci + citySeed
      const booked = Math.min(capacity, Math.round(capacity * (0.5 + ((seedNum * 37) % 50) / 100)))
      const waitlist = booked >= capacity ? ((seedNum * 13) % 5) : 0
      return {
        id: `cls-${citySeed}-${di}-${ci}`,
        time,
        format,
        duration,
        capacity,
        booked,
        waitlist,
        trainer: trainerFor(format, seedNum).name,
        recommended: ci === 4 && di % 2 === 0,
      }
    }),
  }))
}

export const SCHEDULE = buildSchedule(0)

export const SKILLS_PROGRESS = {
  boxing: [
    { skill: 'Footwork', value: 80 },
    { skill: 'Jab', value: 100 },
    { skill: 'Hooks', value: 62 },
    { skill: 'Defense', value: 45 },
    { skill: 'Combos', value: 30 },
  ],
  strength: [
    { skill: 'Squat form', value: 70 },
    { skill: 'Core stability', value: 85 },
    { skill: 'Posterior chain', value: 55 },
  ],
  mobility: [
    { skill: 'Hip mobility', value: 65 },
    { skill: 'Thoracic rotation', value: 40 },
    { skill: 'Ankle mobility', value: 58 },
  ],
}

export const USER = {
  name: 'Хана',
  fullName: 'Хана Мидзогути',
  level: 14,
  levelLabel: 'Disciplined',
  belt: 'green',
  xp: 2340,
  xpToNext: 3000,
  streak: 12,
  streakHistory: [true, true, false, true, true, true, true],
  memberSince: 'Март 2023',
  homeCity: 'tokyo',
  studiosVisited: ['EN Omotesando', 'EN Nakameguro', 'EN Umeda', 'EN DIFC'],
  countriesVisited: ['Japan', 'UAE'],
  seasonsCompleted: 4,
  challengesCompleted: 11,
  sleep: { hours: 7.2, quality: 'Good', trend: '+0.4ч к среднему' },
  recovery: { score: 78, label: 'Готова к интенсиву', hrv: 62 },
}

export const DAILY_CHECKIN_OPTIONS = [
  { id: 'energised', emoji: '⚡', label: 'Энергична' },
  { id: 'okay', emoji: '🙂', label: 'В порядке' },
  { id: 'tired', emoji: '😮‍💨', label: 'Устала' },
  { id: 'sore', emoji: '🤕', label: 'Мышцы болят' },
]

export const CHECKIN_RECOMMENDATIONS = {
  energised: {
    format: 'boxing',
    title: 'Boxing — 19:15 с Aiko Tanaka',
    reason: 'Энергии много, а последняя силовая была 3 дня назад — самое время дать высокую интенсивность.',
  },
  okay: {
    format: 'strength',
    title: 'Strength — 18:00 с Yuna Kim',
    reason: 'Состояние стабильное. Хороший день для базовой силовой работы без пиковых нагрузок.',
  },
  tired: {
    format: 'mobility',
    title: 'Mobility — 09:00 с Mei Kobayashi',
    reason: 'После двух интенсивных тренировок подряд лучше выбрать Mobility — это ускорит восстановление и не увеличит нагрузку.',
  },
  sore: {
    format: 'recovery',
    title: 'Recovery — 20:30 с Nozomi Endo',
    reason: 'Мышечная боль — сигнал переключиться на Recovery: дыхание, миофасциальный релиз, лёгкая растяжка.',
  },
}

export const AI_COACH_SCENARIOS = [
  {
    id: 'q1',
    prompt: 'Какую тренировку выбрать сегодня?',
    reply:
      'Смотрю на твою историю: два дня подряд Boxing и Strength, сон 7.2ч — неплохо, но recovery score 78. Я бы предложила Mobility в 09:00 с Mei — это снимет накопленное напряжение в бёдрах и грудном отделе, а завтра сможешь вернуться на Boxing в полную силу.',
  },
  {
    id: 'q2',
    prompt: 'Почему я застряла на зелёном поясе?',
    reply:
      'До синего пояса тебе не хватает стабильности в Defense (45%) и Combos (30%) — это единственные навыки ниже 60%. Предлагаю на следующей неделе взять 2 занятия Boxing с акцентом на комбинации у Haruka — она сильна именно в этом.',
  },
  {
    id: 'q3',
    prompt: 'Как мне спланировать неделю перед соревнованием команд?',
    reply:
      'До Team Cup осталось 6 дней. Предлагаю: Пн — Strength (база), Ср — Boxing интенсив, Пт — лёгкая Mobility, чтобы прийти отдохнувшей. Такой ритм у тебя давал лучший результат в прошлом сезоне.',
  },
  {
    id: 'q4',
    prompt: 'Что с моим сном в последнюю неделю?',
    reply:
      'Средняя продолжительность сна выросла на 0.4ч по сравнению с прошлой неделей — это хорошо влияет на recovery score (сейчас 78/100). Постарайся сохранить время отбоя стабильным ещё 3-4 дня, это закрепит эффект.',
  },
  {
    id: 'q5',
    prompt: 'Дай совет по питанию перед вечерней тренировкой',
    reply:
      'Перед Boxing в 19:15 лучше лёгкий приём пищи за 2 часа: сложные углеводы + немного белка (например, рис с курицей). Это частая рекомендация от тренеров студии для вечерних высокоинтенсивных классов.',
  },
]

export const SEASON = {
  name: 'Autumn Discipline',
  theme: 'Сезон дисциплины и техники',
  daysLeft: 18,
  progress: 64,
  challenge: {
    title: 'Autumn Discipline Challenge',
    tasks: [
      { id: 'c1', label: 'Посетить 12 тренировок за сезон', done: true },
      { id: 'c2', label: 'Пройти 3 разных формата', done: true },
      { id: 'c3', label: 'Streak 7+ дней подряд', done: true },
      { id: 'c4', label: 'Пригласить подругу на пробную', done: false },
      { id: 'c5', label: 'Посетить Recovery класс', done: false },
      { id: 'c6', label: 'Финальный Boxing intensive', done: false },
    ],
  },
}

export const SEASON_PASS_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '0 ¥',
    highlight: false,
    perks: ['Доступ к базовому расписанию', 'Streak-трекер', 'Community лента'],
  },
  {
    id: 'season',
    name: 'Season',
    price: '4 800 ¥ / сезон',
    highlight: true,
    perks: [
      'Всё из Free',
      'Приоритет записи за 48ч',
      'Season Pass challenge-награды',
      '1 гостевой визит в месяц',
    ],
  },
  {
    id: 'inner',
    name: 'Inner Circle',
    price: '12 000 ¥ / сезон',
    highlight: false,
    perks: [
      'Всё из Season',
      'Личный AI-план восстановления',
      'Доступ к Journey-турам от 1 уровня',
      'Закрытые мероприятия сообщества',
      'Season merch — бесплатно',
    ],
  },
]

export const SEASON_MERCH = [
  { id: 'm1', name: 'Ink Tee — Autumn Drop', price: '5 200 ¥', limited: true },
  { id: 'm2', name: 'Studio Hoodie — Charcoal', price: '11 800 ¥', limited: true },
  { id: 'm3', name: 'Grip Gloves — Vermillion', price: '8 400 ¥', limited: false },
  { id: 'm4', name: 'Recovery Band Set', price: '3 600 ¥', limited: false },
]

export const COMMUNITY_EVENTS = [
  {
    id: 'ev1',
    title: 'Sunrise Boxing на крыше',
    date: '28 сентября, 07:00',
    studio: 'EN Omotesando',
    price: '2 500 ¥',
    spotsLeft: 6,
  },
  {
    id: 'ev2',
    title: 'Latin Flow Block Party',
    date: '4 октября, 19:00',
    studio: 'EN Nakameguro',
    price: '3 000 ¥',
    spotsLeft: 14,
  },
  {
    id: 'ev3',
    title: 'Recovery Sound Bath',
    date: '11 октября, 20:00',
    studio: 'EN DIFC',
    price: 'Free (Inner Circle)',
    spotsLeft: 3,
  },
]

export const TEAM_COMPETITION = {
  title: 'Team Cup — Autumn Season',
  daysLeft: 6,
  teams: [
    { id: 'teamA', name: 'Team Indigo', studio: 'EN Omotesando', score: 4820, color: '#3f6fa8' },
    { id: 'teamB', name: 'Team Vermillion', studio: 'EN Nakameguro', score: 4610, color: '#c1573f' },
  ],
}

export const COMMUNITY_BADGES = [
  { id: 'b1', member: 'М.', badge: 'Streak Master — 30 дней', time: '2ч назад' },
  { id: 'b2', member: 'С.', badge: 'Первый синий пояс', time: '5ч назад' },
  { id: 'b3', member: 'Р.', badge: '100 тренировок', time: 'вчера' },
  { id: 'b4', member: 'А.', badge: 'Japan Journey завершён', time: '2 дня назад' },
  { id: 'b5', member: 'К.', badge: 'Season Challenge закрыт', time: '3 дня назад' },
]

export const JOURNEYS = [
  {
    id: 'jr1',
    title: 'Japan Journey',
    description: '7 дней, 4 студии, кастомные тренировки и культурная программа в Токио и Киото.',
    minLevel: 10,
    price: 'от 189 000 ¥',
  },
  {
    id: 'jr2',
    title: 'Bali Recovery Retreat',
    description: '5 дней восстановления: mobility, дыхание, океан. Для тех, кому нужна перезагрузка.',
    minLevel: 5,
    price: 'от 142 000 ¥',
  },
  {
    id: 'jr3',
    title: 'Dubai Strength Camp',
    description: 'Интенсив по силовой подготовке с командой EN DIFC.',
    minLevel: 18,
    price: 'от 210 000 ¥',
  },
]

export const REWARDS_LADDER = [
  { milestone: 10, reward: 'Именная бирка на сумку', done: true },
  { milestone: 25, reward: 'Grip Gloves в подарок', done: true },
  { milestone: 50, reward: 'Персональная фотосессия', done: true },
  { milestone: 100, reward: 'Season Pass Inner Circle — 1 сезон', done: false },
  { milestone: 250, reward: 'Гостевой визит в любую студию мира', done: false },
  { milestone: 500, reward: 'Именной пояс + место в Hall of Belts', done: false },
]

export const WALLET = [
  { id: 'w1', type: 'Membership', label: 'Unlimited Monthly', status: 'Активна до 14 окт' },
  { id: 'w2', type: 'Credits', label: '4 занятия', status: 'Сгорают 30 сен' },
  { id: 'w3', type: 'Ticket', label: 'Sunrise Boxing', status: '28 сен, 07:00' },
  { id: 'w4', type: 'Reward', label: 'Grip Gloves (получено)', status: 'Использовано' },
]

export const SHOP_ITEMS = [
  { id: 's1', name: 'Ink Tee — Autumn Drop', price: '5 200 ¥', tag: 'Season Drop' },
  { id: 's2', name: 'Studio Hoodie — Charcoal', price: '11 800 ¥', tag: 'Season Drop' },
  { id: 's3', name: 'Wrap Set — Vermillion', price: '2 400 ¥', tag: 'Essentials' },
  { id: 's4', name: 'Studio Tote', price: '3 100 ¥', tag: 'Essentials' },
  { id: 's5', name: 'Recovery Band Set', price: '3 600 ¥', tag: 'Recovery' },
]

// ============================================================
// HQ Dashboard mock data
// ============================================================

export const NETWORK_KPIS = {
  activeMembers: { value: '18 420', delta: '+4.2%' },
  retention: { value: '86.4%', delta: '+1.1%' },
  arpu: { value: '¥14 900', delta: '+2.8%' },
  attendance: { value: '71.3%', delta: '-0.6%' },
  nps: { value: '68', delta: '+3' },
  churn: { value: '4.1%', delta: '-0.4%' },
}

export const NETWORK_TREND = [
  { month: 'Апр', members: 15600, retention: 82.1, attendance: 69.4 },
  { month: 'Май', members: 16100, retention: 83.0, attendance: 70.1 },
  { month: 'Июн', members: 16800, retention: 83.9, attendance: 68.9 },
  { month: 'Июл', members: 17250, retention: 84.6, attendance: 70.5 },
  { month: 'Авг', members: 17790, retention: 85.5, attendance: 71.0 },
  { month: 'Сен', members: 18420, retention: 86.4, attendance: 71.3 },
]

export const STUDIOS = [
  {
    id: 'st1',
    name: 'EN Omotesando',
    city: 'Tokyo',
    status: 'green',
    members: 1240,
    attendance: 74.2,
    trend: '+2.1%',
    insight: 'Стабильный рост. Boxing evening-классы — лучшая конверсия в сети.',
  },
  {
    id: 'st2',
    name: 'EN Nakameguro',
    city: 'Tokyo',
    status: 'yellow',
    members: 980,
    attendance: 66.8,
    trend: '-3.4%',
    insight: '↓ Attendance → ↓ Boxing → ↓ Tuesday evening → Trainer X. Похожий паттерн держится 3 недели подряд.',
  },
  {
    id: 'st3',
    name: 'EN Umeda',
    city: 'Osaka',
    status: 'green',
    members: 870,
    attendance: 73.0,
    trend: '+1.8%',
    insight: 'Latin Flow стал самым популярным форматом после запуска нового расписания.',
  },
  {
    id: 'st4',
    name: 'EN DIFC',
    city: 'Dubai',
    status: 'red',
    members: 610,
    attendance: 54.3,
    trend: '-8.9%',
    insight: '↓ Retention → ↓ Repeat visits новых участниц → слабая onboarding-конверсия в первые 14 дней.',
  },
  {
    id: 'st5',
    name: 'EN Jumeirah',
    city: 'Dubai',
    status: 'yellow',
    members: 540,
    attendance: 63.1,
    trend: '-1.2%',
    insight: 'Recovery-классы недозаполнены по будням — возможность для промо.',
  },
  {
    id: 'st6',
    name: 'EN Patriki',
    city: 'Moscow',
    status: 'green',
    members: 1180,
    attendance: 77.5,
    trend: '+3.6%',
    insight: 'Лучший показатель NPS в сети (74). Команда тренеров стабильна 18 месяцев.',
  },
]

export const MEMBERS = [
  {
    id: 'mem1', name: 'Юкари Хонда', studio: 'EN Omotesando', level: 22, belt: 'blue',
    goal: 'Подготовка к соревнованиям по боксу', attendanceRate: 88,
    attendance: [true, true, true, false, true, true, true, true, true, false, true, true],
    purchases: ['Season Pass Inner Circle', 'Grip Gloves', 'Ink Tee'],
    trainerNotes: 'Отличная техника джеба, стоит поработать над defense.',
    comms: [{ date: '18 сен', channel: 'App push', text: 'Напоминание о записи на Boxing' }, { date: '10 сен', channel: 'Email', text: 'Поздравление с синим поясом' }],
  },
  {
    id: 'mem2', name: 'Саяка Мураками', studio: 'EN Nakameguro', level: 8, belt: 'yellow',
    goal: 'Снижение веса и общий тонус', attendanceRate: 41,
    attendance: [true, false, false, true, false, false, true, false, false, false, false, true],
    purchases: ['Unlimited Monthly'],
    trainerNotes: 'Посещаемость снизилась после августа, стоит связаться.',
    comms: [{ date: '2 сен', channel: 'SMS', text: 'Скидка на Mobility-класс' }],
  },
  {
    id: 'mem3', name: 'Мана Ямагути', studio: 'EN Umeda', level: 30, belt: 'purple',
    goal: 'Поддержание формы + сообщество', attendanceRate: 92,
    attendance: [true, true, true, true, true, false, true, true, true, true, true, true],
    purchases: ['Season Pass Inner Circle', 'Studio Hoodie', 'Bali Recovery Retreat'],
    trainerNotes: 'Лидер сообщества, часто приводит подруг.',
    comms: [{ date: '15 сен', channel: 'App push', text: 'Приглашение в Inner Circle event' }],
  },
  {
    id: 'mem4', name: 'Fatima Al Marri', studio: 'EN DIFC', level: 5, belt: 'white',
    goal: 'Первое знакомство с боксом', attendanceRate: 22,
    attendance: [true, false, false, false, true, false, false, false, false, false, false, false],
    purchases: ['4 Class Pack'],
    trainerNotes: 'После вводного занятия не вернулась 3 недели.',
    comms: [{ date: '20 авг', channel: 'Email', text: 'Welcome-серия писем' }],
  },
  {
    id: 'mem5', name: 'Aisha Al Farsi', studio: 'EN Jumeirah', level: 12, belt: 'orange',
    goal: 'Гибкость и восстановление после травмы колена', attendanceRate: 55,
    attendance: [false, true, false, true, false, true, false, false, true, false, true, false],
    purchases: ['Season Pass'],
    trainerNotes: 'Работаем в щадящем режиме, прогресс в mobility стабильный.',
    comms: [{ date: '5 сен', channel: 'App push', text: 'Рекомендация Recovery-класса' }],
  },
  {
    id: 'mem6', name: 'Екатерина Волкова', studio: 'EN Patriki', level: 45, belt: 'black',
    goal: 'Соревновательный уровень', attendanceRate: 96,
    attendance: [true, true, true, true, true, true, true, false, true, true, true, true],
    purchases: ['Inner Circle', 'Japan Journey', 'полный мерч сезона'],
    trainerNotes: 'Готовится к показательному выступлению на Team Cup.',
    comms: [{ date: '19 сен', channel: 'App push', text: 'Приглашение как капитан Team Indigo' }],
  },
  {
    id: 'mem7', name: 'Мария Соколова', studio: 'EN Patriki', level: 3, belt: 'white',
    goal: 'Начать регулярно тренироваться', attendanceRate: 15,
    attendance: [false, false, true, false, false, false, false, false, false, false, false, false],
    purchases: ['Trial pass'],
    trainerNotes: 'Пришла один раз, не завершила onboarding-квиз.',
    comms: [{ date: '1 сен', channel: 'SMS', text: 'Напоминание завершить профиль' }],
  },
  {
    id: 'mem8', name: 'Hina Suzuki', studio: 'EN Omotesando', level: 18, belt: 'green',
    goal: 'Баланс между работой и тренировками', attendanceRate: 68,
    attendance: [true, true, false, true, false, true, true, false, true, false, true, true],
    purchases: ['Unlimited Monthly', 'Wrap Set'],
    trainerNotes: 'Просит больше вечерних слотов по средам.',
    comms: [{ date: '12 сен', channel: 'Email', text: 'Опрос удовлетворённости' }],
  },
  {
    id: 'mem9', name: 'Rin Okada', studio: 'EN Nakameguro', level: 26, belt: 'blue',
    goal: 'Техника бокса', attendanceRate: 34,
    attendance: [true, false, false, false, true, false, false, true, false, false, false, false],
    purchases: ['8 Class Pack'],
    trainerNotes: 'Посещаемость упала после смены тренера в вечерней группе.',
    comms: [{ date: '8 сен', channel: 'App push', text: 'Предложение перейти на утренние слоты' }],
  },
  {
    id: 'mem10', name: 'Noor Al Suwaidi', studio: 'EN DIFC', level: 9, belt: 'yellow',
    goal: 'Общий тонус тела', attendanceRate: 48,
    attendance: [false, true, false, true, false, false, true, false, true, false, false, true],
    purchases: ['Season Pass'],
    trainerNotes: 'Хорошо откликается на групповую динамику, стоит звать на события.',
    comms: [{ date: '14 сен', channel: 'SMS', text: 'Приглашение на Recovery Sound Bath' }],
  },
  {
    id: 'mem11', name: 'Aya Fujimoto', studio: 'EN Umeda', level: 40, belt: 'brown',
    goal: 'Менторство новичков', attendanceRate: 90,
    attendance: [true, true, true, true, false, true, true, true, true, true, false, true],
    purchases: ['Inner Circle', 'полный мерч сезона'],
    trainerNotes: 'Неформальный лидер группы, помогает новичкам.',
    comms: [{ date: '16 сен', channel: 'App push', text: 'Приглашение стать амбассадором' }],
  },
]

export const AI_RETENTION_RISK = [
  {
    id: 'risk1',
    memberId: 'mem4',
    name: 'Fatima Al Marri',
    studio: 'EN DIFC',
    riskLevel: 'Высокий',
    signal: 'Посещаемость упала с 3/нед до 0 за последние 3 недели после единственного вводного занятия.',
    scenario: 'Персональное сообщение от тренера Haruka Ito с приглашением на бесплатный повторный Boxing intro + предложение buddy-визита с подругой.',
  },
  {
    id: 'risk2',
    memberId: 'mem2',
    name: 'Саяка Мураками',
    studio: 'EN Nakameguro',
    riskLevel: 'Высокий',
    signal: 'Attendance rate снизился с 68% до 41% за 6 недель, последние 2 брони — no-show.',
    scenario: 'Предложить пересборку расписания под её паттерн (утро вместо вечера) + скидку 20% на Mobility-пакет на 2 недели.',
  },
  {
    id: 'risk3',
    memberId: 'mem9',
    name: 'Rin Okada',
    studio: 'EN Nakameguro',
    riskLevel: 'Средний',
    signal: 'Посещаемость снизилась после смены вечернего тренера в августе — паттерн совпадает с ещё 4 участницами студии.',
    scenario: 'Пригласить на пробное занятие с новым тренером в удобный слот + короткий опрос о причинах снижения активности.',
  },
  {
    id: 'risk4',
    memberId: 'mem7',
    name: 'Мария Соколова',
    studio: 'EN Patriki',
    riskLevel: 'Высокий',
    signal: 'Один визит за 3 недели, onboarding-квиз не завершён — профиль неполный.',
    scenario: 'Автоматизированная email-серия из 3 писем с помощью в завершении профиля + звонок от менеджера студии.',
  },
  {
    id: 'risk5',
    memberId: 'mem5',
    name: 'Aisha Al Farsi',
    studio: 'EN Jumeirah',
    riskLevel: 'Средний',
    signal: 'Нерегулярный паттерн посещений, возможна связь с восстановлением после травмы колена.',
    scenario: 'Предложить бесплатную консультацию с Mei Kobayashi по индивидуальному mobility-плану.',
  },
]
