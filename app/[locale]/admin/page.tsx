import { AppShell } from '@/components/app-shell';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function AdminPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <AppShell locale={params.locale}>
      <div className="space-y-6">
        <div className="card">
          <span className="badge">Admin</span>
          <h1 className="mt-4 text-3xl font-bold">{dict.admin}</h1>
          <p className="mt-2 text-slate-300">This area is intended for owner/admin-only operations and future system administration.</p>
        </div>
        <div className="card">
          <p className="text-slate-300">{dict.notConfigured}</p>
        </div>
      </div>
    </AppShell>
  );
}
