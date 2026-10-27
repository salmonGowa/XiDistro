import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChatIcon, HelpIcon, StoreIcon } from '../../../components/ui/icons';

function HelpCard({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
    return (
        <div className="flex flex-col rounded-2xl bg-card p-6 shadow-lg shadow-black/5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</span>
            <h3 className="mt-4 font-semibold text-card-foreground">{title}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{description}</p>
            <div className="mt-5">{children}</div>
        </div>
    );
}

const linkClass = 'inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline';

export function HelpBand() {
    return (
        <section id="help" className="bg-accent-soft py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">We're here to help</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Whether you're just looking or ready to move off spreadsheets, we'll get you sorted.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    <HelpCard
                        icon={<HelpIcon className="h-5 w-5" />}
                        title="Browse common questions"
                        description="Quick answers about setup, plans, data privacy and getting your team on board."
                    >
                        <a href="#faq" className={linkClass}>
                            Read the FAQ <ArrowRightIcon className="h-4 w-4" />
                        </a>
                    </HelpCard>
                    <HelpCard
                        icon={<StoreIcon className="h-5 w-5" />}
                        title="Start on your own"
                        description="Register in minutes and explore with your real products and retailers — free."
                    >
                        <Link to="/register" className={linkClass}>
                            Register your business <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </HelpCard>
                    <HelpCard
                        icon={<ChatIcon className="h-5 w-5" />}
                        title="Compare plans"
                        description="See what's included at each tier and pick the one that fits your size today."
                    >
                        <a href="#pricing" className={linkClass}>
                            View pricing <ArrowRightIcon className="h-4 w-4" />
                        </a>
                    </HelpCard>
                </div>
            </div>
        </section>
    );
}
