import { ForgotPasswordProvider } from './../../providers/forgot-password/forgot-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,  public formbuilder: FormBuilder, public service: ForgotPasswordProvider) {
    this.formgroup = formbuilder.group({
      email:['',[Validators.required,Validators.email]]
    });
    this.emailAC = this.formgroup.controls['email'];
  }
  formgroup: FormGroup;
  emailAC: AbstractControl;
  validation_messages = {
    'email': [
        { type: 'required', message: 'Correo requerido.' },
        { type: 'email', message: 'Correo invalido.' }
      ]
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendEmail(){
    if(this.formgroup.valid){
      this.service.sendEmail(this.emailAC.value).subscribe(
        (data)=>{console.log(data)},
        (error)=>{console.log(error)},
      )
    }
  }

}
