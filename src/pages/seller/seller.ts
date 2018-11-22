import { SellerProvider } from './../../providers/seller/seller';
import { validateNumber } from './../register/validator';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
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
    this.confirmRecarga().then((result: any) => {
      if (result.buttonIndex == 1){
        let loading = this.loadingCtrl.create();
          const data = {'pin': result.input1, 'user_id': this.id_empleado}
          this.sellerProvider.verificarPin(data).subscribe(
            data=>{
              if(data=="1"){
                this.sellerProvider.hacerRecarga(datos).subscribe(
                  data=>{
                    const notificacion = {monto: this.saldoAC.value, id_cliente: this.clienteAC.value};
                    this.sellerProvider.sendNotificacion(notificacion).subscribe();
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
              else if(data=="-1"){
                this.presentAlert("El pin introducido es incorrecto");
              }
              else{
                this.presentAlert("Algo ha sucedido, por favor intente de nuevo");
              }
            }
          )
        }
      })
        //console.log('User clicked OK, value is: ', result.input1);
    }
          
    //alert.present();

  confirmRecarga(){
    const msg = `Recarga por el monto de $${this.saldoAC.value} al cliente ${this.clienteAC.value}`;
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
