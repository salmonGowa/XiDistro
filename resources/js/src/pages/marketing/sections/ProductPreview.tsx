import { useState } from 'react';
import { BrowserFrame } from '../../../components/ui/BrowserFrame';
import productsDark from '../../../../../images/marketing/products-dark.png';
import retailersLight from '../../../../../images/marketing/retailers-light.png';
import mobileCard from '../../../../../images/marketing/mobile-card.png';

const tabs = [
    {
        label: 'Products & margins',
        image: productsDark,
        alt: 'Products page with cost, sale price, and margin columns in dark mode',
        caption: 'Cost and sale price side by side, with margin computed on every row — not a spreadsheet you reconcile later.',
    },
    {
        label: 'Retailer directory',
        image: retailersLight,
        alt: 'Retailers page listing shop name, phone, and location in light mode',
        caption: 'Every shop you sell to, with the contact details your team needs to take and deliver an order.',
    },
    {
        label: 'Works on any device',
        image: mobileCard,
        alt: 'Mobile view of the products page showing a card-based layout',
        caption: 'The same data, reflowed into cards on a phone — no separate mobile app to install or maintain.',
    },
];

export function ProductPreview() {
    const [active, setActive] = useState(0);
    const tab = tabs[active];

    return (
        <section id="preview" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    See it in action
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">Real screens from the actual product.</p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
                {tabs.map((t, i) => (
                    <button
                        key={t.label}
                        onClick={() => setActive(i)}
                        aria-pressed={active === i}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                            active === i
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="relative mx-auto mt-8 max-w-4xl">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-2xl" />
                <BrowserFrame key={active} className="mx-auto animate-[fadein_0.25s_ease-out]">
                    <img src={tab.image} alt={tab.alt} className="w-full" />
                </BrowserFrame>
                <p className="mt-4 text-center text-sm text-muted-foreground">{tab.caption}</p>
            </div>
        </section>
    );
}
