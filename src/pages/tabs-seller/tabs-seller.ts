import { HistoryRecargasPage } from './../history-recargas/history-recargas';
import { SellerPage } from './../seller/seller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsSellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id_empleado = this.navParams.get('id_empleado');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsSellerPage');
  }

}
