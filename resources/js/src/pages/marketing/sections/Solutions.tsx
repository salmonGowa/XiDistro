import type { ReactNode } from 'react';
import { BrowserFrame } from '../../../components/ui/BrowserFrame';
import { ChartIcon, CheckIcon, TruckIcon, UsersIcon } from '../../../components/ui/icons';
import productsDark from '../../../../../images/marketing/products-dark.png';
import retailersLight from '../../../../../images/marketing/retailers-light.png';
import mobileCard from '../../../../../images/marketing/mobile-card.png';

type Solution = {
    icon: ReactNode;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    image: string;
    alt: string;
    narrow?: boolean;
};

const solutions: Solution[] = [
    {
        icon: <ChartIcon className="h-5 w-5" />,
        eyebrow: 'For business owners',
        title: 'Know what you made today — not at month end',
        description:
            'See cost, sale price and margin on every product and order, so you can decide what to stock and where to push.',
        points: ['Margin on every line item', 'Daily totals of what was sold and delivered', 'Your data in your own private workspace'],
        image: productsDark,
        alt: 'Products page with cost, sale price, and margin columns',
    },
    {
        icon: <UsersIcon className="h-5 w-5" />,
        eyebrow: 'For sales reps',
        title: 'Take orders from any shop, on any phone',
        description:
            'Your retailer list travels with your reps. Log an order from a call, a WhatsApp message or a shop visit in seconds.',
        points: ['Searchable list of every retailer', 'Contact details and location at hand', 'No paper order books to collect'],
        image: retailersLight,
        alt: 'Retailers page listing shop name, phone, and location',
    },
    {
        icon: <TruckIcon className="h-5 w-5" />,
        eyebrow: 'For delivery teams',
        title: 'Deliver with confidence, confirm at the door',
        description:
            'Each driver sees what to drop where. Photo or PIN confirmation on delivery puts an end to "it never arrived".',
        points: ['Orders move from placed → picked → delivered', 'Assign a delivery person to each order', 'Proof of delivery on every drop'],
        image: mobileCard,
        alt: 'Mobile view showing a card-based layout',
        narrow: true,
    },
];

export function Solutions() {
    return (
        <section id="solutions" className="bg-muted/40 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Solutions</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Made for everyone on your team
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        From the office to the delivery van, everyone works from the same up-to-date picture.
                    </p>
                </div>

                <div className="mt-16 space-y-20">
                    {solutions.map((s, i) => (
                        <div key={s.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">{s.icon}</span>
                                    {s.eyebrow}
                                </p>
                                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{s.title}</h3>
                                <p className="mt-4 text-muted-foreground">{s.description}</p>
                                <ul className="mt-6 space-y-3">
                                    {s.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                                <BrowserFrame className={s.narrow ? 'mx-auto max-w-xs' : ''}>
                                    <img src={s.image} alt={s.alt} className="w-full" loading="lazy" />
                                </BrowserFrame>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
