import { cookies } from 'next/headers';
import { type Locale, getDictionary, getDirection } from '@/lib/i18n';

export function AppShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const sessionToken = cookies().get('session')?.value;
  return <div dir={dir} className="min-h-screen bg-slate-950 text-slate-100"><header className="border-b border-slate-800"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3"><a href={`/${locale}`} className="text-lg font-semibold">{dict.appName}</a><nav className="flex flex-wrap gap-3 text-sm"><a href={`/${locale}`}>Home</a><a href={`/${locale}/dashboard`}>{dict.dashboard}</a><a href={`/${locale}/admin`}>{dict.admin}</a>{sessionToken ? <form action="/api/auth/logout" method="post"><button type="submit">{dict.logout}</button></form> : <a href={`/${locale}/login`}>{dict.login}</a>}</nav></div></header><main className="mx-auto max-w-6xl px-4 py-10">{children}</main></div>;
}
