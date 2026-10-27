import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { BoxIcon, GridIcon, LogOutIcon, StoreIcon } from '../ui/icons';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: GridIcon },
    { to: '/products', label: 'Products', icon: BoxIcon },
    { to: '/retailers', label: 'Retailers', icon: StoreIcon },
];

const subscriptionLabels = { trial: 'Free trial', active: 'Active', suspended: 'Suspended' } as const;

function Logo() {
    return (
        <span className="inline-flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-black text-accent-foreground">Xi</span>
            XiDistro
        </span>
    );
}

function initials(name = '') {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
}

export function AppShell() {
    const { user, logout } = useAuth();
    const status = user?.tenant.subscription_status;

    return (
        <div className="min-h-screen bg-muted/30 md:flex">
            {/* Desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
                <div className="flex h-16 shrink-0 items-center px-5">
                    <Logo />
                </div>

                <div className="mx-3 mb-3 rounded-xl bg-muted/60 px-3 py-2.5">
                    <p className="truncate text-sm font-semibold text-foreground">{user?.tenant.name}</p>
                    {status && (
                        <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                status === 'suspended'
                                    ? 'bg-destructive/15 text-destructive'
                                    : status === 'trial'
                                      ? 'bg-accent/25 text-foreground'
                                      : 'bg-success/15 text-success'
                            }`}
                        >
                            {subscriptionLabels[status]}
                        </span>
                    )}
                </div>

                <nav className="flex-1 space-y-1 px-3" aria-label="Main">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`
                            }
                        >
                            <item.icon className="h-[18px] w-[18px] shrink-0" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex shrink-0 items-center gap-3 border-t border-border p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {initials(user?.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="truncate text-xs capitalize text-muted-foreground">{user?.role}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => logout()}
                        aria-label="Log out"
                        title="Log out"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <LogOutIcon className="h-4 w-4" />
                    </button>
                </div>
            </aside>

            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/90 px-4 backdrop-blur md:h-16 md:px-8">
                    <div className="md:hidden">
                        <Logo />
                    </div>
                    <div className="flex-1" />
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => logout()}
                        aria-label="Log out"
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                    >
                        <LogOutIcon className="h-4 w-4" />
                    </button>
                </header>

                {/* pb-24 on phones leaves room for the bottom tab bar */}
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 lg:px-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile bottom tab bar — primary destinations within thumb reach */}
            <nav
                aria-label="Main"
                className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                                isActive ? 'text-primary' : 'text-muted-foreground'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`flex h-7 w-12 items-center justify-center rounded-full ${isActive ? 'bg-primary/15' : ''}`}>
                                    <item.icon className="h-5 w-5" />
                                </span>
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
