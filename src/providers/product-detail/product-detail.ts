import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import *  as AppConfig from '../../app/main';
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
  	return this.http.post(AppConfig.cfg.apiUrl+AppConfig.cfg.user.product_details,data);
  }

}
