import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export let cfg = {
  apiUrl: 'http://localhost/venados-web/index.php/Api',
  nodeServer: 'http://192.168.0.4:3000',
  tokenName: 'token',
  user: {
    register: '/addUser',
    decodeToken: '/decodeToken',
    login: '/login',
    product_details: '/addPedido',
    getProducts: '/getProducts',
    getStores: '/getStores',
    getNotif: '/getNotifications',
    deleteNotif: '/deleteNotifications',
    forgotPassword: '/forgot_password',
    getPedidos: '/getPedidos',
    getDetallesPedidos: '/getDetallesPedidos',
    getUserData: '/getUserData',
  },
  vendedor:{
    recargarSaldo: '/recargarSaldo'
  }
};
//export const API_BASE_ROUTE= 'http://pespeciales.upsin.edu.mx/venados/';
platformBrowserDynamic().bootstrapModule(AppModule);
