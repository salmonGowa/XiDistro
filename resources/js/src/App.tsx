import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProductsPage } from './pages/products/ProductsPage';
import { RetailersPage } from './pages/retailers/RetailersPage';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppShell />}>
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/retailers" element={<RetailersPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </AuthProvider>
    );
}
