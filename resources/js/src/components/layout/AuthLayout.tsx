import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ArrowLeftIcon, ChartIcon, CheckIcon, TruckIcon, UsersIcon } from '../ui/icons';

const benefits = [
    { icon: UsersIcon, text: 'Take orders from every shop you serve' },
    { icon: TruckIcon, text: 'Track deliveries from placed to doorstep' },
    { icon: ChartIcon, text: 'See your margin on every single sale' },
];

// Split screen: welcoming brand panel on large screens, form on the right (full width on phones).
export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
    return (
        <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <aside className="relative hidden overflow-hidden bg-accent-soft p-12 lg:flex lg:flex-col">
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

                <Link to="/" className="relative inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-black text-accent-foreground">Xi</span>
                    XiDistro
                </Link>

                <div className="relative my-auto max-w-md">
                    <p className="text-sm font-semibold text-foreground/70">Karibu 👋</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                        Run your distribution business from one place.
                    </h2>
                    <ul className="mt-8 space-y-4">
                        {benefits.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3 text-foreground">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/80 text-primary shadow-sm">
                                    <Icon className="h-5 w-5" />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative flex items-center gap-2 text-sm text-foreground/70">
                    <CheckIcon className="h-4 w-4 text-success" />
                    Free trial · No credit card required
                </p>
            </aside>

            <main className="flex flex-col">
                <div className="flex h-16 items-center justify-between px-4 sm:px-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to home
                    </Link>
                    <ThemeToggle />
                </div>
                <div className="flex flex-1 items-center justify-center px-4 pb-12 pt-4 sm:px-8">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                        <p className="mt-2 text-muted-foreground">{subtitle}</p>
                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
