import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('user') user;
  @ViewChild('pass') pass;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
  	if(this.user.value == "scott" && this.pass.value == "1234" || this.user.value == "cedi" && this.pass.value == "1234"){
  		this.navCtrl.setRoot('SidebarPage');
  	} 
  	else{
		const alert = this.alertCtrl.create({
	    title: "¡Error!",
	    subTitle: "Usuario o contraseña incorrecto.",
	    buttons: ['OK']
	  });
	  alert.present();
  	}
  }
  registrar(){
    this.navCtrl.push(RegisterPage);
  }

}
