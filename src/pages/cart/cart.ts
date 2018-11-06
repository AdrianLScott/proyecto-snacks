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

  cardItems: any[]=[];
  total: any;
  pedidosTiendas: any[]=[];
  showEmptiCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
    this.cargarDatos();

  }

  cargarDatos(){

    this.showEmptiCartMessage=false;

    this.storage.ready().then(()=>{
      this.total = 0.0;
      
      this.storage.get("cart").then((data)=>{
        
        this.cardItems = data;
        
        if (this.cardItems != null || this.cardItems.length > 0  ) {

          this.cardItems.forEach( (item, index) => {

            this.total = this.total + (item.producto.precio * item.cantidad)
            this.showEmptiCartMessage=false;
          });

        }else{

          this.showEmptiCartMessage = true;

        }

      })

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  irCarrito() {
    const modal = this.modalCtrl.create(CartModalPage);
    modal.present();
  }

  doRefresh(refresher) {

    this.showEmptiCartMessage= false;

    this.storage.ready().then(()=>{
      this.total = 0.0;
      
      this.storage.get("cart").then((data)=>{
        
        this.cardItems = data;
          refresher.complete();
        if (this.cardItems != null || this.cardItems.length > 0  ) {
          
          this.cardItems.forEach( (item, index) => {

            this.total = this.total + (item.producto.precio * item.cantidad)
            this.showEmptiCartMessage=false;
          });

        }else{

          this.showEmptiCartMessage = true;

        }

      })

    });

  }

}
