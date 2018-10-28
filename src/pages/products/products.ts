import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
	tienda;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.tienda = navParams.data.tienda;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
