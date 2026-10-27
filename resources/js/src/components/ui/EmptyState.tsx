import type { ReactNode } from 'react';

export function EmptyState({ title, body, icon, action }: { title: string; body: string; icon?: ReactNode; action?: ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {icon ?? (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M3 7l2-4h14l2 4" />
                        <path d="M9 11h6" />
                    </svg>
                )}
            </span>
            <p className="font-medium text-foreground">{title}</p>
            <p className="max-w-xs text-sm text-muted-foreground">{body}</p>
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}
