const faqs = [
    {
        q: 'Who is XiDistro for?',
        a: 'Small and growing FMCG distributors and wholesalers who sell to retail shops — whether you run one van or a whole team of sales reps and drivers.',
    },
    {
        q: 'Do my staff need to install an app?',
        a: 'No. XiDistro runs in the browser on any smartphone, tablet or computer. Share the link, they log in, and they are ready to go.',
    },
    {
        q: 'Is my business data private?',
        a: 'Yes. Every distributor gets its own isolated workspace. Your products, retailers and orders are never visible to other businesses.',
    },
    {
        q: 'How does the free trial work?',
        a: 'Register your business and use XiDistro with no credit card. Pick a plan when you are ready — you keep everything you set up during the trial.',
    },
    {
        q: 'Can I change plans later?',
        a: 'Of course. Move up or down between Starter, Growth and Scale as your business changes.',
    },
    {
        q: 'What if I already keep everything in spreadsheets?',
        a: 'That is exactly where most of our distributors start. Bring your product and retailer lists across and you can be taking orders the same day.',
    },
];

export function Faq() {
    return (
        <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Questions? We have answers.
                </h2>
            </div>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
                {faqs.map((item) => (
                    <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-card-foreground">
                            {item.q}
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
