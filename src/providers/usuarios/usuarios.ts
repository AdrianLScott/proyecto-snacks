import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';


/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  constructor(public http: HttpClient) {
    
  }
  getUserData(idUser: number){
  	return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getUserData+'?idUser='+idUser);
  }
  getUserSaldo(idUser: any){
    return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getUserSaldo+'?idUser='+idUser);
  }

}
