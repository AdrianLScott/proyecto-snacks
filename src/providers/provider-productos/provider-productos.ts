import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as Constants from '../../app/main';

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
  	return this.http.get(Constants.API_BASE_ROUTE+'aplicacionSnacks/getProducts?id='+id);
  }

}
