const highlights = [
    { value: '< 10 min', label: 'to set up your products and retailers' },
    { value: '0', label: 'apps to install — it runs in any phone browser' },
    { value: 'KES', label: 'pricing and margins in shillings, not dollars' },
    { value: '24/7', label: 'access for owners, reps and delivery staff' },
];

export function Highlights() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {highlights.map((h) => (
                    <div key={h.label} className="border-l-4 border-accent pl-4">
                        <dt className="sr-only">{h.label}</dt>
                        <dd className="text-3xl font-bold tracking-tight text-foreground">{h.value}</dd>
                        <dd className="mt-1 text-sm text-muted-foreground">{h.label}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
