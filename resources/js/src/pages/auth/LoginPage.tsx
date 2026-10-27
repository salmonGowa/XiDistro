import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { FormError, FormField, Input, PasswordInput } from '../../components/ui/Form';

export function LoginPage() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(undefined);
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 422) {
                setError('That email and password don’t match. Please check and try again.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to manage your products, retailers and deliveries.">
            <form onSubmit={handleSubmit} className="space-y-5">
                <FormError message={error} />
                <FormField label="Email" htmlFor="email">
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        autoComplete="username"
                        placeholder="you@business.co.ke"
                        value={email}
                        invalid={!!error}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormField>
                <FormField label="Password" htmlFor="password">
                    <PasswordInput
                        id="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        invalid={!!error}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormField>
                <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                    {isSubmitting ? 'Logging in…' : 'Log in'}
                </Button>
            </form>

            <p className="mt-8 rounded-xl bg-muted/60 px-4 py-3 text-center text-sm text-muted-foreground">
                New to XiDistro?{' '}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                    Register your business
                </Link>
            </p>
        </AuthLayout>
    );
}
