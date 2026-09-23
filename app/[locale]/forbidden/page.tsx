import { AppShell } from '@/components/app-shell';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function ForbiddenPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return <AppShell locale={params.locale}><div className="card"><h1 className="text-3xl font-bold">{dict.forbidden}</h1></div></AppShell>;
}
