import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export let cfg = {
  apiUrl: 'http://pespeciales.upsin.edu.mx/venados/index.php/Api',
  tokenName: 'token',
  user: {
    register: '/addUser',
    decodeToken: '/decodeToken',
    login: '/login',
    product_details: '/addPedido',
    getProducts: '/getProducts',
    getStores: '/getStores'
  },
};
//export const API_BASE_ROUTE= 'http://pespeciales.upsin.edu.mx/venados/';
platformBrowserDynamic().bootstrapModule(AppModule);
