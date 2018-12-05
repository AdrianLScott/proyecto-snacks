import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Storage } from '@ionic/storage';
import { SidebarPage } from './../sidebar/sidebar';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalsProvider } from '../../providers/globals/globals';

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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private authService: AuthProvider,  
    public loadingCtrl: LoadingController,
    public globals: GlobalsProvider,
    public storage: Storage,
    public userProv: UsuariosProvider) {
  }
  
  doLogin() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.login(this.user.value,this.pass.value).then(   
      (data)=>{
        if(data.user_type == 'Cliente'){
          this.setSaldo();
          this.navCtrl.setRoot(SidebarPage,{id_empleado: data.id,tipo_usuario: data.user_type});
        }
        else if(data.user_type == 'Vendedor'){
          this.navCtrl.setRoot(SidebarPage,{id_empleado: data.id,tipo_usuario: data.user_type});
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

  setSaldo(){
    this.storage.get('id').then(id => {
      if(id){
        this.userProv.getUserSaldo(id).subscribe(
          res => {
            this.globals.saldo = res[0].saldo;
          }
        );
      }
    })
  }

}
