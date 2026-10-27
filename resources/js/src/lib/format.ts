const kes = new Intl.NumberFormat('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const kesWhole = new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 });

export function formatKES(value: number | string, { whole = false } = {}) {
    const n = Number(value);
    return `KES ${(whole ? kesWhole : kes).format(Number.isFinite(n) ? n : 0)}`;
}

export function marginOf(cost: number | string, sale: number | string) {
    const c = Number(cost);
    const s = Number(sale);
    const amount = s - c;
    // Margin as a share of the sale price, the way distributors usually quote it.
    const percent = s > 0 ? (amount / s) * 100 : 0;
    return { amount, percent };
}

export const LOW_STOCK_THRESHOLD = 10;
