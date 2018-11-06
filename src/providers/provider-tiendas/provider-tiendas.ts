import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';

/*
  Generated class for the Proovedor1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderTiendasProvider {

  constructor(public http: HttpClient) {
  }

  obtenerTiendas(){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getStores);
  }

}
