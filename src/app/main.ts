import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export const API_BASE_ROUTE= 'http://172.16.13.228/codeigniter/index.php/';
platformBrowserDynamic().bootstrapModule(AppModule);
