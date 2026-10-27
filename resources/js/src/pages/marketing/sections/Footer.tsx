import { Link } from 'react-router-dom';

type FooterLink = { label: string; href?: string; to?: string };

const columns: { title: string; links: FooterLink[] }[] = [
    {
        title: 'Product',
        links: [
            { href: '#features', label: 'Features' },
            { href: '#preview', label: 'Screenshots' },
            { href: '#pricing', label: 'Pricing' },
        ],
    },
    {
        title: 'Solutions',
        links: [
            { href: '#solutions', label: 'Business owners' },
            { href: '#solutions', label: 'Sales reps' },
            { href: '#solutions', label: 'Delivery teams' },
        ],
    },
    {
        title: 'Help',
        links: [
            { href: '#how-it-works', label: 'How it works' },
            { href: '#faq', label: 'FAQ' },
            { href: '#help', label: 'Get support' },
        ],
    },
    {
        title: 'Account',
        links: [
            { to: '/login', label: 'Log in' },
            { to: '/register', label: 'Register your business' },
        ],
    },
];

const linkClass = 'text-sm text-muted-foreground hover:text-foreground';

export function Footer() {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
                    <div className="max-w-xs">
                        <span className="text-lg font-semibold text-foreground">XiDistro</span>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Order-taking, delivery-tracking, and margin-visibility software for small FMCG
                            distributors and wholesalers.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
                        {columns.map((col) => (
                            <div key={col.title}>
                                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                                <ul className="mt-3 space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            {link.to ? (
                                                <Link to={link.to} className={linkClass}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a href={link.href} className={linkClass}>
                                                    {link.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} XiDistro. All rights reserved.</p>
                    <p className="text-xs text-muted-foreground">Built for local distributors, with love from Kenya.</p>
                </div>
            </div>
        </footer>
    );
}
