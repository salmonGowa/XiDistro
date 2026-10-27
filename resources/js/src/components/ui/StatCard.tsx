import type { ReactNode } from 'react';
import { Skeleton } from './Skeleton';

export function StatCard({
    label,
    value,
    hint,
    icon,
    isLoading,
}: {
    label: string;
    value: string;
    hint?: string;
    icon: ReactNode;
    isLoading?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</span>
            </div>
            {isLoading ? (
                <Skeleton className="mt-3 h-8 w-24" />
            ) : (
                <p className="mt-2 text-2xl font-semibold tracking-tight text-card-foreground tabular-nums">{value}</p>
            )}
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}
