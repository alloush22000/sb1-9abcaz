import { Observable, Application, Clipboard } from '@nativescript/core';
import { PackageService } from '../../services/package.service';
import { VoucherService } from '../../services/voucher.service';
import { Package } from '../../models/router.model';
import { Frame, ShareText } from '@nativescript/core';

export class PackagesViewModel extends Observable {
    private packageService: PackageService;
    private voucherService: VoucherService;

    constructor() {
        super();
        this.packageService = new PackageService();
        this.voucherService = new VoucherService();
        
        this.set('packages', []);
        this.set('isLoading', false);
        
        this.loadPackages();
    }

    async loadPackages() {
        try {
            this.set('isLoading', true);
            const packages = await this.packageService.getPackages();
            this.set('packages', packages);
        } catch (error) {
            console.error('Failed to load packages:', error);
        } finally {
            this.set('isLoading', false);
        }
    }

    async onPullToRefresh(args) {
        await this.loadPackages();
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }

    async onGenerateVoucher(args) {
        try {
            const pkg = args.object.bindingContext as Package;
            const voucher = await this.voucherService.generateVoucher(pkg);
            
            const message = `Voucher Code: ${voucher.code}\nPackage: ${pkg.name}\nDuration: ${pkg.duration}\nPrice: $${pkg.price}`;
            
            // Using NativeScript core Clipboard
            Clipboard.setText(message);
            
            const share = await ShareText.share({
                text: message,
                subject: 'Your Voucher Code'
            });
            
        } catch (error) {
            console.error('Failed to generate voucher:', error);
        }
    }

    async onLogout() {
        try {
            await RouterService.getInstance().disconnect();
            Frame.topmost().navigate({
                moduleName: 'pages/login/login-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
}