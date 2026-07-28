import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import client, { ensureCsrfCookie } from '../api/client';
import type { User } from '../types';

interface RegisterPayload {
    business_name: string;
    business_phone: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        client
            .get<User>('/user')
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    async function login(email: string, password: string) {
        await ensureCsrfCookie();
        await client.post('/login', { email, password });
        const res = await client.get<User>('/user');
        setUser(res.data);
    }

    async function register(payload: RegisterPayload) {
        await ensureCsrfCookie();
        const res = await client.post<User>('/register', payload);
        setUser(res.data);
    }

    async function logout() {
        await client.post('/logout');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}
