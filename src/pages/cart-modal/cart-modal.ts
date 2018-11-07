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
  cardItems: any[] =[];
  tienda: any;
  total: any;
  showEmptiCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    
    this.total = 0.0;
    //PRepara lo que tiene el carrito en la caché
    this.storage.ready().then( ()=>{
      //obtiene los datos de la caché
      this.storage.get("cart").then( (data)=>{
        //asigna lo que tiene
        this.cardItems = data; 
        console.log(this.cardItems);
        if (this.cardItems.length > 0) {

          this.cardItems.forEach( (item, index) => {

            this.total = this.total + (item.producto.precio * item.cantidad)

          });

        }else{

          this.showEmptiCartMessage = true;

        }

      });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartModalPage');
  }

}
