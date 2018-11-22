import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//apiUrl: 'http://pespeciales.upsin.edu.mx/pt1Venados/index.php/Api',
export let cfg = {
  apiUrl: 'http://192.168.0.4/venados/index.php/Api',
  api_baseURL: 'http://pespeciales.upsin.edu.mx/pt1Venados/',
  nodeServer: 'http://localhost:3000',
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
    recargarSaldo: '/recargarSaldo',
    verificarPin: '/verificarPin',
    getHistorial: '/getHistorialRecargas',
    sendNotificacion: '/send_notif_saldo'
  }
};
//export const API_BASE_ROUTE= 'http://pespeciales.upsin.edu.mx/venados/';
platformBrowserDynamic().bootstrapModule(AppModule);
