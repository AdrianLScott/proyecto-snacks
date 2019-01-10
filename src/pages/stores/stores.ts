import { GlobalsProvider } from './../../providers/globals/globals';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';
import { ProviderTiendasProvider } from '../../providers/provider-tiendas/provider-tiendas';
import { ProductsPage } from '../products/products';
import * as AppConfig from './../../app/main';
import {Storage} from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

	tiendas;
  apiURL;
  respaldo: any;
  banderaBuscar: boolean = false;
  constructor(public storage: Storage, public navCtrl: NavController,public proveedor: ProviderTiendasProvider,public loadingCtrl: LoadingController, public globals: GlobalsProvider) {
    this.apiURL = AppConfig.cfg.api_baseURL;
  }

  ionViewDidLoad(){
    this.storage.get('evento').then((evento)=>{
      this.proveedor.obtenerTiendas(evento).subscribe(
        (data)=> {this.tiendas = data;this.respaldo = data},
        (error)=> {console.log(error);})
    });
    
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
  ;

  openBuscar(){
    if (this.banderaBuscar) {
      this.banderaBuscar = false;
    } else {
      this.banderaBuscar = true;
    }
  }

  buscarItems(ev: any) {
    this.tiendas = this.respaldo;
    // set val to the value of the searchbar
    const val = ev.target.value;
    //if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tiendas = this.tiendas.filter((item: any) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  

}
