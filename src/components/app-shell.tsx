import { cookies } from 'next/headers';

import { type Locale, getDictionary, getDirection } from '@/lib/i18n';

export function AppShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const sessionToken = cookies().get('session')?.value;

  return (
    <div dir={dir} className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <a href={`/${locale}`} className="text-lg font-semibold tracking-tight text-white">
              {dict.appName}
            </a>
          </div>
          <nav className="flex gap-3 text-sm text-slate-200">
            <a href={`/${locale}`} className="hover:text-white">Home</a>
            <a href={`/${locale}/dashboard`} className="hover:text-white">{dict.dashboard}</a>
            <a href={`/${locale}/admin`} className="hover:text-white">{dict.admin}</a>
            {sessionToken ? (
              <form action={`/${locale}/api/auth/logout`} method="post">
                <button type="submit" className="rounded border border-slate-700 px-3 py-1.5 text-sm hover:border-slate-500 hover:text-white">
                  {dict.logout}
                </button>
              </form>
            ) : (
              <a href={`/${locale}/login`} className="rounded border border-slate-700 px-3 py-1.5 text-sm hover:border-slate-500 hover:text-white">
                {dict.login}
              </a>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
