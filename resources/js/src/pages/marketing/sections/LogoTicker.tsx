const placeholderDistributors = [
    'Kilimani Wholesale',
    'Baraka Distributors',
    'Soko Central',
    'Rift Valley FMCG',
    'Coast Traders',
    'Northgate Supplies',
];

export function LogoTicker() {
    // Duplicated so the marquee can loop seamlessly at translateX(-50%).
    const track = [...placeholderDistributors, ...placeholderDistributors];

    return (
        <section className="border-y border-border bg-card/50 py-10">
            <p className="mb-6 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Built for distributors across Kenya
            </p>
            <div className="fade-edges overflow-hidden">
                <div className="flex w-max animate-marquee gap-16">
                    {track.map((name, i) => (
                        <span
                            key={`${name}-${i}`}
                            className="shrink-0 text-lg font-bold tracking-wide text-muted-foreground grayscale opacity-70 transition-opacity hover:opacity-100"
                        >
                            {name.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
