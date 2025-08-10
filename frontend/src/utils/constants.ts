export const EXAM_TYPES = {
  NEET: 'NEET',
  JEE_MAIN: 'JEE Main',
  JEE_ADVANCED: 'JEE Advanced',
  CUET: 'CUET',
  GATE: 'GATE'
} as const;

export const SUBJECTS = {
  [EXAM_TYPES.NEET]: ['Physics', 'Chemistry', 'Biology'],
  [EXAM_TYPES.JEE_MAIN]: ['Physics', 'Chemistry', 'Mathematics'],
  [EXAM_TYPES.JEE_ADVANCED]: ['Physics', 'Chemistry', 'Mathematics'],
  [EXAM_TYPES.CUET]: ['English', 'General Test', 'Domain Subject'],
  [EXAM_TYPES.GATE]: ['Engineering Mathematics', 'Core Subject', 'General Aptitude']
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
} as const;

export const QUESTION_TYPES = {
  MCQ: 'Multiple Choice',
  NUMERICAL: 'Numerical',
  ASSERTION: 'Assertion-Reason'
} as const;

export const GAMIFICATION = {
  POINTS_PER_TOPIC: 15,
  POINTS_PER_TEST: 50,
  POINTS_PER_DOUBT: 5,
  STREAK_BONUS: 10,
  DAILY_TARGET_HOURS: 5
} as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  COURSES: '/api/courses',
  QUESTIONS: '/api/questions',
  PROGRESS: '/api/progress',
  DOUBTS: '/api/doubts',
  GROUPS: '/api/groups'
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER: 'neogen_user',
  STATS: 'neogen_stats',
  PLAN: 'neogen_plan',
  THEME: 'neogen_theme'
} as const;