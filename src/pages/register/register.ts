import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { RegisterProvider } from '../../providers/register/register';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface dataInterface {
   nombre: string;
   contraseña: string;
   correo: string;
} 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  @ViewChild('name') name;
  @ViewChild('pass') pass;
  @ViewChild('email') email;
  data: dataInterface[]= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public regProvider: RegisterProvider, public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
  }
  doRegister(){
    this.data =  [{ nombre: this.name.value, contraseña: this.pass.value, correo: this.email.value }];
    if(this.name.value !="" && this.pass.value != "" && this.email.value != ""){
      this.regProvider.doRegister(this.data).subscribe(
      (response)=> {console.log(response)},
      (error)=> {console.log(error);}
    )
    }
    else{
      const alert = this.alertCtrl.create({
        title: "¡Error!",
        subTitle: "Debe ingresar todos los datos para continuar.",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  notEmpty

  regresar(){
  	//code..
  }

}
