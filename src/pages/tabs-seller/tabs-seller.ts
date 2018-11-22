import { Storage } from '@ionic/storage';
import { HistoryRecargasPage } from './../history-recargas/history-recargas';
import { SellerPage } from './../seller/seller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-seller',
  templateUrl: 'tabs-seller.html',
})
export class TabsSellerPage {
  tab1Root: any = SellerPage;
  tab2Root: any = HistoryRecargasPage;
  myIndex: number;
  id_empleado: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.id_empleado = this.navParams.data;
  }

  ionViewWillEnter() {

  }

}
