import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { extractErrors, useCollection, type FieldErrors } from '../../hooks/useCollection';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { RowActions } from '../../components/ui/RowActions';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Drawer } from '../../components/ui/Overlay';
import { FormError, FormField, Input, SearchInput } from '../../components/ui/Form';
import { BoxIcon, PlusIcon } from '../../components/ui/icons';
import { formatKES, LOW_STOCK_THRESHOLD, marginOf } from '../../lib/format';
import type { Product } from '../../types';

const emptyForm = { name: '', cost_price: '', sale_price: '', stock_qty: '' };

type Filter = 'all' | 'low';
type Sort = 'name' | 'margin' | 'stock';

function StockBadge({ qty }: { qty: number }) {
    if (qty === 0) {
        return <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive">Out of stock</span>;
    }
    if (qty <= LOW_STOCK_THRESHOLD) {
        return <span className="rounded-full bg-accent/25 px-2 py-0.5 text-xs font-medium text-foreground">Low · {qty}</span>;
    }
    return <span className="tabular-nums text-muted-foreground">{qty}</span>;
}

function MarginValue({ product }: { product: Product }) {
    const { amount, percent } = marginOf(product.cost_price, product.sale_price);
    return (
        <span className={amount < 0 ? 'text-destructive' : 'text-success'}>
            <span className="font-semibold tabular-nums">{formatKES(amount)}</span>
            <span className="ml-1.5 text-xs opacity-80 tabular-nums">{percent.toFixed(1)}%</span>
        </span>
    );
}

