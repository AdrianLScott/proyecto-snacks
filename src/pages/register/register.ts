import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UtilityProvider } from '../../providers/utility/utility';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface dataInterface {
   nombre: string;
   contraseña: string;
   correo: string;
   idPerfil: number;
   estatus: number;
} 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  //AC stands for AbstractControl
  //FC stand for FormControl
  formgroup: FormGroup;
  nameAC: AbstractControl;
  emailAC: AbstractControl;
  passAC: AbstractControl;
  data: dataInterface[] = [];

  validation_messages = {
    'email': [
        { type: 'required', message: 'Correo requerido.' },
        { type: 'email', message: 'Correo invalido.' }
      ],
    'pass': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'La contraseña debe contener al menos 6 caracteres.' },
    ],
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,/* public regProvider: RegisterProvider,*/ 
              public alertCtrl: AlertController, public formbuilder: FormBuilder, public utilsProvider: UtilityProvider,
              public authService: AuthProvider) {

    this.formgroup = formbuilder.group({
      pass:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]]
    });

    this.passAC = this.formgroup.controls['pass'];
    this.emailAC = this.formgroup.controls['email'];
  }


  ionViewDidLoad() {
  }
  doRegister(){
    this.data =  [{ nombre: this.emailAC.value, 
                    contraseña: this.passAC.value, 
                    correo: this.emailAC.value,
                    idPerfil: 4,
                    estatus: 1
                    }];
    if(this.formgroup.valid){
      this.authService.register(this.data).then(
        
        (data)=>{
          if(data == 1){
            this.navCtrl.setRoot('SidebarPage');
          }
          else if(data!==undefined){
            const alert = this.alertCtrl.create({
              title: "¡Error!",
              subTitle: data,
              buttons: ['OK']
            });
            alert.present();
          }
        })
      .catch(e => {console.log(e)});
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

}
