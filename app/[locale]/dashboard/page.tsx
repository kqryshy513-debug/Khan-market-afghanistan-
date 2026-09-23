import { AppShell } from '@/components/app-shell';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function DashboardPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <AppShell locale={params.locale}>
      <div className="space-y-6">
        <div className="card">
          <span className="badge">Secure dashboard</span>
          <h1 className="mt-4 text-3xl font-bold">{dict.dashboard}</h1>
          <p className="mt-2 text-slate-300">This page is protected by server-side auth and role checks.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card"><h2 className="text-lg font-semibold">Session</h2><p className="mt-2 text-slate-300">Session token stored server side in the database.</p></div>
          <div className="card"><h2 className="text-lg font-semibold">RBAC</h2><p className="mt-2 text-slate-300">Customer, Seller, Admin, and Owner roles are supported.</p></div>
        </div>
      </div>
    </AppShell>
  );
}
