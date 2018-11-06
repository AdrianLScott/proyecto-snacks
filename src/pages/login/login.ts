import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('user') user;
  @ViewChild('pass') pass;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private authService: AuthProvider) {
  }

  doLogin() {
    this.authService.login(this.user.value,this.pass.value).then(   
      (data)=>{
        if(data == 1){
          this.navCtrl.setRoot('SidebarPage');
        }
        else if(data !== undefined){
          const alert = this.alertCtrl.create({
            title: "¡Error!",
            subTitle: data,
            buttons: ['OK']
          });
          alert.present();
        }
      })
    .catch(e => {console.log(e)});
  };

  registrar(){
    this.navCtrl.push(RegisterPage);
  }

  forgot_password(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
