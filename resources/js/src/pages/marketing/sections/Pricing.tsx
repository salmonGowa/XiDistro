import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SVGProps } from 'react';

function CheckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

const tiers = [
    {
        name: 'Starter',
        description: 'For a single sales rep getting off spreadsheets.',
        monthly: 2000,
        features: ['Up to 50 products', 'Up to 100 retailers', 'Order taking & delivery tracking', 'Margin visibility'],
        highlighted: false,
    },
    {
        name: 'Growth',
        description: 'For distributors running daily delivery routes.',
        monthly: 5000,
        features: [
            'Unlimited products & retailers',
            'Proof of delivery (photo or PIN)',
            'Daily margin & cash dashboard',
            'Up to 5 staff accounts',
        ],
        highlighted: true,
    },
    {
        name: 'Scale',
        description: 'For multi-team operations with priority support.',
        monthly: 12000,
        features: ['Everything in Growth', 'Unlimited staff accounts', 'Priority support', 'Early access to new features'],
        highlighted: false,
    },
];

export function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Simple pricing, in shillings
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Every plan starts with a free trial — no card required.
                </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
                <span className={`text-sm ${!annual ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={annual}
                    onClick={() => setAnnual((v) => !v)}
                    className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                            annual ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </button>
                <span className={`text-sm ${annual ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    Annual <span className="text-success">(save ~20%)</span>
                </span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {tiers.map((tier) => {
                    const price = annual ? Math.round((tier.monthly * 0.8)) : tier.monthly;
                    return (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-2xl border p-6 ${
                                tier.highlighted
                                    ? 'border-primary bg-card shadow-xl shadow-primary/20 ring-1 ring-primary/30'
                                    : 'border-border bg-card'
                            }`}
                        >
                            {tier.highlighted && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                    Most popular
                                </span>
                            )}
                            <h3 className="text-base font-semibold text-card-foreground">{tier.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                            <p className="mt-6">
                                <span className="text-3xl font-semibold text-card-foreground">KES {price.toLocaleString()}</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </p>
                            {annual && <p className="mt-1 text-xs text-muted-foreground">billed annually</p>}
                            <ul className="mt-6 flex-1 space-y-3">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-card-foreground">
                                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/register"
                                className={`mt-8 rounded-md px-4 py-2 text-center text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                                    tier.highlighted
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border border-border text-foreground hover:bg-muted'
                                }`}
                            >
                                Start free trial
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
