import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export function FinalCTA() {
    const { user } = useAuth();

    return (
        <section className="relative overflow-hidden border-y border-border">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-success/10" />
            <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Ready to run your distribution business on XiDistro?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                    Set up your products and retailers in minutes, and start taking orders today.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Link
                        to={user ? '/dashboard' : '/register'}
                        className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        {user ? 'Go to app' : 'Register your business'}
                    </Link>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">No credit card required to start your trial.</p>
            </div>
        </section>
    );
}
