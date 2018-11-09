import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { CartModalPage } from '../cart-modal/cart-modal';

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

  cartItems: any[]=[];
  total: any;
  tiendas: any[]=[];
  showEmptiCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
    this.cargarDatos();

  }

  cargarDatos(){

    this.showEmptiCartMessage=false;

    this.storage.ready().then(()=>{
      this.total = 0.0;
      
      this.storage.get("cart").then((data)=>{
        //checa si el carrito está vacio
        console.log(data);
        
        if (data != null ) {
            this.cartItems = data;
            this.showEmptiCartMessage=false;

          console.log(this.tiendas);

        }else{
          console.log(" no hay carrito");
          this.showEmptiCartMessage = true;

        }

      })

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  irCarrito(tienda) {
    const modal = this.modalCtrl.create(CartModalPage, {tienda: tienda});
    modal.present();  
  }

  doRefresh(refresher) {

    this.showEmptiCartMessage= false;
    
    setTimeout(() => {
      this.cargarDatos();
      refresher.complete();
    }, 2000);
  }

}
