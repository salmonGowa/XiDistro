import { FormEvent, useEffect, useState } from 'react';
import client from '../../api/client';
import type { Product } from '../../types';

type FieldErrors = Record<string, string[]>;

const emptyForm = { name: '', cost_price: '', sale_price: '', stock_qty: '' };

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function loadProducts() {
        setIsLoading(true);
        client
            .get<Product[]>('/products')
            .then((res) => setProducts(res.data))
            .finally(() => setIsLoading(false));
    }

    useEffect(loadProducts, []);

    function startEdit(product: Product) {
        setEditingId(product.id);
        setForm({
            name: product.name,
            cost_price: product.cost_price,
            sale_price: product.sale_price,
            stock_qty: String(product.stock_qty),
        });
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
                await client.put(`/products/${editingId}`, form);
            } else {
                await client.post('/products', form);
            }
            cancelEdit();
            loadProducts();
        } catch (err: any) {
            setErrors(err.response?.data?.errors ?? {});
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this product?')) return;
        await client.delete(`/products/${id}`);
        loadProducts();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-lg font-semibold text-slate-900">Products</h1>
                <p className="text-sm text-slate-500">Manage what you sell, and your margin on each item.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-4">
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="mb-1 block text-xs font-medium text-slate-600">Name</label>
                    <input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name[0]}</p>}
                </div>
                <div>
                    <label htmlFor="cost_price" className="mb-1 block text-xs font-medium text-slate-600">Cost price</label>
                    <input
                        id="cost_price"
                        required
                        type="number"
                        step="0.01"
                        value={form.cost_price}
                        onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
                        className={inputClass}
                    />
                    {errors.cost_price && <p className="mt-1 text-xs text-red-600">{errors.cost_price[0]}</p>}
                </div>
                <div>
                    <label htmlFor="sale_price" className="mb-1 block text-xs font-medium text-slate-600">Sale price</label>
                    <input
                        id="sale_price"
                        required
                        type="number"
                        step="0.01"
                        value={form.sale_price}
                        onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                        className={inputClass}
                    />
                    {errors.sale_price && <p className="mt-1 text-xs text-red-600">{errors.sale_price[0]}</p>}
                </div>
                <div>
                    <label htmlFor="stock_qty" className="mb-1 block text-xs font-medium text-slate-600">Stock qty</label>
                    <input
                        id="stock_qty"
                        required
                        type="number"
                        value={form.stock_qty}
                        onChange={(e) => setForm({ ...form, stock_qty: e.target.value })}
                        className={inputClass}
                    />
                    {errors.stock_qty && <p className="mt-1 text-xs text-red-600">{errors.stock_qty[0]}</p>}
                </div>
                <div className="col-span-2 flex items-end gap-2 sm:col-span-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        {editingId ? 'Save changes' : 'Add product'}
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
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Cost</th>
                            <th className="px-4 py-2">Sale</th>
                            <th className="px-4 py-2">Margin</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={6} className="px-4 py-4 text-center text-slate-400">
                                    Loading…
                                </td>
                            </tr>
                        )}
                        {!isLoading && products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-4 text-center text-slate-400">
                                    No products yet.
                                </td>
                            </tr>
                        )}
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-slate-100 last:border-0">
                                <td className="px-4 py-2 font-medium text-slate-900">{product.name}</td>
                                <td className="px-4 py-2 text-slate-600">{product.cost_price}</td>
                                <td className="px-4 py-2 text-slate-600">{product.sale_price}</td>
                                <td className="px-4 py-2 text-emerald-700">
                                    {(Number(product.sale_price) - Number(product.cost_price)).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-slate-600">{product.stock_qty}</td>
                                <td className="space-x-2 px-4 py-2 text-right">
                                    <button
                                        onClick={() => startEdit(product)}
                                        className="text-slate-500 hover:text-slate-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
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
