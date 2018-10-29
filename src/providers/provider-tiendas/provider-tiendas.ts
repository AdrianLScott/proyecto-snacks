import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as Constants from '../../app/main';

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
  	return this.http.get(Constants.API_BASE_ROUTE+'aplicacionSnacks/getStores');
  }

}
