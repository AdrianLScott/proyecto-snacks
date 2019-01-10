//import { ProductDetailProvider } from './../../providers/product-detail/product-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { ProviderProductosProvider } from '../../providers/provider-productos/provider-productos';
import { ProductDetailsPage } from '../product-details/product-details';
import * as AppConfig from './../../app/main';
import { GlobalsProvider } from '../../providers/globals/globals';

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
  searchQuery: string = '';
  respaldo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public proveedor: ProviderProductosProvider,public loadingCtrl: LoadingController, public app:App, public globals: GlobalsProvider) {
    this.tienda = navParams.data.tienda;
    this.apiURL = AppConfig.cfg.api_baseURL;
  }

  ionViewDidLoad() {
    this.proveedor.obtenerProductos(this.tienda.id)
  	.subscribe(
  		(data)=> {this.productos = data;this.respaldo=data},
  		(error)=> {console.log(error);}
  	)
  }

  viewProduct(producto){
    this.navCtrl.push(ProductDetailsPage,{
      producto: producto,
      tienda: this.tienda});
  }
  openBuscar(){
    if (this.banderaBuscar) {
      this.banderaBuscar = false;
    } else {
      this.banderaBuscar = true;
    }
  }

  buscarItems(ev: any) {
    this.productos = this.respaldo;
    // set val to the value of the searchbar
    const val = ev.target.value;
    //if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.productos = this.productos.filter((item: any) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}