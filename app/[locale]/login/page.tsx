import { AppShell } from '@/components/app-shell';
import { AuthForm } from '@/components/auth-form';
import { getDictionary } from '@/lib/i18n';

export default function LoginPage({ params }: { params: { locale: 'en' | 'ps' | 'fa' } }) {
  const dict = getDictionary(params.locale);
  return <AppShell locale={params.locale}><div className="space-y-6"><h1 className="text-3xl font-bold">{dict.login}</h1><AuthForm locale={params.locale} /></div></AppShell>;
}
