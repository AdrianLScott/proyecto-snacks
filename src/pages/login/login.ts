import { TabsSellerPage } from './../tabs-seller/tabs-seller';
import { SellerPage } from './../seller/seller';
import { SidebarPage } from './../sidebar/sidebar';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private authService: AuthProvider,  public loadingCtrl: LoadingController) {
  }
  
  doLogin() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.login(this.user.value,this.pass.value).then(   
      (data)=>{
        if(data.user_type == 'Cliente'){
          this.navCtrl.setRoot(SidebarPage);
        }
        else if(data.user_type == 'Vendedor'){
          this.navCtrl.setRoot(TabsSellerPage,{id_empleado: data.id});
        }
        else if(data !== undefined){
          const alert = this.alertCtrl.create({
            title: "¡Error!",
            subTitle: data,
            buttons: ['OK']
          });
          alert.present();
        }
        loading.dismiss();
      })
    .catch(e => {console.log(e);loading.dismiss();});
  };

  registrar(){
    this.navCtrl.push(RegisterPage);
  }

  forgot_password(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
