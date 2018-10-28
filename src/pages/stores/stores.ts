import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { ProviderTiendasProvider } from '../../providers/provider-tiendas/provider-tiendas';

import { NotificationsPage } from './../notifications/notifications';
import { CartPage } from './../cart/cart';


@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

	tiendas;

  constructor(public navCtrl: NavController,public proovedor: ProviderTiendasProvider) {}

  ionViewDidLoad(){
  	this.proovedor.obtenerTiendas()
  	.subscribe(
  		(data)=> {this.tiendas = data;},
  		(error)=> {console.log(error);}
  	)
  }
  showMessage(){
  	console.log("Hola que show");
  }


}
