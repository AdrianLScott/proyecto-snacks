import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';
/*
  Generated class for the SellerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SellerProvider {

  constructor(public http: HttpClient) {
  }

  hacerRecarga(datos: any[]){
  	return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.vendedor.recargarSaldo, datos);
  }

  verificarPin(datos: any){
    return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.vendedor.verificarPin, datos);
  }

  getHistorialRecargas(datos: any){
    return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.vendedor.getHistorial, datos);
  }

  sendNotificacion(datos: any){
    return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.vendedor.sendNotificacion, datos);
  }
}
