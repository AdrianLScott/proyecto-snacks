import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';

import { NotificationsPage } from './../notifications/notifications';
import { CartPage } from './../cart/cart';


@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

  constructor(public navCtrl: NavController) {
  }


}
