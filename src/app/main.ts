import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
export let cfg = {
  apiUrl: 'http://pespeciales.upsin.edu.mx/pt1Venados/index.php/Api',
  api_baseURL: 'http://pespeciales.upsin.edu.mx/pt1Venados/',
  nodeServer: 'http://pespeciales.upsin.edu.mx', 
/*   apiUrl: 'http://172.16.13.228/venados/index.php/Api',
  api_baseURL: 'http://pespeciales.upsin.edu.mx/pt1Venados/',
  nodeServer: 'http://172.16.13.228:3006',  */
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
platformBrowserDynamic().bootstrapModule(AppModule);
