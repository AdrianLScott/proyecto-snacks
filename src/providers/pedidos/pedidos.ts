import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
