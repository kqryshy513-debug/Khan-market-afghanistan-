import { AppShell } from '@/components/app-shell';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function LocaleHomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <LocaleSwitcher locale={locale} />
        <div className="card">
          <span className="badge">Foundation</span>
          <h1 className="mt-4 text-3xl font-bold">{dict.welcome}</h1>
          <p className="mt-2 max-w-2xl text-slate-300">{dict.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><h2 className="text-lg font-semibold">Architecture</h2><p className="mt-2 text-slate-300">React + Next.js + Prisma + SQLite foundation.</p></div>
          <div className="card"><h2 className="text-lg font-semibold">Authentication</h2><p className="mt-2 text-slate-300">Server-side session based auth with RBAC.</p></div>
          <div className="card"><h2 className="text-lg font-semibold">Localization</h2><p className="mt-2 text-slate-300">English, Pashto, and Dari with RTL/LTR support.</p></div>
        </div>
      </div>
    </AppShell>
  );
}
