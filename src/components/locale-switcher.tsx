import { type Locale, getDictionary } from '@/lib/i18n';

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="inline-flex gap-2 rounded-md border border-slate-700 p-1 text-sm">
      {(['en', 'ps', 'fa'] as const).map((option) => (
        <a
          key={option}
          href={`/${option}`}
          className={option === locale ? 'rounded bg-slate-700 px-2 py-1 text-white' : 'rounded px-2 py-1 text-slate-300'}
        >
          {option.toUpperCase()}
        </a>
      ))}
      <span className="px-2 py-1 text-xs uppercase text-slate-400">{dict.appName}</span>
    </div>
  );
}
