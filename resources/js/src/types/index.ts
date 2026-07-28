export interface Tenant {
    id: number;
    name: string;
    phone: string;
    subscription_status: 'trial' | 'active' | 'suspended';
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'owner' | 'staff';
    tenant: Tenant;
}

export interface Product {
    id: number;
    name: string;
    cost_price: string;
    sale_price: string;
    stock_qty: number;
    created_at: string;
    updated_at: string;
}

export interface Retailer {
    id: number;
    shop_name: string;
    phone: string;
    location: string;
    created_at: string;
    updated_at: string;
}
