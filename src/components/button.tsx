import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Button({ children, className, ...props }: React.ComponentProps<'button'> & { children: ReactNode }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
