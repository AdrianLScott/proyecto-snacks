import { CartModalPage } from './../cart-modal/cart-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import * as AppConfig from './../../app/main';
/**
 * Generated class for the ModalNotifsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-notifs',
  templateUrl: 'modal-notifs.html',
})
export class ModalNotifsPage {

  monto: Number = 0;
  saldo: Number = 0.0;
  unregister: any;
  notifType: any;
  apiURL: String;
  datos: any[];
  notifMsg: String;
  idPedido: String;
  idEmpresa: any;
  title: String;
  estatus: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public platform: Platform, public modalCtrl: ModalController) {
    this.saldo = this.navParams.get('saldo')
    this.monto = this.navParams.get('monto');
    this.notifType = this.navParams.get('notifType');
    this.title = this.navParams.get('title');
    this.notifMsg = this.navParams.get('notifMsg');
    this.idPedido = this.navParams.get('idPedido');
    this.apiURL = AppConfig.cfg.api_baseURL;
    this.estatus = this.notifType == 1?  "Realizado" : "" 
    this.unregister = platform.registerBackButtonAction(() => { 
    }); 
  }

  ionViewDidLoad() {

  }

  close(){
    this.viewController.dismiss();
    this.unregister();
  }

  detallesPedido(){
    this.close();
    const modal = this.modalCtrl.create(CartModalPage, {index: this.idPedido, pag: this, estatus: this.estatus, idEmpresa: this.idEmpresa});
    modal.present();  
  }
}
