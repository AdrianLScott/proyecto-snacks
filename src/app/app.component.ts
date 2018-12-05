import { UsuariosProvider } from './../providers/usuarios/usuarios';
import { GlobalsProvider } from './../providers/globals/globals';
import { Toast } from '@ionic-native/toast';
import { UtilityProvider } from './../providers/utility/utility';
import { SidebarPage } from './../pages/sidebar/sidebar';
import { LoginPage } from './../pages/login/login';
import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { NoEventPage } from '../pages/no-event/no-event';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;
  rootPageParams:any;
  token: any;  
  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth:AuthProvider, private utility: UtilityProvider, public toast: Toast, public globals: GlobalsProvider,public userProv: UsuariosProvider) {

    this.validateRootPage(statusBar, splashScreen, false);
    
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
          clase.setSaldo();
        };
        var notificationReceivedHandler = function(jsonData) {
          clase.setSaldo();
        }

        window["plugins"].OneSignal
          .startInit("9ba5748e-6561-4bdf-8c4c-77d4766fbde8", "108844902326")
          .handleNotificationOpened(notificationOpenedCallback)
          .handleNotificationReceived(notificationReceivedHandler)
          .endInit(); 
      }
    });
  }


  validateRootPage(statusbar, splashscreen, hasFailed:boolean){
    const failed:boolean = hasFailed;
    return this.utility.isThereAnEvent().subscribe(data=>{
      if(data!=-1){
        this.storage.get('id_token').then(token => {
          if(token){
            this.auth.getUserDataByToken(token).subscribe(
              (success)=>{
                const tipo_usuario = success.json()["tipo_usuario"];
                if(tipo_usuario == 4){
                  this.setSaldo();
                  this.rootPage= SidebarPage;
                  this.rootPageParams = {tipo_usuario: "Cliente" }
                }
                else{
                  this.rootPage = LoginPage;
                }
              },
              (error)=>{
                this.rootPage = LoginPage;
              }
            )
          }
          else{
            this.rootPage = LoginPage;
          }
        }).catch(e=>{
          this.rootPage = LoginPage;
        })
        statusbar.hide();
        splashscreen.hide();
      }
      else{
        this.rootPage = NoEventPage;
      }
    },
    error =>{
      if(!failed){
        this.toast.showWithOptions(
          {
            message: "Conexión fallida, reintentando conectar",
            position: 'bottom',
            duration: 5000,
            addPixelsY: -80
          }).subscribe();
      }
      this.validateRootPage(statusbar, splashscreen, true);
    });
  }

  setSaldo(){
    this.storage.get('id').then(id => {
      if(id){
        this.userProv.getUserSaldo(id).subscribe(
          res => {
            this.globals.saldo = res[0].saldo;
          }
        );
      }
    })
  }

}

