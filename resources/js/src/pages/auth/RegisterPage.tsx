import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';

type FieldErrors = Record<string, string[]>;

export function RegisterPage() {
    const { user, register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        business_name: '',
        business_phone: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (user) {
        return <Navigate to="/products" replace />;
    }

    function update(field: keyof typeof form, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        try {
            await register(form);
            navigate('/products');
        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            } else {
                setErrors({ form: ['Something went wrong. Please try again.'] });
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    function fieldError(field: string) {
        return errors[field]?.[0];
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
            <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-1 text-xl font-semibold text-slate-900">Register your business</h1>
                <p className="mb-6 text-sm text-slate-500">Create your distributor account on XiDistro.</p>

                {errors.form && (
                    <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form[0]}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Field id="business_name" label="Business name" error={fieldError('business_name')}>
                        <input
                            id="business_name"
                            required
                            value={form.business_name}
                            onChange={(e) => update('business_name', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="business_phone" label="Business phone" error={fieldError('business_phone')}>
                        <input
                            id="business_phone"
                            required
                            value={form.business_phone}
                            onChange={(e) => update('business_phone', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="name" label="Your name" error={fieldError('name')}>
                        <input
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="phone" label="Your phone" error={fieldError('phone')}>
                        <input
                            id="phone"
                            required
                            value={form.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="email" label="Email" error={fieldError('email')}>
                        <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="password" label="Password" error={fieldError('password')}>
                        <input
                            id="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={(e) => update('password', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <Field id="password_confirmation" label="Confirm password">
                        <input
                            id="password_confirmation"
                            type="password"
                            required
                            value={form.password_confirmation}
                            onChange={(e) => update('password_confirmation', e.target.value)}
                            className={inputClass}
                        />
                    </Field>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Already registered?{' '}
                    <Link to="/login" className="font-medium text-slate-900 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

const inputClass =
    'w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none';

function Field({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}
