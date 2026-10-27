const steps = [
    { title: 'Register your business', description: 'Create your account and private workspace — no card, no paperwork.' },
    { title: 'Add products & retailers', description: 'Enter what you sell with cost and sale prices, and the shops you sell to.' },
    { title: 'Take orders', description: 'Your team logs orders as they come in by phone, WhatsApp or shop visit.' },
    { title: 'Deliver & get paid', description: 'Track each order to the door, confirm delivery, and see your margin.' },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Up and running in four simple steps
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    No training days or consultants. If you can use WhatsApp, you can use XiDistro.
                </p>
            </div>

            <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Connector line behind the step numbers on wide screens */}
                <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-border lg:block" />
                {steps.map((step, i) => (
                    <li key={step.title} className="relative text-center">
                        <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground ring-8 ring-background">
                            {i + 1}
                        </span>
                        <h3 className="mt-5 text-base font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
