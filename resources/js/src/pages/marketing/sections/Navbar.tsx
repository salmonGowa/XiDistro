import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

const navLinks = [
    { href: '#solutions', label: 'Solutions' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'Help' },
];

export function Navbar() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#top" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-black text-accent-foreground">Xi</span>
                    XiDistro
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle className="hidden sm:inline-flex" />
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Go to app
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-block"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                Register your business
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
