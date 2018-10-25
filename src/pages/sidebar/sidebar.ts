import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';

import { StoresPage } from './../stores/stores';
import { NotificationsPage } from './../notifications/notifications';
import { CartPage } from './../cart/cart';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-sidebar',
  templateUrl: 'sidebar.html',
})
export class SidebarPage {
  // Basic root for our content view
  rootPage = 'TabsPage';

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
   
  pages: PageInterface[] = [
    { title: 'Perfil', pageName: 'ProfilePage', tabComponent: 'ProfilePage', index: 3, icon: 'person' },
    { title: 'Pedidos', pageName: 'CartPage', tabComponent: 'CartPage', index: 0, icon: 'cart' },
    { title: 'Notificaciones', pageName: 'NotificationsPage', tabComponent: 'NotificacationsPage', index: 1, icon: 'notifications' },
    { title: 'Salir', pageName: 'StoresPage', tabComponent: 'StoresPage', index: 2, icon: 'log-out' },
  ];

  constructor(public navCtrl: NavController) {
  }

  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
   if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.tabComponent, params);
    }
  }
 
  isActive(page: PageInterface) {
   // Again the Tabs Navigation	
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}
