import { SellerProvider } from './../../providers/seller/seller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryRecargasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-recargas',
  templateUrl: 'history-recargas.html',
})
export class HistoryRecargasPage {
  id_empleado: number;
  items_count: number;
  historial: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sellerProvider: SellerProvider) {
    this.id_empleado = this.navParams.data;
  }

  ionViewWillEnter() {
    this.items_count = 0;
    this.historial = [];
    this.getHistorial();
  }

  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getHistorial(function(){
          resolve();
        });
      }, 500);
    })
  }

  getHistorial(fn?){
    const rows_limit = 10; //Numero de resultados
    const data = {
      id_empleado: this.id_empleado,
      limit: rows_limit, 
      offset: this.items_count
    }
    
    this.sellerProvider.getHistorialRecargas(data).subscribe(
      (data)=>{
        if(data){
          if(this.historial){
            for(var index in data){
              this.historial.push(data[index]);
            }
          }
          else{
            this.historial = data;
          }
          this.items_count = this.historial.length;
        }
        if(typeof fn !== 'undefined' && typeof fn == "function"){
          fn()
        }
      });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewWillEnter();
      refresher.complete();
    }, 2000);
  }

}
