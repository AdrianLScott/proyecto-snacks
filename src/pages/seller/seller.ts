import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { clientValidator } from './validator';

/**
 * Generated class for the SellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html',
})

export class SellerPage {
  formgroup: FormGroup;
  nameAC: AbstractControl;
  clienteAC: AbstractControl;
  confirmAC: AbstractControl;
  saldoAC: AbstractControl;
  validation_messages = {
    'cliente': [
        { type: 'required', message: 'Correo requerido.' },
        { type: 'email', message: 'Correo invalido.' }
      ],
    'confirm': [
      { type: 'required', message: 'Campo obligatorio .' }
    ],
    'saldo':[
      { type: 'required', message: 'Campo obligatorio.' }
    ]
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public utilsProvider: UtilityProvider) {
    this.formgroup = formbuilder.group({
      cliente:['',[Validators.required]],
      confirm:['',[Validators.required,clientValidator]],
      saldo:['',[Validators.required]],
    });

    this.clienteAC = this.formgroup.controls['cliente'];
    this.confirmAC = this.formgroup.controls['confirm'];
    this.saldoAC = this.formgroup.controls['saldo'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPage');
  }

  /**
   * Para verificar que coincidan el campo cliente y cliente_conf
   * @param group 
   */
  checkClients(group: FormGroup) {
  let cliente = group.controls.cliente.value;
  let confirmCliente = group.controls.confirm.value;

  return cliente === confirmCliente ? null : { notSame: true }     
}

}
