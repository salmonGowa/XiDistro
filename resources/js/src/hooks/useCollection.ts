import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import client from '../api/client';

// Loads a list endpoint (e.g. '/products') and exposes a reload for after create/update/delete.
export function useCollection<T>(path: string) {
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(() => {
        return client
            .get<T[]>(path)
            .then((res) => {
                setItems(res.data);
                setError(null);
            })
            .catch(() => setError('Could not load data. Check your connection and try again.'))
            .finally(() => setIsLoading(false));
    }, [path]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { items, isLoading, error, reload };
}

export type FieldErrors = Record<string, string[]>;

// Laravel 422 responses carry per-field messages; anything else becomes a single form-level message.
export function extractErrors(err: unknown): { fields: FieldErrors; message?: string } {
    if (isAxiosError(err) && err.response?.status === 422) {
        return { fields: err.response.data.errors ?? {} };
    }
    return { fields: {}, message: 'Something went wrong. Please try again.' };
}
