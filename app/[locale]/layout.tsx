import { redirect } from 'next/navigation';

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale;

  if (!['en', 'ps', 'fa'].includes(locale)) {
    redirect('/en');
  }

  return <>{children}</>;
}
