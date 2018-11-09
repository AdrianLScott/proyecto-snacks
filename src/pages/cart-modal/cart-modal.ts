import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';


/**
 * Generated class for the CartModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModalPage {
  cartItems: any[] =[];
  tienda: any;
  total: any;
  showEmptiCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    
    this.total = 0.0;
    this.tienda = navParams.data.tienda;

    console.log("PARAMAETRO: "+this.tienda);
    if (this.tienda.length > 0 || this.tienda != null) {
      for (let i = 1; i < this.tienda.length; i++) {

        this.cartItems.push(this.tienda[i]);
        this.total = this.total + (this.tienda[i].cantidad * this.tienda[i].producto.precio);
      }
      console.log(this.cartItems);

    }else{

      this.showEmptiCartMessage = true;

    }
  }

  ionViewDidLoad() {
  }

}
