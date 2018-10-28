import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../app/main';
/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: HttpClient) {
  }

  doRegister(data: any){
  	//console.log(data);
  	//var jsonData = JSON.stringify(data);
  	return this.http.post(Constants.API_BASE_ROUTE+'aplicacionSnacks/addUser',data);
  }

}
