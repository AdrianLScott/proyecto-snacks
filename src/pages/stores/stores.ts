import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, LoadingController } from 'ionic-angular';
import { ProviderTiendasProvider } from '../../providers/provider-tiendas/provider-tiendas';
import { ProductsPage } from '../products/products';



@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

	tiendas;

  constructor(public navCtrl: NavController,public proveedor: ProviderTiendasProvider, private auth:AuthProvider,public loadingCtrl: LoadingController) {}

  ionViewDidLoad(){
    this.auth.hasTokenAndIsValid().then(
      (data)=>{
        if(data){
          let loading = this.loadingCtrl.create();
          loading.present();
          this.proveedor.obtenerTiendas()
          .subscribe(
            (data)=> {this.tiendas = data; loading.dismiss();},
            (error)=> {console.log(error);}
          )
        }
      }
    );
  }

  objetosTienda(tienda){
  	this.navCtrl.push(ProductsPage, {tienda: tienda});
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewDidEnter();
      refresher.complete();
    }, 2000);
  }


}
