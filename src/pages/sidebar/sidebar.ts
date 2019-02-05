import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { ModalNotifsPage } from './../modal-notifs/modal-notifs';
import { GlobalsProvider } from './../../providers/globals/globals';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { TabsSellerPage } from './../tabs-seller/tabs-seller';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController, App, Platform, ViewController, NavParams, Events, Tab, ModalController } from 'ionic-angular';
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
              private onesignal: OneSignal,
              public events: Events,
              public userProv: UsuariosProvider,
              public globals: GlobalsProvider,
              public modalCtrl: ModalController,
              public pedidoProv: PedidosProvider) {
                platform.ready().then(() => {
                  // Okay, so the platform is ready and our plugins are available.
                  // Here you can do any higher level native things you might need.
            
                  // OneSignal Code start:
                  // Enable to debug issues:
            
                  if(platform.is('core') || platform.is('mobileweb')) {
                    console.log("Platform is core or is mobile web");
                  } else {
                    const clase = this;
                    var notificationOpenedCallback = function(jsonData) {
                      clase.notificationAction(jsonData.notification.payload)
                    };
                    var notificationReceivedHandler = function(jsonData) {
                      if(jsonData.isAppInFocus){
                        clase.notificationAction(jsonData.payload)
                      }
                    }
            
                    window["plugins"].OneSignal
                      .startInit("9ba5748e-6561-4bdf-8c4c-77d4766fbde8", "108844902326")
                      .handleNotificationOpened(notificationOpenedCallback)
                      .handleNotificationReceived(notificationReceivedHandler)
                      .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.None)
                      .endInit(); 
                  }
                });
                const clase = this;
                events.subscribe('saldo:update', function(){
                  clase.ionViewWillEnter();
                })
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

setSaldo(fn = undefined){
  this.storage.get('id').then(id => {
    if(id){
      this.userProv.getUserSaldo(id).subscribe(
        res => {
          this.globals.saldo = res[0].saldo;
          if(typeof fn !== 'undefined')
            fn()
        }
      );
    }
  })
}

notificationAction(notifData){
  if(typeof notifData !== 'undefined'){
    /**
     * El valor de type va a ser para los siguientes valores:
     * 1 = Notificaciones de pedidos listos
     * 2 = Notificaciones de pedidos entregados
     * 3 = Notificaciones de pedidos cancelados
     * 4 = Notificaciones de recargas
     */
    if(typeof notifData.additionalData.type !== 'undefined' && (notifData.additionalData.type === '1' || notifData.additionalData.type === '2' || notifData.additionalData.type === '3')){
        const idPedido = notifData.additionalData.idPedido;
        const txtEstatus = notifData.additionalData.estatus;
        const idEmpresa = notifData.additionalData.idEmpresa;
        const notifTitle = notifData.title
        const notifMsg = notifData.body
        const modal = this.modalCtrl.create(ModalNotifsPage, {idPedido: idPedido, estatus :txtEstatus, notifType: notifData.additionalData.type, notifMsg: notifMsg, title: notifTitle, idEmpresa: idEmpresa});
        modal.present();  
    }
    else if(typeof notifData.additionalData.type !== 'undefined' && notifData.additionalData.type == '4'){
      let _class = this;
      this.setSaldo(function(){
        const modal = _class.modalCtrl.create(ModalNotifsPage,{monto: notifData.additionalData.monto, notifType: notifData.additionalData.type, saldo: _class.globals.saldo});
        modal.present();  
      })
    }
    
  }
}

}
