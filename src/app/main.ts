import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export const API_BASE_ROUTE= 'http://localhost/codeigniter/index.php/';
platformBrowserDynamic().bootstrapModule(AppModule);
