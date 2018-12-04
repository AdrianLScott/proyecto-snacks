
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ProviderTiendasProvider } from '../../providers/provider-tiendas/provider-tiendas';
import { ProductsPage } from '../products/products';
import * as AppConfig from './../../app/main';



@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

	tiendas;
  apiURL;
  banderaBuscar: boolean = false;
  constructor(public navCtrl: NavController,public proveedor: ProviderTiendasProvider,public loadingCtrl: LoadingController) {
    this.apiURL = AppConfig.cfg.api_baseURL;
  }

  ionViewDidLoad(){
    this.proveedor.obtenerTiendas()
      .subscribe(
        (data)=> {this.tiendas = data;},
        (error)=> {console.log(error);})
  }

  objetosTienda(tienda){
  	this.navCtrl.push(ProductsPage, {tienda: tienda});
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }

  openBuscar(){
    if (this.banderaBuscar) {
      this.banderaBuscar = false;
    } else {
      this.banderaBuscar = true;
    }
  }
  

}
