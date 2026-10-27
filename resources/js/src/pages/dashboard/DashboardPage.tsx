import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCollection } from '../../hooks/useCollection';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { buttonClass } from '../../components/ui/Button';
import { AlertIcon, ArrowRightIcon, BoxIcon, ChartIcon, CheckIcon, PlusIcon, StoreIcon } from '../../components/ui/icons';
import { formatKES, LOW_STOCK_THRESHOLD, marginOf } from '../../lib/format';
import type { Product, Retailer } from '../../types';

function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
    return (
        <section className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                <h2 className="font-semibold text-card-foreground">{title}</h2>
                {action}
            </div>
            <div className="p-5">{children}</div>
        </section>
    );
}

function GettingStarted({ hasProducts, hasRetailers }: { hasProducts: boolean; hasRetailers: boolean }) {
    const steps = [
        { done: true, label: 'Register your business', to: null },
        { done: hasProducts, label: 'Add your first product', to: '/products?new=1' },
        { done: hasRetailers, label: 'Add your first retailer', to: '/retailers?new=1' },
    ];
    const completed = steps.filter((s) => s.done).length;

    return (
        <section className="rounded-2xl border border-accent/40 bg-accent-soft p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold text-foreground">Let's get you set up</h2>
                <span className="text-sm text-muted-foreground">
                    {completed} of {steps.length} done
                </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/70">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(completed / steps.length) * 100}%` }} />
            </div>
            <ol className="mt-4 grid gap-2 sm:grid-cols-3">
                {steps.map((step) => {
                    const content = (
                        <>
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                    step.done ? 'bg-success text-success-foreground' : 'border-2 border-muted-foreground/40'
                                }`}
                            >
                                {step.done && <CheckIcon className="h-3.5 w-3.5" />}
                            </span>
                            <span className={step.done ? 'text-muted-foreground line-through' : 'font-medium text-foreground'}>
                                {step.label}
                            </span>
                        </>
                    );
                    return (
                        <li key={step.label}>
                            {step.to && !step.done ? (
                                <Link
                                    to={step.to}
                                    className="flex h-full items-center gap-3 rounded-xl bg-background/80 px-4 py-3 text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {content}
                                    <ArrowRightIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                                </Link>
                            ) : (
                                <div className="flex h-full items-center gap-3 rounded-xl bg-background/50 px-4 py-3 text-sm">{content}</div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

function ListSkeleton() {
    return (
        <div className="space-y-3">
            {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
        </div>
    );
}

export function DashboardPage() {
    const { user } = useAuth();
    const products = useCollection<Product>('/products');
    const retailers = useCollection<Retailer>('/retailers');
    const isLoading = products.isLoading || retailers.isLoading;

    const stockValue = products.items.reduce((sum, p) => sum + Number(p.cost_price) * p.stock_qty, 0);
    const stockProfit = products.items.reduce((sum, p) => sum + marginOf(p.cost_price, p.sale_price).amount * p.stock_qty, 0);
    const lowStock = products.items
        .filter((p) => p.stock_qty <= LOW_STOCK_THRESHOLD)
        .sort((a, b) => a.stock_qty - b.stock_qty)
        .slice(0, 5);
    const topMargins = products.items
        .map((p) => ({ product: p, ...marginOf(p.cost_price, p.sale_price) }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 5);
    const bestPercent = Math.max(...topMargins.map((m) => m.percent), 1);

    const needsSetup = !isLoading && (products.items.length === 0 || retailers.items.length === 0);
    const firstName = user?.name.split(' ')[0];

    return (
        <div className="space-y-6">
            <PageHeader
                title={`${greeting()}, ${firstName} 👋`}
                description={`Here's how ${user?.tenant.name} is looking today.`}
                actions={
                    <>
                        <Link to="/retailers?new=1" className={buttonClass('secondary', 'md', 'flex-1 sm:flex-none')}>
                            <PlusIcon className="h-4 w-4" /> Retailer
                        </Link>
                        <Link to="/products?new=1" className={buttonClass('primary', 'md', 'flex-1 sm:flex-none')}>
                            <PlusIcon className="h-4 w-4" /> Product
                        </Link>
                    </>
                }
            />

            {needsSetup && <GettingStarted hasProducts={products.items.length > 0} hasRetailers={retailers.items.length > 0} />}

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <StatCard
                    label="Products"
                    value={String(products.items.length)}
                    hint={`${lowStock.length} low on stock`}
                    icon={<BoxIcon className="h-[18px] w-[18px]" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Retailers"
                    value={String(retailers.items.length)}
                    hint="Shops you sell to"
                    icon={<StoreIcon className="h-[18px] w-[18px]" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Stock value"
                    value={formatKES(stockValue, { whole: true })}
                    hint="At cost price"
                    icon={<BoxIcon className="h-[18px] w-[18px]" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Profit in stock"
                    value={formatKES(stockProfit, { whole: true })}
                    hint="If everything sells at list price"
                    icon={<ChartIcon className="h-[18px] w-[18px]" />}
                    isLoading={isLoading}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Panel
                    title="Running low"
                    action={
                        <Link to="/products?filter=low" className="text-sm font-medium text-primary hover:underline">
                            View all
                        </Link>
                    }
                >
                    {isLoading ? (
                        <ListSkeleton />
                    ) : lowStock.length === 0 ? (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckIcon className="h-4 w-4 text-success" />
                            Everything is above {LOW_STOCK_THRESHOLD} units. Nice.
                        </p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {lowStock.map((p) => (
                                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                                    <span className="flex min-w-0 items-center gap-2">
                                        <AlertIcon className={`h-4 w-4 shrink-0 ${p.stock_qty === 0 ? 'text-destructive' : 'text-accent'}`} />
                                        <span className="truncate text-sm font-medium text-card-foreground">{p.name}</span>
                                    </span>
                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
                                            p.stock_qty === 0 ? 'bg-destructive/15 text-destructive' : 'bg-accent/25 text-foreground'
                                        }`}
                                    >
                                        {p.stock_qty === 0 ? 'Out of stock' : `${p.stock_qty} left`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>

                <Panel
                    title="Best margins"
                    action={
                        <Link to="/products" className="text-sm font-medium text-primary hover:underline">
                            All products
                        </Link>
                    }
                >
                    {isLoading ? (
                        <ListSkeleton />
                    ) : topMargins.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Add products with cost and sale prices to see your margins here.</p>
                    ) : (
                        <ul className="space-y-3.5">
                            {topMargins.map(({ product, amount, percent }) => (
                                <li key={product.id}>
                                    <div className="flex items-baseline justify-between gap-3 text-sm">
                                        <span className="truncate font-medium text-card-foreground">{product.name}</span>
                                        <span className="shrink-0 tabular-nums text-muted-foreground">
                                            {formatKES(amount)} ·{' '}
                                            <span className={percent < 0 ? 'text-destructive' : 'font-semibold text-success'}>{percent.toFixed(1)}%</span>
                                        </span>
                                    </div>
                                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-success"
                                            style={{ width: `${Math.max(0, (percent / bestPercent) * 100)}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>
            </div>
        </div>
    );
}
