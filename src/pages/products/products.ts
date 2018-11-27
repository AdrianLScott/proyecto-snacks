//import { ProductDetailProvider } from './../../providers/product-detail/product-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { ProviderProductosProvider } from '../../providers/provider-productos/provider-productos';
import { ProductDetailsPage } from '../product-details/product-details';
import * as AppConfig from './../../app/main';

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
	productos;
  banderaBuscar: boolean = false;
  apiURL;

  constructor(public navCtrl: NavController, public navParams: NavParams, public proveedor: ProviderProductosProvider,public loadingCtrl: LoadingController, public app:App) {
    this.tienda = navParams.data.tienda;
    this.apiURL = AppConfig.cfg.api_baseURL;
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.proveedor.obtenerProductos(this.tienda.id)
  	.subscribe(
  		(data)=> {this.productos = data;loading.dismiss();},
  		(error)=> {console.log(error);}
  	)
  }

  viewProduct(producto){
    this.navCtrl.push(ProductDetailsPage,{
      producto: producto,
      tienda: this.tienda});
  	//this.navCtrl.push(ProductDetailsPage
  }
  openBuscar(){
    if (this.banderaBuscar) {
      this.banderaBuscar = false;
    } else {
      this.banderaBuscar = true;
    }
  }

}