import { SidebarPage } from './../sidebar/sidebar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { passValidator, validateNumber } from './validator';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  apellsAC: AbstractControl;
  emailAC: AbstractControl;
  telAC: AbstractControl;
  passAC: AbstractControl;
  confPassAC: AbstractControl;
  data: any[];

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'apellidos': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'email': [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'email', message: 'Correo invalido.' }
      ],
    'telefono': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'Debe contener 10 caracteres.' },
      { type: 'maxlength', message: 'Debe contener 10 caracteres.' },
    ],
    'pass': [
      { type: 'required', message: 'Campo requerida.' },
      { type: 'minlength', message: 'La contraseña debe contener al menos 6 caracteres.' },
    ],
    'confPass': [
      { type: 'required', message: 'Campo requerida.' }
    ],
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public toast: Toast,
              public alertCtrl: AlertController, public formbuilder: FormBuilder,
              public authService: AuthProvider) {

    this.formgroup = formbuilder.group({
      nombre:['',[Validators.required]],
      apellidos:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      telefono:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),validateNumber]],
      pass:['',[Validators.required,Validators.minLength(6)]],
      confPass:['',[Validators.required, passValidator]],
    });

    this.nameAC = this.formgroup.controls['nombre'];
    this.apellsAC = this.formgroup.controls['apellidos'];
    this.emailAC = this.formgroup.controls['email'];
    this.telAC = this.formgroup.controls['telefono'];
    this.passAC = this.formgroup.controls['pass'];
    this.confPassAC = this.formgroup.controls['confPass'];
  }


  ionViewDidLoad() {
  }
  doRegister(){
    this.data = [
      {nombre: this.emailAC.value, 
        contraseña: this.passAC.value, 
        correo: this.emailAC.value,
        idPerfil: 4,
        estatus: 1
      },{
        nombre: this.nameAC.value,
        apellidos: this.apellsAC.value,
        telefono: this.telAC.value
      }];
      
    if(this.formgroup.valid){
      this.authService.register(this.data).then(
        
        (data)=>{
          if(data == 1){
            this.toast.showWithOptions(
            {
              message: "Registro exitoso",
              duration: 2000,
              position: 'bottom',
              addPixelsY: -80
            }).subscribe();
            this.navCtrl.setRoot(SidebarPage);
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
