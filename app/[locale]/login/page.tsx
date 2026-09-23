import { AppShell } from '@/components/app-shell';
import { getDictionary } from '@/lib/i18n';

export default function LoginPage({ params }: { params: { locale: 'en' | 'ps' | 'fa' } }) {
  const dict = getDictionary(params.locale);

  return (
    <AppShell locale={params.locale}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{dict.login}</h1>
        <p className="text-slate-300">Use the secure server-side session flow.</p>
        <div className="card max-w-md">
          <form action="/api/auth/login" method="post" className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input name="email" type="email" required className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm">Password</label>
              <input name="password" type="password" required className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            </div>
            <button type="submit" className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">{dict.login}</button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
