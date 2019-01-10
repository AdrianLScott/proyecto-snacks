import { SellerProvider } from './../../providers/seller/seller';
import { validateNumber } from './../register/validator';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { clientValidator, positiveNumberValidator } from './validator';
import { PinDialog } from '@ionic-native/pin-dialog';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public utilsProvider: UtilityProvider, public sellerProvider: SellerProvider, public loadingCtrl:LoadingController, public alert:AlertController, public pinDialog: PinDialog) {
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
    var re = /^[0-9a-fA-F]+$/;
    if(!re.test(this.clienteAC.value)) {
      return this.presentAlert("Cliente invalido, intente de nuevo");
    }
    re.lastIndex = 0;
    this.confirmRecarga().then((result: any) => {
      if (result.buttonIndex == 1){
        let loading = this.loadingCtrl.create();
        let datos = [{
          id_cliente: parseInt(this.clienteAC.value, 16),
          monto: this.saldoAC.value,
          id_empleado: this.id_empleado,
          pin: result.input1,
        }];
          loading.present();
          this.sellerProvider.hacerRecarga(datos).subscribe(
            response=>{
              console.log(response);
              let alertContent;
              if(response==1){
                var formatter = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                });
                const notificacion = {
                  title: "Recarga exitosa",
                  msg: "Has recibido una recarga de "+formatter.format(this.saldoAC.value), 
                  id_cliente: this.clienteAC.value};
                  //No importa si falla lo de las notificaciones, con que se haya aplicado bien el saldo
                  this.sellerProvider.sendNotificacion(notificacion).subscribe();
                  alertContent= {
                    title: '¡Éxito!',
                    subTitle: 'El usuario ha recibido su recarga correctamente.',
                    buttons: ['Aceptar']
                  };
                  let alert = this.alert.create(alertContent);
                  alert.present();
                  this.cleanInputs();
              }
              else{
                alertContent= {
                  title: '¡Error!',
                  subTitle: response,
                  buttons: ['Aceptar']
                };
                let alert = this.alert.create(alertContent);
                alert.present();
              }
              console.log(response);
              loading.dismiss();
          });
        }
      })
        //console.log('User clicked OK, value is: ', result.input1);
    }
          
    //alert.present();

  confirmRecarga(){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    const monto = formatter.format(this.saldoAC.value);
    const msg = `Recarga por el monto de ${monto} al cliente ${this.clienteAC.value}`;
    return this.pinDialog.prompt('PIN de seguridad', msg, ['Confirmar', 'Cancelar']);
  }

  presentAlert(msg) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['Aceptar']
    });
    alert.present();
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
