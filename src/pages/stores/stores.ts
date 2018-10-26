import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { Proovedor1Provider } from '../../providers/proovedor1/proovedor1';

import { NotificationsPage } from './../notifications/notifications';
import { CartPage } from './../cart/cart';


@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

	tiendas

  constructor(public navCtrl: NavController,public proovedor: Proovedor1Provider) {}

  ionViewDidLoad(){
  	this.proovedor.obtenerTiendas()
  	.subscribe(
  		(data)=> {this.tiendas = data;},
  		(error)=> {console.log(error);}
  	)
  }


}
