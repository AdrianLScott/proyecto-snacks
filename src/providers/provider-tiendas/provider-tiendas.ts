import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';
import {Storage} from '@ionic/storage';

/*
  Generated class for the Proovedor1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderTiendasProvider {
  constructor(public http: HttpClient, public storage: Storage) {

  }

  obtenerTiendas(idEvento){
    return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.user.getStores+'?idEvento='+idEvento);

  }

}
