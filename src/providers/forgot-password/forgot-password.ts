import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/main';

/*
  Generated class for the ForgotPasswordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ForgotPasswordProvider {
  private cfg: any;
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  sendEmail(email){
    return this.http.get(this.cfg.apiUrl + this.cfg.user.forgotPassword+'?email='+email);
  }

}
