import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const features = [
    {
        title: 'Take orders fast',
        description:
            'Log retailer orders as they come in by phone or WhatsApp, from a shop list you control.',
    },
    {
        title: 'Track every delivery',
        description:
            'Move orders from placed to picked to delivered, with a delivery person assigned to each one.',
    },
    {
        title: 'Proof of delivery',
        description:
            'Photo or PIN confirmation at the door, so disputes over what arrived are settled in seconds.',
    },
    {
        title: 'See your margin, per order',
        description:
            'Cost vs. sale price is visible on every line item — not a report you run at month end.',
    },
];

export function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <span className="text-lg font-semibold text-slate-900">XiDistro</span>
                    {user ? (
                        <Link
                            to="/products"
                            className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Go to app
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                            >
                                Register your business
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <main>
                <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        Run your distribution business, not spreadsheets.
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                        XiDistro is the order-taking, delivery-tracking, and margin-visibility platform built
                        for small FMCG distributors and wholesalers — so you always know what's out for
                        delivery, what's owed, and what you made on every sale.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        {user ? (
                            <Link
                                to="/products"
                                className="rounded bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
                            >
                                Go to app
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="rounded bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
                                >
                                    Register your business
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.title}>
                                <h2 className="text-base font-semibold text-slate-900">{feature.title}</h2>
                                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 px-4 py-8 text-center text-xs text-slate-400">
                XiDistro — built for local distributors, not the businesses ordering from them.
            </footer>
        </div>
    );
}
