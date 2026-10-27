import { useState, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';
import { EyeIcon, EyeOffIcon, SearchIcon } from './icons';

export function FormField({
    label,
    htmlFor,
    hint,
    error,
    required,
    className = '',
    children,
}: {
    label: string;
    htmlFor: string;
    hint?: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={className}>
            <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
                {label}
                {required && (
                    <span className="ml-0.5 text-destructive" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            {children}
            {error ? (
                <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : (
                hint && (
                    <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs text-muted-foreground">
                        {hint}
                    </p>
                )
            )}
        </div>
    );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    // Short unit shown inside the field, e.g. "KES".
    addon?: string;
    invalid?: boolean;
    trailing?: ReactNode;
    ref?: Ref<HTMLInputElement>;
};

/*
 * text-base on phones keeps iOS Safari from zooming into the field on focus;
 * desktop drops back to text-sm.
 */
const fieldBase =
    'h-11 w-full rounded-lg border bg-background text-base text-foreground placeholder:text-muted-foreground/70 transition-colors sm:h-10 sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60';

export function Input({ addon, invalid, trailing, className = '', id, ...props }: InputProps) {
    const border = invalid ? 'border-destructive focus:border-destructive' : 'border-border focus:border-ring';
    const describedBy = invalid ? `${id}-error` : `${id}-hint`;

    return (
        <div className="relative">
            {addon && (
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-medium text-muted-foreground">
                    {addon}
                </span>
            )}
            <input
                id={id}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={`${fieldBase} ${border} ${addon ? 'pl-12' : 'pl-3'} ${trailing ? 'pr-11' : 'pr-3'} ${className}`}
                {...props}
            />
            {trailing && <div className="absolute inset-y-0 right-0 flex items-center pr-1">{trailing}</div>}
        </div>
    );
}

export function PasswordInput(props: Omit<InputProps, 'type' | 'trailing'>) {
    const [visible, setVisible] = useState(false);

    return (
        <Input
            {...props}
            type={visible ? 'text' : 'password'}
            trailing={
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {visible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
            }
        />
    );
}

export function SearchInput({
    value,
    onChange,
    placeholder,
    label,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
}) {
    return (
        <div className="relative w-full sm:max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={label}
                className={`${fieldBase} border-border pl-9 pr-3 focus:border-ring`}
            />
        </div>
    );
}

export function FormError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive" role="alert">
            {message}
        </p>
    );
}
