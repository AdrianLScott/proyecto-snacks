import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';
/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: HttpClient) {
    
  }

  obtenerNotificaciones(idUsuario){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getNotif+'?id='+idUsuario);
  }
  /**
   * Puede recibir varios ids de notificaciones
   * @param notificaciones
   */
  eliminarNotificaciones(notificaciones: any[]){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.deleteNotif+'?ids='+notificaciones);
  }

}
