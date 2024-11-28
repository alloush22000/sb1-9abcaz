import { SecureStorage } from '@nativescript/secure-storage';
import { RouterConnection } from '../models/router.model';

export class RouterService {
    private static instance: RouterService;
    private secureStorage: SecureStorage;

    private constructor() {
        this.secureStorage = new SecureStorage();
    }

    public static getInstance(): RouterService {
        if (!RouterService.instance) {
            RouterService.instance = new RouterService();
        }
        return RouterService.instance;
    }

    async connect(connection: RouterConnection): Promise<boolean> {
        try {
            // TODO: Implement actual RouterOS API connection
            await this.secureStorage.set({
                key: 'router_connection',
                value: JSON.stringify(connection)
            });
            return true;
        } catch (error) {
            console.error('Connection failed:', error);
            throw new Error('Failed to connect to router');
        }
    }

    async getStoredConnection(): Promise<RouterConnection | null> {
        try {
            const stored = await this.secureStorage.get({
                key: 'router_connection'
            });
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    }

    async disconnect(): Promise<void> {
        await this.secureStorage.remove({
            key: 'router_connection'
        });
    }
}