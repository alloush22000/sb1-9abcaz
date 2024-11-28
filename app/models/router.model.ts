export interface RouterConnection {
    ip: string;
    username: string;
    password: string;
    ssl: boolean;
}

export interface Package {
    id: string;
    name: string;
    price: string;
    duration: string;
    limitUptime: string;
    limitBytes: string;
}

export interface Voucher {
    code: string;
    package: Package;
    createdAt: Date;
    expiresAt: Date;
    status: 'active' | 'expired' | 'unused';
}