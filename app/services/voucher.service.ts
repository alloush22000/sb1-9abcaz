import { Voucher, Package } from '../models/router.model';
import { RouterService } from './router.service';

export class VoucherService {
    private routerService: RouterService;

    constructor() {
        this.routerService = RouterService.getInstance();
    }

    async generateVoucher(pkg: Package): Promise<Voucher> {
        try {
            // TODO: Implement actual RouterOS API call
            const voucher: Voucher = {
                code: Math.random().toString(36).substring(2, 8).toUpperCase(),
                package: pkg,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                status: 'unused'
            };
            return voucher;
        } catch (error) {
            console.error('Failed to generate voucher:', error);
            throw new Error('Failed to generate voucher');
        }
    }
}