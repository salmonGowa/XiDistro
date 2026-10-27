import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AlertIcon, CheckIcon, XIcon } from '../components/ui/icons';

type ToastTone = 'success' | 'error';
type Toast = { id: number; message: string; tone: ToastTone };

const ToastContext = createContext<((message: string, tone?: ToastTone) => void) | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const dismiss = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), []);

    const toast = useCallback(
        (message: string, tone: ToastTone = 'success') => {
            const id = ++nextId;
            setToasts((all) => [...all, { id, message, tone }]);
            setTimeout(() => dismiss(id), 3500);
        },
        [dismiss],
    );

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Sits above the mobile bottom nav; bottom-right on desktop. */}
            <div
                aria-live="polite"
                className="pointer-events-none fixed inset-x-4 bottom-20 z-[60] flex flex-col items-center gap-2 md:inset-x-auto md:bottom-6 md:right-6 md:items-end"
            >
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="animate-rise-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground shadow-xl"
                    >
                        <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                t.tone === 'success' ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
                            }`}
                        >
                            {t.tone === 'success' ? <CheckIcon className="h-3.5 w-3.5" /> : <AlertIcon className="h-3.5 w-3.5" />}
                        </span>
                        <span className="flex-1">{t.message}</span>
                        <button
                            type="button"
                            onClick={() => dismiss(t.id)}
                            aria-label="Dismiss"
                            className="rounded text-muted-foreground hover:text-foreground"
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return ctx;
}
