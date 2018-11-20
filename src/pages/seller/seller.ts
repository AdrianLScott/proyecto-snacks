import { SellerProvider } from './../../providers/seller/seller';
import { validateNumber } from './../register/validator';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { clientValidator, positiveNumberValidator } from './validator';

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
  id_empleado: number;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public utilsProvider: UtilityProvider, public sellerProvider: SellerProvider, public loadingCtrl:LoadingController, public alert:AlertController) {
    this.formgroup = formbuilder.group({
      cliente:['',[Validators.required]],
      confirm:['',[Validators.required,clientValidator]],
      saldo:['',[Validators.required,positiveNumberValidator,validateNumber]],
    });
    this.id_empleado = this.navParams.data;
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

  hacerRecarga(){
    const datos = [{
      id_cliente: this.clienteAC.value,
      monto: this.saldoAC.value,
      id_empleado: this.id_empleado
    }];
    const alert = this.presentConfirm();
    alert.onDidDismiss((data)=>{
        if(data){
          let loading = this.loadingCtrl.create();
          loading.present();
          this.sellerProvider.hacerRecarga(datos).subscribe(
            data=>{
              loading.dismiss()
              let alertContent;
              if(data == 1){
                alertContent= {
                  title: '¡Éxito!',
                  subTitle: 'El usuario ha recibido su recarga correctamente.',
                  buttons: ['Aceptar']
                };
                this.cleanInputs();
              }
              else{
                alertContent= {
                  title: '¡Error!',
                  subTitle: data,
                  buttons: ['Aceptar']
                };
              }
              let alert = this.alert.create(alertContent);
              alert.present();
            }
          ); 
        }
      })
    alert.present();
  }

  presentConfirm() {
    let alert = this.alert.create({
      title: 'Confirmar recarga',
      message: `Se hará una recargar por el monto de <b>$${this.saldoAC.value}</b> al usuario con el numero <b>${this.clienteAC.value}</b>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });
    return alert;
  }

  cleanInputs(){
    this.clienteAC.setValue('');
    this.clienteAC.markAsUntouched();
    this.confirmAC.setValue('');
    this.confirmAC.markAsUntouched();
    this.saldoAC.setValue('');
    this.saldoAC.markAsUntouched();
  }

}
