import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import *  as AppConfig from '../../app/main';
/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(private toastCtrl: ToastController, public http: HttpClient) {
  	// code
  }

  displayErrorConnectionToast(){
    let toast = this.toastCtrl.create({
      message: 'No se pudo realizar la conexión a la base de datos, por favor intente de nuevo.',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "OK"

    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  isThereAnEvent(){
    return this.http.get(AppConfig.cfg.apiUrl+AppConfig.cfg.general.isThereEvent);
  }

}
