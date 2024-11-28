import { Package } from '../models/router.model';
import { RouterService } from './router.service';

export class PackageService {
    private routerService: RouterService;

    constructor() {
        this.routerService = RouterService.getInstance();
    }

    async getPackages(): Promise<Package[]> {
        try {
            // TODO: Implement actual RouterOS API call
            return [
                {
                    id: '1',
                    name: '1 Hour',
                    price: '5.00',
                    duration: '1h',
                    limitUptime: '1h',
                    limitBytes: '1GB'
                },
                {
                    id: '2',
                    name: '24 Hours',
                    price: '20.00',
                    duration: '24h',
                    limitUptime: '24h',
                    limitBytes: '5GB'
                }
            ];
        } catch (error) {
            console.error('Failed to fetch packages:', error);
            throw new Error('Failed to fetch packages');
        }
    }
}