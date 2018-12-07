import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';
/*
  Generated class for the ProviderProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderProductosProvider {

  constructor(public http: HttpClient) {
    
  }

  obtenerProductos(id: any){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getProducts+'?id='+id);
  }

}
