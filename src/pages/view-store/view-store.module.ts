import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewStorePage } from './view-store';

@NgModule({
  declarations: [
    ViewStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewStorePage),
  ],
})
export class ViewStorePageModule {}
