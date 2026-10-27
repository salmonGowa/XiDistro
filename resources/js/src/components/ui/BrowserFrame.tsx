import type { ReactNode } from 'react';

export function BrowserFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/20 ${className}`}>
            <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
            </div>
            {children}
        </div>
    );
}