// Live preview so the user sees the margin before saving.
function MarginPreview({ cost, sale }: { cost: string; sale: string }) {
    if (cost === '' || sale === '') {
        return (
            <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                Enter cost and sale price to see your margin.
            </div>
        );
    }
    const { amount, percent } = marginOf(cost, sale);
    const negative = amount < 0;
    return (
        <div className={`rounded-xl px-4 py-3 ${negative ? 'bg-destructive/10' : 'bg-success/10'}`}>
            <p className="text-xs font-medium text-muted-foreground">Margin per unit</p>
            <p className={`mt-0.5 text-lg font-semibold tabular-nums ${negative ? 'text-destructive' : 'text-success'}`}>
                {formatKES(amount)} <span className="text-sm font-medium">({percent.toFixed(1)}%)</span>
            </p>
            {negative && <p className="mt-1 text-xs text-destructive">You'd be selling below cost.</p>}
        </div>
    );
}

export function ProductsPage() {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const { items: products, isLoading, error: loadError, reload } = useCollection<Product>('/products');

    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>(searchParams.get('filter') === 'low' ? 'low' : 'all');
    const [sort, setSort] = useState<Sort>('name');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [toDelete, setToDelete] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Dashboard quick actions link here with ?new=1.
    useEffect(() => {
        if (searchParams.get('new') === '1') {
            openCreate();
            searchParams.delete('new');
            setSearchParams(searchParams, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products
            .filter((p) => (filter === 'low' ? p.stock_qty <= LOW_STOCK_THRESHOLD : true))
            .filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
            .sort((a, b) => {
                if (sort === 'margin') return marginOf(b.cost_price, b.sale_price).percent - marginOf(a.cost_price, a.sale_price).percent;
                if (sort === 'stock') return a.stock_qty - b.stock_qty;
                return a.name.localeCompare(b.name);
            });
    }, [products, query, filter, sort]);

    const lowCount = products.filter((p) => p.stock_qty <= LOW_STOCK_THRESHOLD).length;

    function openCreate() {
        setEditingId(null);
        setForm(emptyForm);
        setErrors({});
        setFormError(undefined);
        setIsFormOpen(true);
    }

    function openEdit(product: Product) {
        setEditingId(product.id);
        setForm({
            name: product.name,
            cost_price: product.cost_price,
            sale_price: product.sale_price,
            stock_qty: String(product.stock_qty),
        });
        setErrors({});
        setFormError(undefined);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setFormError(undefined);
        setIsSubmitting(true);
        try {
            if (editingId) {
                await client.put(`/products/${editingId}`, form);
            } else {
                await client.post('/products', form);
            }
            toast(editingId ? `Saved changes to ${form.name}` : `${form.name} added`);
            closeForm();
            reload();
        } catch (err) {
            const { fields, message } = extractErrors(err);
            setErrors(fields);
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function confirmDelete() {
        if (!toDelete) return;
        setIsDeleting(true);
        try {
            await client.delete(`/products/${toDelete.id}`);
            toast(`${toDelete.name} deleted`);
            reload();
        } catch {
            toast('Could not delete product. Please try again.', 'error');
        } finally {
            setIsDeleting(false);
            setToDelete(null);
        }
    }

    const isEmpty = !isLoading && products.length === 0;
    const noMatches = !isLoading && products.length > 0 && visible.length === 0;
    const fieldError = (field: string) => errors[field]?.[0];

    const addButton = (
        <Button onClick={openCreate} className="w-full sm:w-auto">
            <PlusIcon className="h-4 w-4" /> Add product
        </Button>
    );

    return (
        <div className="space-y-5">
            <PageHeader title="Products" description="What you sell, what it costs you, and what you make on each item." actions={addButton} />

            {loadError && <FormError message={loadError} />}

            {!isEmpty && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SearchInput value={query} onChange={setQuery} placeholder="Search products…" label="Search products" />
                    <div className="flex items-center gap-2">
                        <div className="inline-flex rounded-lg border border-border bg-card p-1" role="group" aria-label="Filter products">
                            {(
                                [
                                    ['all', `All (${products.length})`],
                                    ['low', `Low stock (${lowCount})`],
                                ] as const
                            ).map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFilter(value)}
                                    aria-pressed={filter === value}
                                    className={`h-8 rounded-md px-3 text-sm font-medium transition-colors ${
                                        filter === value ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as Sort)}
                            aria-label="Sort products"
                            className="h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                        >
                            <option value="name">Sort: Name</option>
                            <option value="margin">Sort: Best margin</option>
                            <option value="stock">Sort: Lowest stock</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Desktop / tablet: table */}
            <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-border bg-muted/50 text-xs font-medium text-muted-foreground">
                        <tr>
                            <th className="px-5 py-3 font-medium">Product</th>
                            <th className="px-5 py-3 text-right font-medium">Cost</th>
                            <th className="px-5 py-3 text-right font-medium">Sale</th>
                            <th className="px-5 py-3 text-right font-medium">Margin</th>
                            <th className="px-5 py-3 text-right font-medium">Stock</th>
                            <th className="w-24 px-5 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading &&
                            [0, 1, 2, 3].map((i) => (
                                <tr key={i}>
                                    {Array.from({ length: 6 }).map((_, j) => (
                                        <td key={j} className="px-5 py-4">
                                            <Skeleton className="h-4 w-full max-w-24" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        {visible.map((product) => (
                            <tr key={product.id} className="group transition-colors hover:bg-muted/40">
                                <td className="px-5 py-3">
                                    <button
                                        type="button"
                                        onClick={() => openEdit(product)}
                                        className="text-left font-medium text-card-foreground hover:text-primary focus-visible:outline-none focus-visible:underline"
                                    >
                                        {product.name}
                                    </button>
                                </td>
                                <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{formatKES(product.cost_price)}</td>
                                <td className="px-5 py-3 text-right tabular-nums text-card-foreground">{formatKES(product.sale_price)}</td>
                                <td className="px-5 py-3 text-right">
                                    <MarginValue product={product} />
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <StockBadge qty={product.stock_qty} />
                                </td>
                                <td className="px-3 py-2">
                                    <RowActions label={product.name} onEdit={() => openEdit(product)} onDelete={() => setToDelete(product)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEmpty && (
                    <EmptyState
                        icon={<BoxIcon className="h-6 w-6" />}
                        title="No products yet"
                        body="Add the items you sell with their cost and sale prices — margins are worked out for you."
                        action={addButton}
                    />
                )}
                {noMatches && <EmptyState title="No matching products" body="Try a different search or clear the filter." />}
            </div>

            {/* Mobile: card stack */}
            <div className="space-y-3 md:hidden">
                {isLoading &&
                    [0, 1, 2].map((i) => (
                        <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-4">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                {isEmpty && (
                    <div className="rounded-2xl border border-border bg-card">
                        <EmptyState
                            icon={<BoxIcon className="h-6 w-6" />}
                            title="No products yet"
                            body="Add the items you sell with their cost and sale prices — margins are worked out for you."
                        />
                    </div>
                )}
                {noMatches && <EmptyState title="No matching products" body="Try a different search or clear the filter." />}
                {visible.map((product) => (
                    <div key={product.id} className="rounded-2xl border border-border bg-card p-4">
                        <div className="flex items-start justify-between gap-2">
                            <button type="button" onClick={() => openEdit(product)} className="min-w-0 py-1 text-left">
                                <p className="truncate font-semibold text-card-foreground">{product.name}</p>
                                <p className="mt-0.5 text-sm">
                                    <MarginValue product={product} />
                                </p>
                            </button>
                            <RowActions label={product.name} onEdit={() => openEdit(product)} onDelete={() => setToDelete(product)} />
                        </div>
                        <dl className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3 text-sm">
                            <div>
                                <dt className="text-xs text-muted-foreground">Cost</dt>
                                <dd className="tabular-nums text-card-foreground">{formatKES(product.cost_price, { whole: true })}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-muted-foreground">Sale</dt>
                                <dd className="tabular-nums text-card-foreground">{formatKES(product.sale_price, { whole: true })}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-muted-foreground">Stock</dt>
                                <dd>
                                    <StockBadge qty={product.stock_qty} />
                                </dd>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>

            <Drawer
                open={isFormOpen}
                onClose={closeForm}
                title={editingId ? 'Edit product' : 'Add product'}
                description={editingId ? 'Update prices or stock for this item.' : 'Add an item to your catalog.'}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button type="submit" form="product-form" isLoading={isSubmitting}>
                            {editingId ? 'Save changes' : 'Add product'}
                        </Button>
                    </>
                }
            >
                <form id="product-form" onSubmit={handleSubmit} className="space-y-5">
                    <FormError message={formError} />
                    <FormField label="Product name" htmlFor="name" required error={fieldError('name')} hint="As your retailers know it, e.g. “Coca-Cola 500ml ×24”">
                        <Input
                            id="name"
                            required
                            autoFocus
                            autoComplete="off"
                            value={form.name}
                            invalid={!!fieldError('name')}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Cost price" htmlFor="cost_price" required error={fieldError('cost_price')}>
                            <Input
                                id="cost_price"
                                required
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                addon="KES"
                                placeholder="0.00"
                                value={form.cost_price}
                                invalid={!!fieldError('cost_price')}
                                onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
                            />
                        </FormField>
                        <FormField label="Sale price" htmlFor="sale_price" required error={fieldError('sale_price')}>
                            <Input
                                id="sale_price"
                                required
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                addon="KES"
                                placeholder="0.00"
                                value={form.sale_price}
                                invalid={!!fieldError('sale_price')}
                                onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                            />
                        </FormField>
                    </div>

                    <MarginPreview cost={form.cost_price} sale={form.sale_price} />

                    <FormField label="Units in stock" htmlFor="stock_qty" required error={fieldError('stock_qty')} hint={`Items at or below ${LOW_STOCK_THRESHOLD} are flagged as low stock.`}>
                        <Input
                            id="stock_qty"
                            required
                            type="number"
                            inputMode="numeric"
                            min="0"
                            step="1"
                            placeholder="0"
                            value={form.stock_qty}
                            invalid={!!fieldError('stock_qty')}
                            onChange={(e) => setForm({ ...form, stock_qty: e.target.value })}
                        />
                    </FormField>
                </form>
            </Drawer>

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => setToDelete(null)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
                title={`Delete ${toDelete?.name ?? 'product'}?`}
                body="This removes it from your catalog. This can't be undone."
            />
        </div>
    );
}
