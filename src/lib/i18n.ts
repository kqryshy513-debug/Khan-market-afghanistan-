export const locales = ['en', 'ps', 'fa'] as const;
export type Locale = (typeof locales)[number];

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return locales.includes(segment as Locale) ? (segment as Locale) : 'en';
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'en' ? 'ltr' : 'rtl';
}

export const dictionaries = {
  en: {
    appName: 'Khan Market Afghanistan',
    login: 'Login',
    dashboard: 'Dashboard',
    admin: 'Admin',
    logout: 'Logout',
    welcome: 'Welcome to the foundation platform',
    description: 'Production-ready foundation for the Khan Market Afghanistan roadmap.',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    notConfigured: 'NOT_CONFIGURED — credentials/configuration required',
    requiredFields: 'Email and password are required.',
    invalidRole: 'Role not allowed.'
  },
  ps: {
    appName: 'خان بازار افغانستان',
    login: 'ننوتل',
    dashboard: 'ډشبورډ',
    admin: 'ادمین',
    logout: 'وتل',
    welcome: 'د بنسټ په مینځ پخوانی سیستم ته ښه راغلاست',
    description: 'د خان بازار افغانستان پروژه لپاره جوړ شوی د تولید موده پايه.',
    unauthorized: 'غیرمجاز',
    forbidden: 'ممنوع',
    notConfigured: 'NOT_CONFIGURED — اعتبار/رێکخستنې اړین دي',
    requiredFields: 'بریښنالیک او پاسورډ اړین دي.',
    invalidRole: 'رول اجازه نه لري.'
  },
  fa: {
    appName: 'بازار خان افغانستان',
    login: 'ورود',
    dashboard: 'داشبورد',
    admin: 'مدیر',
    logout: 'خروج',
    welcome: 'به پلتفرم بنیاد خوش آمدید',
    description: 'پایه‌ی آماده برای نقشه راه بازار خان افغانستان.',
    unauthorized: 'غیرمجاز',
    forbidden: 'ممنوع',
    notConfigured: 'NOT_CONFIGURED — اعتبار/پیکربندی لازم است',
    requiredFields: 'ایمیل و رمز عبور لازم هستند.',
    invalidRole: 'نقش مجاز نیست.'
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}
