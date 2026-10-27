import type { ReactNode, SVGProps } from 'react';

function ChartIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M3 3v18h18" />
            <path d="M7 15l4-5 3 3 5-7" />
        </svg>
    );
}

function BoltIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
    );
}

function TruckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
            <path d="M13 9h4l4 4v3h-8" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="17.5" cy="17.5" r="1.5" />
        </svg>
    );
}

function CameraIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M3 8a1 1 0 0 1 1-1h2l1.5-2h9L18 7h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z" />
            <circle cx="12" cy="13" r="3.5" />
        </svg>
    );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <path d="M11 18h2" />
        </svg>
    );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
    );
}

function MarginVisual() {
    return (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3 text-sm">
            <div>
                <p className="text-xs text-muted-foreground">Cost</p>
                <p className="font-medium text-foreground">KES 320</p>
            </div>
            <span className="text-muted-foreground">→</span>
            <div>
                <p className="text-xs text-muted-foreground">Sale</p>
                <p className="font-medium text-foreground">KES 380</p>
            </div>
            <span className="text-muted-foreground">=</span>
            <div>
                <p className="text-xs text-muted-foreground">Margin</p>
                <p className="font-semibold text-success">+KES 60</p>
            </div>
        </div>
    );
}

function BentoCell({
    icon,
    title,
    description,
    className = '',
    children,
}: {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <div
            className={`flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 ${className}`}
        >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>
            <h3 className="mt-4 text-base font-semibold text-card-foreground">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            {children}
        </div>
    );
}

export function BentoFeatures() {
    return (
        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Everything a distributor actually needs
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    No warehouse modules or BNPL you don't need yet — just the workflow from order to cash.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,auto)]">
                <BentoCell
                    icon={<ChartIcon className="h-5 w-5" />}
                    title="See your margin, per order"
                    description="Cost vs. sale price is visible on every line item — not a report you run at month end."
                    className="lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2"
                >
                    <MarginVisual />
                </BentoCell>

                <BentoCell
                    icon={<BoltIcon className="h-5 w-5" />}
                    title="Take orders fast"
                    description="Log retailer orders as they come in by phone or WhatsApp, from a shop list you control."
                    className="lg:col-start-3 lg:col-span-2 lg:row-start-1"
                />

                <BentoCell
                    icon={<TruckIcon className="h-5 w-5" />}
                    title="Track every delivery"
                    description="Move orders from placed to picked to delivered, with a delivery person assigned to each."
                    className="lg:col-start-3 lg:col-span-1 lg:row-start-2"
                />

                <BentoCell
                    icon={<CameraIcon className="h-5 w-5" />}
                    title="Proof of delivery"
                    description="Photo or PIN confirmation at the door settles disputes over what arrived in seconds."
                    className="lg:col-start-4 lg:col-span-1 lg:row-start-2"
                />

                <BentoCell
                    icon={<PhoneIcon className="h-5 w-5" />}
                    title="Mobile-first, works anywhere"
                    description="A fast, responsive web app your team can use on any phone — no native app required."
                    className="lg:col-start-1 lg:col-span-2 lg:row-start-3"
                />

                <BentoCell
                    icon={<ShieldIcon className="h-5 w-5" />}
                    title="Your own workspace from day one"
                    description="Every distributor gets an isolated account — your products, retailers, and orders are yours alone."
                    className="lg:col-start-3 lg:col-span-2 lg:row-start-3"
                />
            </div>
        </section>
    );
}
