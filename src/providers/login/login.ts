import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../app/main';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
  }

  doLogin(){

  	//return this.http.get(Constants.API_BASE_ROUTE+'aplicacionSnacks');
  }

}
