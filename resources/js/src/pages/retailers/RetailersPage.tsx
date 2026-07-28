import { FormEvent, useEffect, useState } from 'react';
import client from '../../api/client';
import type { Retailer } from '../../types';

type FieldErrors = Record<string, string[]>;

const emptyForm = { shop_name: '', phone: '', location: '' };

export function RetailersPage() {
    const [retailers, setRetailers] = useState<Retailer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function loadRetailers() {
        setIsLoading(true);
        client
            .get<Retailer[]>('/retailers')
            .then((res) => setRetailers(res.data))
            .finally(() => setIsLoading(false));
    }

    useEffect(loadRetailers, []);

    function startEdit(retailer: Retailer) {
        setEditingId(retailer.id);
        setForm({ shop_name: retailer.shop_name, phone: retailer.phone, location: retailer.location });
        setErrors({});
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setErrors({});
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        try {
            if (editingId) {
                await client.put(`/retailers/${editingId}`, form);
            } else {
                await client.post('/retailers', form);
            }
            cancelEdit();
            loadRetailers();
        } catch (err: any) {
            setErrors(err.response?.data?.errors ?? {});
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this retailer?')) return;
        await client.delete(`/retailers/${id}`);
        loadRetailers();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-lg font-semibold text-slate-900">Retailers</h1>
                <p className="text-sm text-slate-500">The shops you sell to.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-4">
                <div className="col-span-2 sm:col-span-2">
                    <label htmlFor="shop_name" className="mb-1 block text-xs font-medium text-slate-600">Shop name</label>
                    <input
                        id="shop_name"
                        required
                        value={form.shop_name}
                        onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
                        className={inputClass}
                    />
                    {errors.shop_name && <p className="mt-1 text-xs text-red-600">{errors.shop_name[0]}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
                    <input
                        id="phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone[0]}</p>}
                </div>
                <div>
                    <label htmlFor="location" className="mb-1 block text-xs font-medium text-slate-600">Location</label>
                    <input
                        id="location"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className={inputClass}
                    />
                    {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location[0]}</p>}
                </div>
                <div className="col-span-2 flex items-end gap-2 sm:col-span-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        {editingId ? 'Save changes' : 'Add retailer'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-4 py-2">Shop</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-slate-400">
                                    Loading…
                                </td>
                            </tr>
                        )}
                        {!isLoading && retailers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-slate-400">
                                    No retailers yet.
                                </td>
                            </tr>
                        )}
                        {retailers.map((retailer) => (
                            <tr key={retailer.id} className="border-b border-slate-100 last:border-0">
                                <td className="px-4 py-2 font-medium text-slate-900">{retailer.shop_name}</td>
                                <td className="px-4 py-2 text-slate-600">{retailer.phone}</td>
                                <td className="px-4 py-2 text-slate-600">{retailer.location}</td>
                                <td className="space-x-2 px-4 py-2 text-right">
                                    <button
                                        onClick={() => startEdit(retailer)}
                                        className="text-slate-500 hover:text-slate-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(retailer.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const inputClass =
    'w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none';
