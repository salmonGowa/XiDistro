import { useEffect, useId, type ReactNode } from 'react';
import { Button } from './Button';
import { AlertIcon, XIcon } from './icons';

// Closes on Escape and stops the page behind from scrolling while an overlay is open.
function useOverlay(open: boolean, onClose: () => void) {
    useEffect(() => {
        if (!open) return;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onClose]);
}

/**
 * Slide-over panel for create/edit forms. Full-screen on phones, a right-hand panel from sm up,
 * so the list stays visible behind it on larger screens.
 */
export function Drawer({
    open,
    onClose,
    title,
    description,
    footer,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}) {
    const titleId = useId();
    useOverlay(open, onClose);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="animate-fade-in absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="animate-slide-in-right absolute inset-y-0 right-0 flex w-full flex-col bg-card shadow-2xl sm:max-w-md sm:border-l sm:border-border"
            >
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <div>
                        <h2 id={titleId} className="text-lg font-semibold text-card-foreground">
                            {title}
                        </h2>
                        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close" className="-mr-2 h-9 w-9 px-0">
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
                {footer && (
                    <div className="flex gap-3 border-t border-border bg-card px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] [&>*]:flex-1 sm:[&>*]:flex-none sm:justify-end">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    body,
    confirmLabel = 'Delete',
    isLoading = false,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    body: string;
    confirmLabel?: string;
    isLoading?: boolean;
}) {
    const titleId = useId();
    useOverlay(open, onClose);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <div className="animate-fade-in absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="animate-rise-in relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
                <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <AlertIcon className="h-5 w-5" />
                    </span>
                    <div>
                        <h2 id={titleId} className="font-semibold text-card-foreground">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                    </div>
                </div>
                <div className="mt-6 flex gap-3 [&>*]:flex-1 sm:justify-end sm:[&>*]:flex-none">
                    <Button variant="secondary" onClick={onClose} autoFocus>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
