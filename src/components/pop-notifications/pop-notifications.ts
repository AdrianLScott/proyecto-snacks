import { ViewController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { NotificationsProvider } from './../../providers/notifications/notifications';
@Component({
  selector: 'pop-notifications',
  template: `
      <button ion-item (click)="this.borrarNotificaciones()">Borrar todas las notificaciones</button>
  `
})
export class PopNotificationsComponent {
  @Input() notifications: any [];

  constructor(public viewCtrl: ViewController, public navParams:NavParams, public notifProvider: NotificationsProvider) {
    this.notifications = this.navParams.data;
  }

  borrarNotificaciones() {
    var ids = [];
    this.notifications.forEach(element => {
      ids.push(element.id);
    });
    this.notifProvider.eliminarNotificaciones(ids).subscribe(
      success => this.viewCtrl.dismiss({
        response: "1",
      })
    );
  }

}
