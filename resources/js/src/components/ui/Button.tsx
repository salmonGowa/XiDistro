import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
    primary: 'bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:opacity-90',
    secondary: 'border border-border bg-card text-foreground hover:bg-muted',
    ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    danger: 'bg-destructive text-destructive-foreground hover:opacity-90',
};

// md/lg heights clear the ~40-44px touch target guidance for phone use.
const sizes: Record<Size, string> = {
    sm: 'h-8 gap-1.5 px-3 text-sm',
    md: 'h-10 gap-2 px-4 text-sm',
    lg: 'h-11 gap-2 px-5 text-base',
};

// Exported so <Link>s can share button styling.
export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className = '') {
    return `inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
    return <span className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} aria-hidden="true" />;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; isLoading?: boolean }) {
    return (
        <button
            type="button"
            disabled={disabled || isLoading}
            aria-busy={isLoading || undefined}
            className={buttonClass(variant, size, className)}
            {...props}
        >
            {isLoading && <Spinner />}
            {children}
        </button>
    );
}
