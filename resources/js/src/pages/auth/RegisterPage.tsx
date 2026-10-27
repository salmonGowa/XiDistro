import { FormEvent, useState, type ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { extractErrors, type FieldErrors } from '../../hooks/useCollection';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { FormError, FormField, Input, PasswordInput } from '../../components/ui/Form';

function Section({ step, title, children }: { step: number; title: string; children: ReactNode }) {
    return (
        <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {step}
                </span>
                {title}
            </legend>
            {children}
        </fieldset>
    );
}

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
    const [formError, setFormError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    function update(field: keyof typeof form, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setFormError(undefined);
        setIsSubmitting(true);
        try {
            await register(form);
            navigate('/dashboard');
        } catch (err) {
            const { fields, message } = extractErrors(err);
            setErrors(fields);
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const fieldError = (field: string) => errors[field]?.[0];
    const passwordsMismatch = form.password_confirmation !== '' && form.password !== form.password_confirmation;

    return (
        <AuthLayout title="Register your business" subtitle="Takes about two minutes. You can start adding products right after.">
            <form onSubmit={handleSubmit} className="space-y-8">
                <FormError message={formError} />

                <Section step={1} title="Your business">
                    <FormField label="Business name" htmlFor="business_name" required error={fieldError('business_name')}>
                        <Input
                            id="business_name"
                            required
                            autoFocus
                            autoComplete="organization"
                            placeholder="e.g. Baraka Distributors"
                            value={form.business_name}
                            invalid={!!fieldError('business_name')}
                            onChange={(e) => update('business_name', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Business phone" htmlFor="business_phone" required error={fieldError('business_phone')}>
                        <Input
                            id="business_phone"
                            required
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="07XX XXX XXX"
                            value={form.business_phone}
                            invalid={!!fieldError('business_phone')}
                            onChange={(e) => update('business_phone', e.target.value)}
                        />
                    </FormField>
                </Section>

                <Section step={2} title="About you">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Your name" htmlFor="name" required error={fieldError('name')}>
                            <Input
                                id="name"
                                required
                                autoComplete="name"
                                value={form.name}
                                invalid={!!fieldError('name')}
                                onChange={(e) => update('name', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Your phone" htmlFor="phone" required error={fieldError('phone')}>
                            <Input
                                id="phone"
                                required
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                value={form.phone}
                                invalid={!!fieldError('phone')}
                                onChange={(e) => update('phone', e.target.value)}
                            />
                        </FormField>
                    </div>
                    <FormField label="Email" htmlFor="email" required error={fieldError('email')} hint="You'll use this to log in.">
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@business.co.ke"
                            value={form.email}
                            invalid={!!fieldError('email')}
                            onChange={(e) => update('email', e.target.value)}
                        />
                    </FormField>
                </Section>

                <Section step={3} title="Secure your account">
                    <FormField label="Password" htmlFor="password" required error={fieldError('password')} hint="At least 8 characters.">
                        <PasswordInput
                            id="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            value={form.password}
                            invalid={!!fieldError('password')}
                            onChange={(e) => update('password', e.target.value)}
                        />
                    </FormField>
                    <FormField
                        label="Confirm password"
                        htmlFor="password_confirmation"
                        required
                        error={passwordsMismatch ? 'Passwords don’t match yet.' : undefined}
                    >
                        <PasswordInput
                            id="password_confirmation"
                            required
                            autoComplete="new-password"
                            value={form.password_confirmation}
                            invalid={passwordsMismatch}
                            onChange={(e) => update('password_confirmation', e.target.value)}
                        />
                    </FormField>
                </Section>

                <Button type="submit" size="lg" isLoading={isSubmitting} disabled={passwordsMismatch} className="w-full">
                    {isSubmitting ? 'Creating your account…' : 'Create account'}
                </Button>
            </form>

            <p className="mt-8 rounded-xl bg-muted/60 px-4 py-3 text-center text-sm text-muted-foreground">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
