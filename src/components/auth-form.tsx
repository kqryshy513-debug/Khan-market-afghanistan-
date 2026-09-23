import { useState } from 'react';

import { Button } from '@/components/button';

export function AuthForm({ locale }: { locale: 'en' | 'ps' | 'fa' }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const body = {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? '')
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok || !result.ok) {
      setError(result.error ?? 'Login failed.');
      return;
    }

    window.location.href = `/${locale}/dashboard`;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input id="email" name="email" type="email" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
          Password
        </label>
        <input id="password" name="password" type="password" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500" required />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
