const testimonials = [
    {
        quote: "Order entry that used to eat an hour every morning now takes ten minutes — my sales reps just log what they sold from their phones.",
        name: 'Faith Wanjiru',
        role: 'Owner, Baraka Distributors',
    },
    {
        quote: 'Delivery disputes used to mean a phone call and a lot of guessing. Now there’s a photo attached to every order.',
        name: 'Peter Mwangi',
        role: 'Operations Lead, Rift Valley FMCG',
    },
    {
        quote: 'I finally see which products are actually worth stocking. Margin used to be a month-end spreadsheet; now it’s right there on the order.',
        name: 'Grace Achieng',
        role: 'Owner, Soko Central',
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Early feedback from distributors
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Illustrative examples of the workflows XiDistro is built to fix.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t) => (
                    <figure
                        key={t.name}
                        className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                    >
                        <span className="text-4xl font-serif text-primary/30" aria-hidden="true">
                            &ldquo;
                        </span>
                        <blockquote className="-mt-3 flex-1 text-sm leading-relaxed text-card-foreground">
                            {t.quote}
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                {t.name.charAt(0)}
                            </span>
                            <span>
                                <span className="block text-sm font-medium text-card-foreground">{t.name}</span>
                                <span className="block text-xs text-muted-foreground">{t.role}</span>
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
