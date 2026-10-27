import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
                <div
                    className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary"
                    role="status"
                    aria-label="Loading"
                />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
