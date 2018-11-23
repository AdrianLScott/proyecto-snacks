import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//apiUrl: 'http://pespeciales.upsin.edu.mx/pt1Venados/index.php/Api',
export let cfg = {
  apiUrl: 'http://pespeciales.upsin.edu.mx/pt1Venados/index.php/Api',
  api_baseURL: 'http://pespeciales.upsin.edu.mx/pt1Venados/',
  nodeServer: 'http://localhost:3000',
  tokenName: 'token',
  user: {
    register: '/addUser',
    decodeToken: '/decodeToken',
    login: '/login',
    addPedido: '/addPedido',
    getProducts: '/getProducts',
    getStores: '/getStores',
    getNotif: '/getNotifications',
    deleteNotif: '/deleteNotifications',
    forgotPassword: '/forgot_password',
    getPedidos: '/getPedidos',
    getDetallesPedidos: '/getDetallesPedidos',
    getUserData: '/getUserData',
    getUserSaldo: '/getUserSaldo',
    eliminarPedido: '/eliminarPedido',
    cancelarPedido: '/cancelarPedido',
  },
  vendedor:{
    recargarSaldo: '/recargarSaldo',
    verificarPin: '/verificarPin',
    getHistorial: '/getHistorialRecargas',
    sendNotificacion: '/send_notif'
  },
  general:{
    isThereEvent: '/isThereAnEvent'
  }
};
//export const API_BASE_ROUTE= 'http://pespeciales.upsin.edu.mx/venados/';
platformBrowserDynamic().bootstrapModule(AppModule);
