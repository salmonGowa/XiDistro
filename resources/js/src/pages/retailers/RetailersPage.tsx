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
import { MapPinIcon, PhoneIcon, PlusIcon, StoreIcon } from '../../components/ui/icons';
import type { Retailer } from '../../types';

const emptyForm = { shop_name: '', phone: '', location: '' };

function ShopAvatar({ name }: { name: string }) {
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
            {name.charAt(0).toUpperCase()}
        </span>
    );
}

export function RetailersPage() {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const { items: retailers, isLoading, error: loadError, reload } = useCollection<Retailer>('/retailers');

    const [query, setQuery] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [toDelete, setToDelete] = useState<Retailer | null>(null);
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
        return retailers
            .filter((r) => (q ? [r.shop_name, r.phone, r.location].some((v) => v.toLowerCase().includes(q)) : true))
            .sort((a, b) => a.shop_name.localeCompare(b.shop_name));
    }, [retailers, query]);

    function openCreate() {
        setEditingId(null);
        setForm(emptyForm);
        setErrors({});
        setFormError(undefined);
        setIsFormOpen(true);
    }

    function openEdit(retailer: Retailer) {
        setEditingId(retailer.id);
        setForm({ shop_name: retailer.shop_name, phone: retailer.phone, location: retailer.location });
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
                await client.put(`/retailers/${editingId}`, form);
            } else {
                await client.post('/retailers', form);
            }
            toast(editingId ? `Saved changes to ${form.shop_name}` : `${form.shop_name} added`);
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
            await client.delete(`/retailers/${toDelete.id}`);
            toast(`${toDelete.shop_name} deleted`);
            reload();
        } catch {
            toast('Could not delete retailer. Please try again.', 'error');
        } finally {
            setIsDeleting(false);
            setToDelete(null);
        }
    }

    const isEmpty = !isLoading && retailers.length === 0;
    const noMatches = !isLoading && retailers.length > 0 && visible.length === 0;
    const fieldError = (field: string) => errors[field]?.[0];

    const addButton = (
        <Button onClick={openCreate} className="w-full sm:w-auto">
            <PlusIcon className="h-4 w-4" /> Add retailer
        </Button>
    );

    return (
        <div className="space-y-5">
            <PageHeader title="Retailers" description="The shops you sell to, with the details your team needs on the road." actions={addButton} />

            {loadError && <FormError message={loadError} />}

            {!isEmpty && (
                <div className="flex items-center justify-between gap-3">
                    <SearchInput value={query} onChange={setQuery} placeholder="Search by shop, phone or area…" label="Search retailers" />
                    <p className="hidden shrink-0 text-sm text-muted-foreground sm:block">
                        {visible.length} of {retailers.length} shops
                    </p>
                </div>
            )}

            {/* Desktop / tablet: table */}
            <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-border bg-muted/50 text-xs text-muted-foreground">
                        <tr>
                            <th className="px-5 py-3 font-medium">Shop</th>
                            <th className="px-5 py-3 font-medium">Phone</th>
                            <th className="px-5 py-3 font-medium">Location</th>
                            <th className="w-24 px-5 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading &&
                            [0, 1, 2, 3].map((i) => (
                                <tr key={i}>
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <td key={j} className="px-5 py-4">
                                            <Skeleton className="h-4 w-full max-w-32" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        {visible.map((retailer) => (
                            <tr key={retailer.id} className="transition-colors hover:bg-muted/40">
                                <td className="px-5 py-3">
                                    <button
                                        type="button"
                                        onClick={() => openEdit(retailer)}
                                        className="flex items-center gap-3 text-left font-medium text-card-foreground hover:text-primary focus-visible:outline-none focus-visible:underline"
                                    >
                                        <ShopAvatar name={retailer.shop_name} />
                                        {retailer.shop_name}
                                    </button>
                                </td>
                                <td className="px-5 py-3">
                                    <a href={`tel:${retailer.phone}`} className="tabular-nums text-muted-foreground hover:text-primary hover:underline">
                                        {retailer.phone}
                                    </a>
                                </td>
                                <td className="px-5 py-3 text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                                        {retailer.location}
                                    </span>
                                </td>
                                <td className="px-3 py-2">
                                    <RowActions label={retailer.shop_name} onEdit={() => openEdit(retailer)} onDelete={() => setToDelete(retailer)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEmpty && (
                    <EmptyState
                        icon={<StoreIcon className="h-6 w-6" />}
                        title="No retailers yet"
                        body="Add the shops you sell to so your team can take and deliver orders."
                        action={addButton}
                    />
                )}
                {noMatches && <EmptyState title="No matching retailers" body="Try a different shop name, phone number or area." />}
            </div>

            {/* Mobile: card stack with a one-tap call button for reps on the road */}
            <div className="space-y-3 md:hidden">
                {isLoading &&
                    [0, 1, 2].map((i) => (
                        <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-4">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                {isEmpty && (
                    <div className="rounded-2xl border border-border bg-card">
                        <EmptyState
                            icon={<StoreIcon className="h-6 w-6" />}
                            title="No retailers yet"
                            body="Add the shops you sell to so your team can take and deliver orders."
                        />
                    </div>
                )}
                {noMatches && <EmptyState title="No matching retailers" body="Try a different shop name, phone number or area." />}
                {visible.map((retailer) => (
                    <div key={retailer.id} className="rounded-2xl border border-border bg-card p-4">
                        <div className="flex items-start gap-3">
                            <ShopAvatar name={retailer.shop_name} />
                            <button type="button" onClick={() => openEdit(retailer)} className="min-w-0 flex-1 text-left">
                                <p className="truncate font-semibold text-card-foreground">{retailer.shop_name}</p>
                                <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-muted-foreground">
                                    <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                                    {retailer.location}
                                </p>
                            </button>
                            <RowActions label={retailer.shop_name} onEdit={() => openEdit(retailer)} onDelete={() => setToDelete(retailer)} />
                        </div>
                        <a
                            href={`tel:${retailer.phone}`}
                            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-muted/60 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            <PhoneIcon className="h-4 w-4 text-primary" />
                            Call {retailer.phone}
                        </a>
                    </div>
                ))}
            </div>

            <Drawer
                open={isFormOpen}
                onClose={closeForm}
                title={editingId ? 'Edit retailer' : 'Add retailer'}
                description={editingId ? 'Update this shop’s details.' : 'Add a shop you sell to.'}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button type="submit" form="retailer-form" isLoading={isSubmitting}>
                            {editingId ? 'Save changes' : 'Add retailer'}
                        </Button>
                    </>
                }
            >
                <form id="retailer-form" onSubmit={handleSubmit} className="space-y-5">
                    <FormError message={formError} />
                    <FormField label="Shop name" htmlFor="shop_name" required error={fieldError('shop_name')}>
                        <Input
                            id="shop_name"
                            required
                            autoFocus
                            autoComplete="organization"
                            placeholder="e.g. Mama Njeri General Store"
                            value={form.shop_name}
                            invalid={!!fieldError('shop_name')}
                            onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
                        />
                    </FormField>
                    <FormField label="Phone number" htmlFor="phone" required error={fieldError('phone')} hint="Used for the tap-to-call button on mobile.">
                        <Input
                            id="phone"
                            required
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="07XX XXX XXX"
                            value={form.phone}
                            invalid={!!fieldError('phone')}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </FormField>
                    <FormField label="Location" htmlFor="location" required error={fieldError('location')} hint="Area, street or landmark your delivery team will recognise.">
                        <Input
                            id="location"
                            required
                            placeholder="e.g. Kawangware, near the stage"
                            value={form.location}
                            invalid={!!fieldError('location')}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                    </FormField>
                </form>
            </Drawer>

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => setToDelete(null)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
                title={`Delete ${toDelete?.shop_name ?? 'retailer'}?`}
                body="This removes the shop from your list. This can't be undone."
            />
        </div>
    );
}
