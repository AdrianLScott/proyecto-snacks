import { TabsSellerPage } from './../tabs-seller/tabs-seller';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController, App, Platform, ViewController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

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
  rootPage:any;
  user: String = '';
  tipo_usuario: string;
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
   
  pages: PageInterface[];

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public app: App, 
              public platform: Platform,
              public auth: AuthProvider,
              public storage: Storage,
              public viewController: ViewController,
              public navParams:NavParams,
              private onesignal: OneSignal) {
  }
  ionViewWillEnter(){
    this.tipo_usuario = this.navParams.get('tipo_usuario');    
    if(this.tipo_usuario == 'Vendedor'){
      this.pages = [
        { title: 'Salir', pageName: 'LogoutPage', icon: 'log-out' },
      ];
      this.nav.setRoot(TabsSellerPage,this.navParams.get('id_empleado'));
      let pageIndex;
      if((pageIndex = this.navParams.get('pageIndex'))!==undefined){
        this.nav.getActiveChildNavs()[0].select(this.navParams.get(pageIndex));
      }
    }
    else{
      this.pages = [
        { title: 'Perfil', pageName: 'ProfilePage', icon: 'person' },
        { title: 'Pedidos', pageName: 'CartPage', tabComponent: 'CartPage', index: 2, icon: 'cart' },
        { title: 'Notificaciones', pageName: 'NotificationsPage', tabComponent: 'NotificacationsPage', index: 1, icon: 'notifications' },
        { title: 'Tiendas', pageName: 'StoresPage', tabComponent: 'StoresPage', index: 0, icon: 'appstore' },
        { title: 'Salir', pageName: 'LogoutPage', icon: 'log-out' },
      ];
      this.rootPage = 'TabsPage';
    }

    this.storage.get('user').then(data=>{
      if(data){
          if(this.navParams.get('tipo_usuario') !=='Vendedor'){
            this.user = data;
            window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
              status.permissionStatus.hasPrompted;
              status.permissionStatus.status;
      
              status.subscriptionStatus.subscribed;
              status.subscriptionStatus.userSubscriptionSetting;
              status.subscriptionStatus.pushToken;
      
              //var playerID = status.subscriptionStatus.userId;
              console.log(status.subscriptionStatus.userId);
            });
            this.onesignal.sendTag('email',data);
        }
      }
      else{
        this.user = undefined;
      }
    });
  }
  openPage(page: PageInterface) {
    
   if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      if(page.pageName != 'LogoutPage'){
        this.nav.push(page.pageName);
      }
      else{
        this.presentConfirm();
      }
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

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: '¡Advertencia!',
    message: '¿Que acción desea realizar?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        handler: () => {
          this.auth.logout();
          this.app.getRootNav().setRoot(LoginPage);
          this.onesignal.deleteTag("email");
        }
      },{
        text: 'Salir',
        handler: () => {
          this.platform.exitApp();
        }
      }
    ]
  });
  alert.present();
}


}
