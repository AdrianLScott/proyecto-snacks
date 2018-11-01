import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../app/main';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProductDetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductDetailProvider {

  constructor(public http: HttpClient) {
  }

  doPedido(data: any) : Observable<Object> {
  	//console.log(data);
  	//var jsonData = JSON.stringify(data);
  	return this.http.post(Constants.API_BASE_ROUTE+'aplicacionSnacks/addPedido',data);
  }

}
