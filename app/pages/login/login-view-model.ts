import { Observable } from '@nativescript/core';
import { RouterService } from '../../services/router.service';
import { Frame } from '@nativescript/core';

export class LoginViewModel extends Observable {
    private routerService: RouterService;

    constructor() {
        super();
        this.routerService = RouterService.getInstance();
        
        this.set('ip', '');
        this.set('username', '');
        this.set('password', '');
        this.set('ssl', true);
        this.set('isLoading', false);
        this.set('error', '');
    }

    async onConnect() {
        try {
            this.set('isLoading', true);
            this.set('error', '');

            const connection = {
                ip: this.get('ip'),
                username: this.get('username'),
                password: this.get('password'),
                ssl: this.get('ssl')
            };

            await this.routerService.connect(connection);
            Frame.topmost().navigate({
                moduleName: 'pages/packages/packages-page',
                clearHistory: true
            });
        } catch (error) {
            this.set('error', error.message);
        } finally {
            this.set('isLoading', false);
        }
    }
}