import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ArrowRightIcon, BoxIcon, ClipboardIcon, StoreIcon, TruckIcon } from '../../../components/ui/icons';

type Action = { icon: ReactNode; title: string; description: string; to: string };

// Overlaps the bottom of the hero, like a carrier's "track / ship / get a quote" panel.
export function QuickActions() {
    const { user } = useAuth();
    const appOr = (path: string) => (user ? path : '/register');

    const actions: Action[] = [
        {
            icon: <StoreIcon className="h-6 w-6" />,
            title: 'Register your business',
            description: 'Create your own workspace in a couple of minutes.',
            to: user ? '/dashboard' : '/register',
        },
        {
            icon: <BoxIcon className="h-6 w-6" />,
            title: 'Add your products',
            description: 'Set cost and sale prices so margins work themselves out.',
            to: appOr('/products'),
        },
        {
            icon: <ClipboardIcon className="h-6 w-6" />,
            title: 'List your retailers',
            description: 'Keep every shop, phone number and location in one place.',
            to: appOr('/retailers'),
        },
        {
            icon: <TruckIcon className="h-6 w-6" />,
            title: 'Track deliveries',
            description: 'Follow each order from placed to delivered.',
            to: '#features',
        },
    ];

    return (
        <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 sm:px-6 lg:-mt-24 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/10 sm:p-8">
                <h2 className="text-xl font-semibold text-card-foreground">What would you like to do today?</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {actions.map((action) => {
                        const content = (
                            <>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                                    {action.icon}
                                </span>
                                <span className="mt-4 flex items-center gap-1 font-semibold text-card-foreground">
                                    {action.title}
                                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <span className="mt-1 text-sm text-muted-foreground">{action.description}</span>
                            </>
                        );
                        const className =
                            'group flex flex-col rounded-xl border border-border p-5 transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
                        return action.to.startsWith('#') ? (
                            <a key={action.title} href={action.to} className={className}>
                                {content}
                            </a>
                        ) : (
                            <Link key={action.title} to={action.to} className={className}>
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
