import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import *  as AppConfig from '../../app/main';

/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {

  constructor(public http: HttpClient) {  }

   getPedidos(idUser: number){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getPedidos+'?idUser='+idUser);
  }
  getDetallesPedidos(idPedido: number){
    return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getDetallesPedidos+'?idPedido='+idPedido);
  }

  doPedido(data: any) : Observable<Object> {
  	//console.log(data);
  	//var jsonData = JSON.stringify(data);
  	return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.user.product_details,data);
  }
}
