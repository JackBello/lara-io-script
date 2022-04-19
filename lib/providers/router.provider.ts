import { Provider } from './provider.ts';

import { RouterStaticsService } from '../services/router/router-statics.service.ts'
import { RouterHistoryService } from '../services/router/router-history.service.ts';
import { RouterService } from '../services/router/router.service.ts';

export class RouterProvider extends Provider{
    register() {
        this.app.registerService("router/statics", RouterStaticsService, {
            isSingleton: true,
            isCallback: true,
            configService: {}
        });

        this.app.registerService("router/history", RouterHistoryService, {
            isSingleton: true,
            isCallback: true,
            configService: {}
        });

        this.app.registerService("router", RouterService, {
            isSingleton: true,
            isCallback: true,
            configService: {}
        });
    }

    boot() {
        const $templateEngine = this.app.service('template/engine');

        const $router = this.app.service('router');
        const $routerStatics = this.app.service('router/statics');

        const { statics, app } = this.app.config("paths");

        $routerStatics.setStatics(statics);

        $router.setPathController(app);

        $router.lookTemplate($templateEngine);
    }
}