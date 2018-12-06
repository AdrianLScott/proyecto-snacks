import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { StoresPage } from '../stores/stores';
import { NotificationsPage } from '../notifications/notifications';
import { CartPage } from '../cart/cart';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  tab1Root: any = StoresPage;
  tab2Root: any = NotificationsPage;
  tab3Root: any = CartPage;
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalsProvider) {
  }
  
  resetBadge(){
    this.global.badgeCarrito=null;
  }

}

