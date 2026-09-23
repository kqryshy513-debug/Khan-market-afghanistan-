import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { AppShell } from '@/components/app-shell';
import { getSessionUserByToken } from '@/lib/auth';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function AdminPage({ params }: { params: { locale: Locale } }) {
  const user = await getSessionUserByToken(cookies().get('session')?.value);
  if (!user || user.status !== 'ACTIVE') redirect(`/${params.locale}/login`);
  if (!['ADMIN', 'OWNER'].includes(user.role)) redirect(`/${params.locale}/forbidden`);
  const dict = getDictionary(params.locale);
  return <AppShell locale={params.locale}><div className="space-y-6"><div className="card"><span className="badge">Admin</span><h1 className="mt-4 text-3xl font-bold">{dict.admin}</h1><p className="mt-2 text-slate-300">{dict.notConfigured}</p></div></div></AppShell>;
}
