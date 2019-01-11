import { PopNotificationsComponent } from './../../components/pop-notifications/pop-notifications';
import { Storage } from '@ionic/storage';
import { NotificationsProvider } from './../../providers/notifications/notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { GlobalsProvider } from '../../providers/globals/globals';
//import * as socketIo from 'socket.io-client'; 
//import * as AppConfig from './../../app/main';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notificaciones:any = [];
  messages = [];
  value: any;
  banderaCargando: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast,
              public notifProvider: NotificationsProvider, public storage: Storage, public popoverCtrl: PopoverController,
              public globals: GlobalsProvider) {
  }

  ionViewDidLoad() {
    this.getNotifications();
  }

/*   sendPedido(){
    const socket = socketIo(AppConfig.cfg.nodeServer);
    var imprimir = this.testImprimir;
    socket.emit('send-pedido',{idEmpresa: 1, pedido:"Yeees"}, function(response){
      imprimir("khe");
      console.log(response);
    })
  } */

  testImprimir(msg){
    console.log('Si se imprime: ',msg);
  }

  getNotifications(){
    this.storage.get('id').then(data=>{
      if(data){
        this.notifProvider.obtenerNotificaciones(data).subscribe(
          success => {
            this.notificaciones = success
            for (var index in this.notificaciones) {
              var fecha = (this.notificaciones[index].fecha).split(" ");
              const arrayFecha = fecha[0].split("-");
              this.notificaciones[index].fecha = arrayFecha[2]+"/"+arrayFecha[1]+"/"+arrayFecha[0];
              this.notificaciones[index].hora = fecha[1].substr(0, 5);
              this.banderaCargando=false;
            }
          }
        )
      }
      else{
        this.banderaCargando=false;
        return false;
      }
    })
  }

  logSwap(notification_id) {
    console.log(this.notificaciones);
    this.notifProvider.eliminarNotificaciones(notification_id).subscribe(
      success=>{
        for(var x = 0; x < this.notificaciones.length; x++){
          if(this.notificaciones[x].id == notification_id){
            this.notificaciones.splice(x,1);            
          }
        }
         this.toast.showWithOptions(
          {
            message: "Notificación eliminada",
            duration: 2000,
            position: 'bottom',
            addPixelsY: -80  // added a negative value to move it up a bit (default 0)
          }
        ).subscribe(); 
      })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNotifications();
      refresher.complete();
    }, 2000);
    console.log(this.notificaciones);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopNotificationsComponent, this.notificaciones);
    popover.onDidDismiss((data) => {
      console.log(data);
      if(data){
        this.notificaciones = [];
        this.toast.showWithOptions(
          {
            message: "Notificaciones eliminadas",
            duration: 2000,
            position: 'bottom',
            addPixelsY: -80  // added a negative value to move it up a bit (default 0)
          }
        ).subscribe();
      }
    });
    popover.present({
      ev: myEvent
    });
  }
  

}
