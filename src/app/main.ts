import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export let cfg = {
  apiUrl: 'http://localhost/codeigniter/index.php/aplicacionSnacks',
  tokenName: 'token',
  user: {
    register: '/addUser',
    decodeToken: '/decodeToken',
    login: '/login'
    //login: '/auth/login',
    //refresh:'/refresh',
  },
  //books: '/books'
};
export const API_BASE_ROUTE= 'http://localhost/codeigniter/index.php/';
platformBrowserDynamic().bootstrapModule(AppModule);
