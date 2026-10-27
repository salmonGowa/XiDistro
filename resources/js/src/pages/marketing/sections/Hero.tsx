import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { BrowserFrame } from '../../../components/ui/BrowserFrame';
import { CheckIcon, TruckIcon, ChartIcon } from '../../../components/ui/icons';
import productsScreenshot from '../../../../../images/marketing/products-dark.png';

const reassurances = ['Free trial', 'No credit card', 'Set up in minutes'];

export function Hero() {
    const { user } = useAuth();

    return (
        <section id="top" className="relative overflow-hidden bg-accent-soft">
            {/* Decorative warm glow — contained by overflow-hidden above so it can't cause horizontal scroll */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-32 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-40 lg:pt-24">
                <div>
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        Karibu! 👋 Welcome to XiDistro
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Every order, every delivery,{' '}
                        <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                            every shilling.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                        XiDistro helps distributors and wholesalers take orders from retailers, get them delivered,
                        and see exactly what they earned — all from one simple app your whole team can use.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            to={user ? '/dashboard' : '/register'}
                            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            {user ? 'Go to app' : 'Register your business'}
                        </Link>
                        <a
                            href="#how-it-works"
                            className="rounded-md border border-foreground/20 bg-background/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            How it works
                        </a>
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                        {reassurances.map((item) => (
                            <li key={item} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                <CheckIcon className="h-4 w-4 text-success" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative">
                    <BrowserFrame className="rotate-1 transition-transform duration-300 hover:rotate-0">
                        <img src={productsScreenshot} alt="XiDistro products screen showing cost, sale price, and margin per item" className="w-full" />
                    </BrowserFrame>

                    {/* Floating status chips — illustrate the day-to-day signals the app surfaces */}
                    <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:flex">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/15 text-success">
                            <TruckIcon className="h-5 w-5" />
                        </span>
                        <span>
                            <span className="block text-xs text-muted-foreground">Order #1042</span>
                            <span className="block text-sm font-semibold text-card-foreground">Delivered · photo confirmed</span>
                        </span>
                    </div>
                    <div className="absolute -right-3 -top-5 hidden items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:flex">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <ChartIcon className="h-5 w-5" />
                        </span>
                        <span>
                            <span className="block text-xs text-muted-foreground">Today's margin</span>
                            <span className="block text-sm font-semibold text-success">+KES 12,400</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
