import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { to: '/products', label: 'Products' },
    { to: '/retailers', label: 'Retailers' },
];

export function AppShell() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
                    <div>
                        <p className="font-semibold text-slate-900">{user?.tenant.name}</p>
                        <p className="text-xs text-slate-500">{user?.name} · {user?.role}</p>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="text-sm text-slate-500 hover:text-slate-800"
                    >
                        Log out
                    </button>
                </div>
                <nav className="mx-auto flex max-w-3xl gap-4 px-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `border-b-2 py-2 text-sm font-medium ${
                                    isActive
                                        ? 'border-slate-900 text-slate-900'
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </header>
            <main className="mx-auto max-w-3xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
