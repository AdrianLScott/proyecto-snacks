import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotifsPage } from './modal-notifs';

@NgModule({
  declarations: [
    ModalNotifsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotifsPage),
  ],
})
export class ModalNotifsPageModule {}
