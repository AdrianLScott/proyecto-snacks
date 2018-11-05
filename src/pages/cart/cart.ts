import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cardItems: any[]=[];
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.ready().then(()=>{

      this.storage.get("cart").then((data)=>{
        this.cardItems = data;
        console.log(this.cardItems);

      })

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
